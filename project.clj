(defproject tufdown "0.1.0-SNAPSHOT"
  :description "a markdown-like language and parser for TufteCSS"
  :url "https://github.com/hatemogi/instaparse-practice"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.8.40"]
                 [com.lucasbradstreet/instaparse-cljs "1.4.1.2"]
                 [hiccup "1.0.5"]]
  :plugins [[lein-cljsbuild "1.1.3"]
            [lein-figwheel "0.5.2"]]
  :cljsbuild
  {:builds [{:source-paths ["src"]
             :compiler {:output-to "public/js/main.js"
                        :optimizations :whitespace
                        :pretty-print true}}]}
  :test-paths ["test"])
