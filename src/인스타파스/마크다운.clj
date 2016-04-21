(ns 인스타파스.마크다운
  (:require [instaparse.core :as insta]
            [clojure.test :refer :all]))

(def 파서
  (insta/parser
   "문서         := (제목 / 목록 / 문단)+
    문단         := 평문? LF
    <제목>       := (작은제목 / 큰제목) LF
    <평문>       := (링크들 / 강조 / ANY)+

    (* 제목 *)
    큰제목       := <'#' 공백> 평문 <공백? '#'>?
    작은제목     := <'##' 공백> 평문 <공백? '##'>?

    (* 목록 *)
    <목록>       := 일반목록 | 숫자목록
    일반목록     := (<'*' 공백> 항목 LF)+
    숫자목록     := (<숫자+ '.' 공백?> 항목 LF)+
    항목         := 평문

    (* 링크 *)
    <링크들>     := 일반링크 / 자동링크
    일반링크     := <'['> 텍스트 <']('> 주소 <')'>
    텍스트       := (강조 / ESC / ANY)+
    주소         := eTXT

    자동링크     := <'<'> 자동주소 <'>'>
    자동주소     := ANY+ '://' (!'>' ANY)+

    (* 강조 *)
    <강조>       := 굵게 / 기울임

    굵게         := 별굵게 | 밑줄굵게
    <별굵게>     := <'**'> eTXT <'**'>
    <밑줄굵게>   := <'__'> eTXT <'__'>

    기울임       := 별기울임 | 밑줄기울임
    <별기울임>   := <'*'> eTXT <'*'>
    <밑줄기울임> := <'_'> eTXT <'_'>

    <eTXT>       := (ESC / ANY)+
    ESC          := #'\\\\[*_\\[\\]()]'
    <ANY>        := #'.'
    공백         := ' '
    <LF>         := <'\\n'>
    <숫자>       := #'[0-9]'
   "))

(defn 분석 [텍스트]
  (파서 (if (clojure.string/ends-with? 텍스트 "\n")
            텍스트
            (str 텍스트 "\n"))))

(deftest 분석테스트
  (testing "목록"
    (are [시도 결과] (= 시도 결과)
      (분석 "* 일반목록")
      [:문서 [:일반목록 [:항목 "일" "반" "목" "록"]]]

      (분석 "* 첫번째\n* 두번째")
      [:문서 [:일반목록 [:항목 "첫" "번" "째"] [:항목 "두" "번" "째"]]]

      (분석 "* *강조*한거\n* [링크](/12)건 거\n")
      [:문서 [:일반목록
              [:항목 [:기울임 "강" "조"] "한" "거"]
              [:항목 [:일반링크 [:텍스트 "링" "크"] [:주소 "/" "1" "2"]] "건" " " "거"]]]

      (분석 "1. 첫번째\n2. 두번째\n")
      [:문서 [:숫자목록 [:항목 "첫" "번" "째"] [:항목 "두" "번" "째"]]]
      ))

  (testing "제목"
    (are [시도 결과] (= 시도 결과)
      (분석 "# 큰제목")
      [:문서 [:큰제목 "큰" "제" "목"]]

      (분석 "# 큰제목 #")
      [:문서 [:큰제목 "큰" "제" "목"]]

      (분석 "## 작은제목")
      [:문서 [:작은제목 "작" "은" "제" "목"]]

      (분석 "## 작은제목 ##")
      [:문서 [:작은제목 "작" "은" "제" "목"]]

      (분석 "# **강조**제목\n다음")
      [:문서 [:큰제목 [:굵게 "강" "조"] "제" "목"] [:문단 "다" "음"]]
      ))

  (testing "링크"
    (are [시도 결과] (= 시도 결과)
      (분석 "[링크](주소)를 걸어보자")
      [:문서 [:문단 [:일반링크 [:텍스트 "링" "크"] [:주소 "주" "소"]] "를" " " "걸" "어" "보" "자"]]

      (분석 "[*강조*링크](주소)걸기")
      [:문서 [:문단 [:일반링크 [:텍스트 [:기울임 "강" "조"] "링" "크"] [:주소 "주" "소"]] "걸" "기"]]

      (분석 "[[링크]](주소)걸기")
      [:문서 [:문단 [:일반링크 [:텍스트 "[" "링" "크" "]"] [:주소 "주" "소"]] "걸" "기"]]

      (분석 "<http://자동.com/> 테스트>")
      [:문서 [:문단 [:자동링크 [:자동주소 "h" "t" "t" "p" "://" "자" "동" "." "c" "o" "m" "/"]]
              " " "테" "스" "트" ">"]]))

  (testing "문단"
    (are [시도 결과] (= 시도 결과)
      (분석 "")
      [:문서 [:문단]]

      (분석 "문장 하나\n문장 둘.\n\n")
      [:문서
       [:문단 "문" "장" " " "하" "나"]
       [:문단 "문" "장" " " "둘" "."]
       [:문단]]))

  (testing "강조"
    (are [시도 결과] (= 시도 결과)
      (분석 "*이탤릭* 시작")
      [:문서 [:문단 [:기울임 "이" "탤" "릭"] " " "시" "작"]]

      (분석 "_이탤릭_으로 시작")
      [:문서 [:문단 [:기울임 "이" "탤" "릭"] "으" "로" " " "시" "작"]]

      (분석 "**굵게*강조** *이탤릭*한 문장")
      [:문서 [:문단 [:굵게 "굵" "게" "*" "강" "조"] " " [:기울임 "이" "탤" "릭"] "한" " " "문" "장"]]

      (분석 "이렇게 __굵게_강조__한 문장")
      [:문서 [:문단 "이" "렇" "게" " " [:굵게 "굵" "게" "_" "강" "조"] "한" " " "문" "장"]])))
