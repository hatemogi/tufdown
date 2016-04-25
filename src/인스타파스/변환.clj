(ns 인스타파스.변환
  (:require [인스타파스.블럭 :as 블럭]
            [인스타파스.문장 :as 문장]
            [instaparse.core :as insta]
            [clojure.test :refer :all]))


(defn 마크다운 [텍스트]
  (->> 텍스트
       블럭/분석
       (insta/transform {:문장 (fn [& 내용]
                                 (문장/분석 (apply str 내용)))})))

(마크다운 "*강조*큰제목\n====\n일반문장.\n")
