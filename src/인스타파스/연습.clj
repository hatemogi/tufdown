(ns 인스타파스.연습
  (:require [instaparse.core :as insta]))

(def S
  (insta/parser
   "S  := AB*
    AB := A B
    A  := 'a'+
    B  := 'b'+"))

(S "aaaaabbbaaaabb")

(def 마크다운
  (insta/parser
   "문서       := 문단*
    문단       := 평문? 줄바꿈 / 평문
    평문       := 아무거나+

    <아무거나> := #'.'
    <줄바꿈>   := <'\\n'>
   "))

(마크다운 "")
(마크다운 "문장")
(마크다운 "문장 하나\n문장 둘.\n\n")
