(ns tufdown.core
  (:require [tufdown.block :as block]
            [tufdown.span :as span]
            [instaparse.core :as insta]
            [tufdown.util :refer [escape-html]]))

(defn- make-string-end-with-LF [text]
  (if (clojure.string/ends-with? text "\n")
    text
    (str text "\n")))

(defn parse [text]
  (->> text
       make-string-end-with-LF
       block/parse
       (insta/transform {:문장 (fn [& chars]
                                 (span/parse (apply str chars)))})))

;;; the code below is heavily influenced by hiccup

(declare render-html)

(defn- render-element [[태그 & 내용]]
  (let [태그맵 {:큰제목   "h2"
                :작은제목 "h3"
                :일반목록 "ul"
                :숫자목록 "ol"
                :항목     "li"
                :인용     "blockquote"
                :원문     "pre"
                :문단     "div"
                :문장     "p"
                :기울임   "i"
                :굵게     "em"}
        여닫기 (fn [e]
                 (if-let [tag (태그맵 e)]
                   [(str "<" tag ">") (str "</" tag ">")]
                   ["" ""]))
        추출 (fn [내부태그]
               (some (fn [요소]
                       (if (= 내부태그 (first 요소))
                         (apply str (rest 요소)))) 내용))]
    (case 태그
      :빈줄
      "<br/>"

      :구분줄
      "<hr/>"

      :소스코드
      (str "<pre><code" (if-let [언어 (추출 :소스언어)] (str " data-lang=\"" 언어 "\"")) ">"
           (render-html (추출 :소스내용))
           "</code></pre>")

      ;; 기본
      (let [[열기 닫기] (여닫기 태그)]
        (str 열기 (render-html 내용) 닫기)))))

(defn render-html [e]
  (cond
    (vector? e) (render-element e)
    (string? e) (escape-html e)
    (seq? e)    (apply str (map render-html e))
    (nil? e)    ""))