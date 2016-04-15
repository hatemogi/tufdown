(ns instaparse-practice.core
  (:require [instaparse.core :as insta]))

(def md-parser
  (insta/parser
   "doc             := (section / block)*
    section         := heading block*
    <block>         := para
    para            := (#'.+' EOL) / EOL
    blank-line      := [WP] EOL
    heading         := h1
    h1              := <'#'> WP? #'.+' WP? ['#'] EOL

    <WORD>     := #'\\S+'
    <WP>       := #'\\s+'
    EOL        := <['\\r'] '\\n'>
    "))

(md-parser "")
(md-parser "\n")
(md-parser "한글   문단\n")
(md-parser "문단\n두번째 문단.\n\n")
(md-parser "# title 한글\naoeu\n")
(md-pareser "# 한글제목\nabc\n \nab")

(def test-parser
  (insta/parser
   "doc        := section | para | eps
    section    := h1 para*
    h1         := '#' para
    para       := (WORD | WP)* NL

    WORD       := char (WP | char | '#')*
    char       := letter | digit
    letter     := #'[A-Za-z가-힣ㄱ-ㅎ]'
    digit      := #'[0-9]'
    WP         := ('\\t' | ' ')+
    NL         := <['\\r'] '\\n'>
    "))

(test-parser "")
(test-parser "\n")
(test-parser "# 타이#틀\n")
(test-parser "# 제목\ntest 가-나_다라\n\n다음줄\n")
