(ns tufdown.core-test
  (:require [tufdown.core :refer :all]
            [clojure.test :refer :all]))

(deftest core-test
  (testing "parse tree"
    (is (= [:문서 [:큰제목 [:문장 [:기울임 "강" "조"] "테" "스" "트"]]]
           (parse "*강조*테스트\n==="))))

  (testing "render-html"
    (is (= "<h2>큰제목</h2>"
           (render-html [:큰제목 "큰" "제" "목"])))
    (is (= "<p><a href=\"http://test.com\">링크</a></p>"
           (parse-and-render "[링크](http://test.com)"))))

  (testing "참조 정보 추출"
    (is (= {:링크 {"링크" {:주소 "http://test.com" :타이틀 nil}}}
           (extract-references
            [:각주링크
             [:각주이름 "링" "크"]
             [:각주주소 "h" "t" "t" "p" ":" "/" "/" "t" "e" "s" "t" "." "c" "o" "m"]])))
    (is (= "<p><a href=\"http://test.com\">링크</a></p>"
           (parse-and-render "[링크][]\n\n[링크]: http://test.com\n")))))
