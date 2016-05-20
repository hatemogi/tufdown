(ns tufdown.main
  (:require [tufdown.core :as t]
            [cljsjs.codemirror]
            [cljsjs.codemirror.mode.markdown]
            [cljsjs.codemirror.mode.gfm]
            [cljsjs.codemirror.keymap.emacs]))

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

(defn- render-now [text]
  (render (time (t/parse-and-render text))))

(defn reload-hook []
  (js/console.log "리로드!"))

(defn -main []
  (let [textarea (js/document.getElementById "editor")
        cm (js/CodeMirror.fromTextArea
            textarea
            #js {:mode "markdown" :lineNumbers true
                 :lineWrapping true
                 :autofocus true :theme "neo"
                 :size #js {:width "100%" :height "100%"}})
        on-change #(render-now (.getValue cm))
        on-change #(delegate-work (.getValue cm))]
    (.on cm "change" on-change)
    (on-change)))

(aset js/window "onload" -main)
