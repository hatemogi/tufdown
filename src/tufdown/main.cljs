(ns tufdown.main
  (:require [tufdown.core :as t]
            [cljsjs.codemirror]
            [cljsjs.codemirror.mode.markdown]
            [cljsjs.codemirror.keymap.emacs]))

(enable-console-print!)

(defonce editor-content (atom nil))
(defonce editor-interval (atom nil))

(defn renderer []
  (when-let [content @editor-content]
    (let [html (time (t/parse-and-render content))]
      (js/console.log html)
      (.. js/document
          (getElementById "preview")
          -contentWindow
          (replace_article html)))
    (reset! editor-content nil)))

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
            #js {:mode "markdown" :lineNumbers true
                 :autofocus true :theme "neo"
                 :size #js {:width "100%" :height "100%"}})]
    (.on cm "changes" #(reset! editor-content (.getValue cm))))
  (reset! editor-interval (js/setInterval renderer 1000)))

(aset js/window "onload" -main)
