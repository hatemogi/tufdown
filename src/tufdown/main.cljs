(ns tufdown.main
  (:require [cljsjs.codemirror]
            [cljsjs.codemirror.mode.markdown]))

(enable-console-print!)

(defn render [content]
  ((aget (.. js/document
             (getElementById "preview")
             -contentWindow)
         "replace_article") content))

(let [w (new js/Worker "js/worker.js")]
  (aset w "onmessage"
        (fn [m]
          (let [data (aget m "data")]
            (js/console.log (aget data "time"))
            (render (aget data "html")))))
  (defonce worker w))

(defn delegate-work [content]
  (.postMessage worker content))

(defn -main []
  (let [textarea (js/document.getElementById "editor")
        cm (js/CodeMirror.fromTextArea
            textarea
            #js {:mode "markdown" :lineNumbers true
                 :lineWrapping true
                 :autofocus true :theme "neo"
                 :size #js {:width "100%" :height "100%"}})
        on-change #(delegate-work (.getValue cm))]
    (.on cm "changes" on-change)
    (on-change)))

(aset js/window "onload" -main)
