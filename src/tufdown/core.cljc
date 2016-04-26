(ns tufdown.core
  (:require [tufdown.block :as block]
            [tufdown.span :as span]
            [instaparse.core :as insta]
            [hiccup.util])
  (:import [clojure.lang IPersistentVector ISeq Keyword]))

(defn make-string-end-with-LF [text]
  (if (clojure.string/ends-with? text "\n")
    text
    (str text "\n")))

(defn parse [text]
  (->> text
       block/parse
       (insta/transform {:문장 (fn [& chars]
                                 (span/parse (apply str chars)))})))

;;; the code below is heavily influenced by hiccup

(defprotocol HtmlRenderer
  (render-html [element]))

(defprotocol 여닫기
  (열기 [요소])
  (닫기 [요소]))

(def ^:private
  태그맵 {:큰제목   "h2"
          :작은제목 "h3"
          :일반목록 "ul"
          :숫자목록 "ol"
          :항목     "li"
          :인용     "blockquote"
          :원문     "pre"
          :문단     "div"
          :문장     "p"
          :기울임   "i"
          :굵게     "em"})

(extend-protocol 여닫기
  Keyword
  (열기 [this] (열기 (this 태그맵)))
  (닫기 [this] (닫기 (this 태그맵)))

  Object
  (열기 [this] (str "<" this ">"))
  (닫기 [this] (str "</" this ">"))

  ISeq
  (열기 [this] (apply str (map 열기 this)))
  (닫기 [this] (apply str (reverse (map 닫기 this))))

  nil
  (열기 [_] "")
  (닫기 [_] ""))

(defn render-element [[태그 & 내용]]
  (let [추출 (fn [내부태그]
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
      (str (열기 태그)
           (render-html 내용)
           (닫기 태그)))))

(extend-protocol HtmlRenderer
  IPersistentVector
  (render-html [this]
    (render-element this))

  ISeq
  (render-html [this]
    (apply str (map render-html this)))

  String
  (render-html [this]
    (hiccup.util/escape-html this))

  Object
  (render-html [this]
    (render-html (str this)))

  nil
  (render-html [this] ""))
