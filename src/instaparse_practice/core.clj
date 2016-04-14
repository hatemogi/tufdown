(ns instaparse-practice.core
  (:require [instaparse.core :as insta]))

(def md-parser
  (insta/parser
   "doc             := {section | para}
    section         := heading para
    blank-line      := <WP* NL>
    <heading>       := h1 | h2
    <heading-title> := para
    h1              := <'#'> <WP*> para <['#']>
    h2              := <'#'> h1 <['#']>
    para            := (letter | blank-line | WP)+

    <letter>   := #'[a-zA-Z0-9]'
    <WP>       := #'\\s'
    <NL>       := ['\\r'] '\\n'
    "))

(def test-parser
  (insta/parser
   "doc        := para
    para       := letter+

    <letter>   := #'[a-zA-Z0-9]'
    <WP>       := #'\\s'
    <NL>       := ['\\r'] '\\n'
    "))

(md-parser "# abc \nabc\n \nab")
(test-parser "test")
