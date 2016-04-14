(ns instaparse-practice.core
  (:require [instaparse.core :as insta]))

(def md-parser
  (insta/parser
   "doc             := section*
    section         := heading? block+
    block           := para | blank-line
    para            := WORD
    blank-line      := [WP] EOL
    <heading>       := h1
    <heading-title> := para
    h1              := <'#'> [WP] heading-title [WP] ['#']

    <WORD>     := #'\\S+'
    WP         := (' ' | '\\t')+
    EOL        := <['\\r'] '\\n'>
    "))

(md-parser "# title한글\n")
(md-parser "# 한글제목\nabc\n \nab")

(def test-parser
  (insta/parser
   "doc        := para
    para       := letter+

    <letter>   := #'[a-zA-Z0-9]'
    <WP>       := #'\\s+'
    <NL>       := ['\\r'] '\\n'
    "))


(test-parser "test")
