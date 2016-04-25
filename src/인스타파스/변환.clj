(ns 인스타파스.변환
  (:require [인스타파스.블럭 :as 블럭]
            [인스타파스.문장 :as 문장]
            [instaparse.core :as insta]
            [clojure.test :refer :all]))


(defn 마크다운 [텍스트]
  (->> 텍스트
       블럭/분석
       (insta/transform {:문장 (fn [& 글자들]
                                 (문장/분석 (apply str 글자들)))})))

(마크다운 "*강조*큰제목\n====\n일반문장.\n")

(defn ->HTML [트리]
  (let [태그 (fn [키워드] (case 키워드
                         :문서   ["" ""]
                         :큰제목 ["<h1>"   "</h1>"]
                         :문단   ["<div>"  "</div>"]
                         :문장   [""       ""]
                         :기울임 ["<i>"    "</i>"]
                         [(name 키워드)]))]
    (if (seq 트리)
      (cond
        (vector? 트리)
        (let [[열기 닫기] (태그 (first 트리))]
          (str 열기
               (apply str (map ->HTML (rest 트리)))
               닫기))

        (string? 트리)
        트리

        :else
        (throw (IllegalStateException.))))))

(->HTML (마크다운 ""))
(->HTML (마크다운 "중간*강조*큰제목\n====\n일반문장.\n"))
