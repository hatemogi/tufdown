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
  (->> text
       make-str-end-with-LF
       block/parse
       (insta/transform {:문장 #(span/parse (apply str %&))})))

(declare render-html)

(defn- render-element [[태그 & 내용]]
  (let [태그맵 {:큰제목 "h2", :작은제목 "h3", :일반목록 "ul", :숫자목록 "ol"
                :항목 "li", :인용 "blockquote", :원문 "pre", :문단 "p"
                :기울임 "i", :굵게 "em"}
        추출 (fn [tag] (first (filter #(= (first %) tag) 내용)))
        문자열 #(apply str (rest (추출 %)))]
    (case 태그
      :빈줄   "<br/>"
      :구분줄 "<hr/>"

      :소스코드
      (str "<pre><code" (if-let [언어 (문자열 :소스언어)] (str " data-lang=\"" 언어 "\"")) ">"
           (render-html (문자열 :소스내용))
           "</code></pre>")

      :일반링크
      (str "<a href=\"" (문자열 :주소) "\">"
           (render-html (추출 :텍스트))
           "</a>")

      ;; 기본
      (if-let [tag (태그맵 태그)]
        (str "<" tag ">" (render-html 내용) "</" tag ">")
        (render-html 내용)))))

(defn render-html [e]
  (cond
    (vector? e) (render-element e)
    (string? e) (escape-html e)
    (seq? e)    (apply str (map render-html e))
    (nil? e)    ""
    :default    (recur (str e))))

(def
  parse-and-render
  (comp render-html parse))

;;(render-html (parse "[*링*크](http://test.com)"))
