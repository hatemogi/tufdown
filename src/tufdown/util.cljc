(ns tufdown.util)

;; copied from hiccup
(defn escape-html
  "Change special characters into HTML character entities."
  [text]
  (.. (str text)
      (replace "&"  "&amp;")
      (replace "<"  "&lt;")
      (replace ">"  "&gt;")
      (replace "\"" "&quot;")
      (replace "'" "&apos;")))
