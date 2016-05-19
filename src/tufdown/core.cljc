(ns tufdown.core
  (:require [tufdown.block :as block]
            [tufdown.span :as span]
            [tufdown.util :refer [escape-html]]
            [instaparse.core :as insta]))

(defn- make-str-end-with-LF [text]
  (if (= \newline (last text))
    text
    (str text "\n")))

(defn parse [text]
  (let [문장분석 #(span/parse (apply str %&))]
    (->> text
         make-str-end-with-LF
         block/parse
         (insta/transform {:문장 문장분석})
         (insta/transform {:링크텍스트 문장분석}))))

;(parse "[기본링크](http://test.com)")
(defn- extract [elements keyword]
  (->> elements
       (filter vector?)
       (filter #(= keyword (first %)))))

(def ^:private extract-first
  (comp first extract))

(defn- extract-str [elements keyword]
  (if-let [e (extract-first elements keyword)]
    (apply str (rest e))))

(defn extract-references
  "참조링크나 각주정보 추출해두기"
  [tree]
  (let [xs (tree-seq vector? (partial filter vector?) tree)
        ref-links (extract xs :각주링크)
        ref-paras (extract xs :각주문단)]
    {:링크
     (reduce merge (map (fn [e] (let [es (partial extract-str e)]
                                 {(es :각주이름) {:주소 (es :각주주소)
                                                  :타이틀 (es :링크타이틀)}}))
                        ref-links))
     :각주
     (reduce merge (map (fn [e] {(extract-str e :각주이름)
                                (extract-first e :문장)})
                        ref-paras))}))

(extract-references (parse "[^각주]: 라인1\n라인2"))

(def ^:dynamic *doc-refs* {})

(declare render-html)

(defn- render-element [[태그 & 내용 :as 요소]]
  (let [태그맵 {:큰제목 "h1", :작은제목 "h2", :일반목록 "ul", :숫자목록 "ol",
                :코드 "code" :항목 "li", :문단 "p", :기울임 "i", :굵게 "b"}
        추출   (partial extract-first 내용)
        문자열 (partial extract-str 내용)
        정보없음 #(str "<정보없음: " % ">")]
    (case 태그
      :빈줄   "<br/>"
      :구분줄 "<hr/>"

      :소스코드
      (str "<pre><code" (if-let [언어 (문자열 :소스언어)] (str " data-lang=\"" 언어 "\"")) ">"
           (render-html (문자열 :소스내용))
           "</code></pre>")

      :일반링크
      (str "<a href=\"" (문자열 :주소) "\">"
           (render-html (추출 :문장))
           "</a>")

      :참조링크
      (if-let [링크정보 (get-in *doc-refs* [:링크 (문자열 :참조이름)])]
        (str "<a href=\"" (링크정보 :주소)  "\">"
             (render-html (or (링크정보 :문장)
                              (문자열 :참조이름)
                              (링크정보 :타이틀)))
             "</a>")
        ;; 링크정보 매칭 실패시 원본 그대로 출력
        (정보없음 (문자열 :참조이름)))

      :자동링크
      (let [링크 (apply str 내용)]
        (str "<a href=\"" 링크 "\">" 링크 "</a>"))

      :측주
      (let [이름 (문자열 :참조이름)]
        (if-let [각주정보 (get-in *doc-refs* [:각주 이름])]
          (str "<label for=\"" 이름 "\" class=\"margin-toggle sidenote-number\"></label>"
               "<input type=\"checkbox\" id=\"" 이름 "\" class=\"margin-toggle\"/>"
               "<span class=\"sidenote\">"
               (render-html 각주정보)
               "</span>")
          ;; 각주정보 매칭 실패시 원본 그대로 출력
          (정보없음 이름)))

      :각주링크
      "" ; skip

      :각주문단
      "" ; skip

      :인용
      (str "<blockquote>"
           (apply str
                  (map #(str "<p>" (render-html %) "</p>")
                       (extract 요소 :문장)))
           "</blockquote>")

      :원문
      (str "<pre class=\"code\">"
           (render-html 내용)
           "</pre>")

      ;; 기본
      (if-let [tag (태그맵 태그)]
        (str "<" tag ">" (render-html 내용) "</" tag ">")
        (render-html 내용)))))

;; (parse "[>주석]\n\n[>주석]: http://test.com\n")
;; (extract-references (parse "[>주석]\n\n[>주석]: http://test.com\n"))
;; (parse-and-render "[>주석]\n\n[>주석]: http://test.com\n")

(defn render-html [e]
  (cond
    (vector? e) (render-element e)
    (string? e) (escape-html e)
    (seq? e)    (apply str (map render-html e))
    (nil? e)    ""
    :default    (recur (str e))))

(defn parse-and-render [text]
  (let [tree (parse text)]
    (binding [*doc-refs* (extract-references tree)]
      (render-html tree))))

;; (parse "[^각주]붙여 주세요.\n\n[^각주]: 라인1\n라인2\n")
;; (map insta/span (parse "[링크][]\n\n[링크]: http://test.com\n"))
;; (.substring "test" 1 3)

;; (extract-references (parse "[링크][]\n\n[링크]: http://test.com\n"))
;; (parse-and-render "[링크][]\n\n[링크1]: http://test.com\n")
;; (render-html (parse "[*링*크](http://test.com)"))
