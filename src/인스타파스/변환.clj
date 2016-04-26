(ns 인스타파스.변환
  (:require [인스타파스.블럭 :as 블럭]
            [인스타파스.문장 :as 문장]
            [instaparse.core :as insta]
            [clojure.test :refer :all]
            [hiccup.util])
  (:import [clojure.lang IPersistentVector ISeq Keyword]))

(defn 마크다운 [텍스트]
  (->> 텍스트
       블럭/분석
       (insta/transform {:문장 (fn [& 글자들]
                                 (문장/분석 (apply str 글자들)))})))

(마크다운 "*강조*큰제목\n====\n일반문장.\n")

;;; the code below is heavily influenced by hiccup

(defprotocol HtmlRenderer
  (render-html [element]))

(defprotocol 여닫기
  (열기 [요소])
  (닫기 [요소]))

(def ^:private 태그맵
  {:큰제목   "h2"
   :작은제목 "h3"
   :일반목록 "ul"
   :숫자목록 "ol"
   :항목     "li"
   :인용     "blockquote"
   :원문     "pre"
   :문단     "div"
   :기울임   "i"
   :굵게     "em"
   })

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

;;(render-html (마크다운 ""))
;;(render-html (마크다운 "```clojure\n(def test <123>)\n```"))
;;(render-html (마크다운 "중간*강조*큰제목\n====\n일반문장.\n"))
