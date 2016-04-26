(ns tufdown.main
  (:require [tufdown.core :as t]))

(defn -main []
  (js/console.log "하이하이")
  (js/console.log
   (t/render-html (t/parse "테스트"))))
