(ns tufdown.worker
  (:require [tufdown.core :as t]))

(def ^:private queue (atom ()))

(defn- render [content]
  (let [buffer (atom [])]
    (binding [*print-fn* (fn [& t] (swap! buffer concat t))]
      (let [html (time (t/parse-and-render content))]
        #js {:html html :time (apply str @buffer)}))))

(defn- consumer []
  (when-let [top (first @queue)]
    (.postMessage js/self (render top))
    (reset! queue ())))

(aset js/self "onmessage"
      (fn [m]
        (swap! queue conj (aget m "data"))
        ((aget js/self "setTimeout") consumer 100)))
