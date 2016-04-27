(ns tufdown.core-test
  (:require [tufdown.core :refer [parse render-html]]
            [clojure.test :refer :all]))

(deftest core-test
  (testing "parse tree"
    (is (= [:문서 [:큰제목 [:문장 [:기울임 "강" "조"] "테" "스" "트"]]]
           (parse "*강조*테스트\n==="))))

  (testing "render-html"
    (is (= "<h2>큰제목</h2>"
           (render-html [:큰제목 "큰" "제" "목"])))))
