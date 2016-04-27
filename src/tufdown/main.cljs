(ns tufdown.main
  (:require [tufdown.core :as t]
            [cljsjs.codemirror]
            [cljsjs.codemirror.mode.markdown]
            [cljsjs.codemirror.keymap.emacs]))

(enable-console-print!)

(defonce editor (atom nil))

(defn on-change []
  (let [html (time (t/parse-and-render (.getValue @editor)))]
    (js/console.log html)))

(defn reload-hook []
  (js/console.log "리로드!")
  ;(.toTextArea @editor)
  )

(defn -main []
  (js/console.log
   (t/render-html (t/parse "테스트")))
  (let [textarea (js/document.getElementById "editor")
        cm (js/CodeMirror.fromTextArea
            textarea
            #js {:mode "markdown" :lineNumbers true})]
    (reset! editor cm)
    (.on cm "change" #(js/setTimeout on-change 0))))

(aset js/window "onload" -main)
