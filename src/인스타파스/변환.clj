(ns 인스타파스.변환
  (:require [인스타파스.블럭 :as 블럭]
            [인스타파스.문장 :as 문장]
            [instaparse.core :as insta]
            [clojure.test :refer :all])
  (:import [clojure.lang IPersistentVector ISeq]))

(defn 마크다운 [텍스트]
  (->> 텍스트
       블럭/분석
       (insta/transform {:문장 (fn [& 글자들]
                                 (문장/분석 (apply str 글자들)))})))

(마크다운 "*강조*큰제목\n====\n일반문장.\n")

;;; the code below is heavily influenced by hiccup

(defprotocol HtmlRenderer
  (render-html [element]))

(defn render-element [트리]
  (if-let [태그 ({:큰제목   "h2"
                  :작은제목 "h3"
                  :문단     "div"
                  :기울임   "i"
                  :굵게     "em"
                  } (first 트리))]
    (str "<" 태그 ">"
         (render-html (rest 트리))
         "</" 태그 ">")
    (render-html (rest 트리))))

(extend-protocol HtmlRenderer
  IPersistentVector
  (render-html [this]
    (render-element this))

  ISeq
  (render-html [this]
    (apply str (map render-html this)))

  String
  (render-html [this] this)

  Object
  (render-html [this]
    (str this))

  nil
  (render-html [this] ""))

(render-html (마크다운 ""))
(render-html (마크다운 "중간*강조*큰제목\n====\n일반문장.\n"))
