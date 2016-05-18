(defproject tufdown "0.1.0-SNAPSHOT"
  :description "a markdown-like language and parser for TufteCSS"
  :url "https://github.com/hatemogi/instaparse-practice"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.8.40"]
                 [com.lucasbradstreet/instaparse-cljs "1.4.1.2"]

                 [cljsjs/codemirror "5.11.0-1"]
                 [cljsjs/jquery "2.2.2-0"]]
  :plugins [[lein-cljsbuild "1.1.3"]
            [lein-figwheel "0.5.2"]]
  :cljsbuild
  {:builds [{:id "dev"
             :source-paths ["src"]
             :figwheel {:on-jsload "tufdown.main/reload-hook" }
             :compiler {:output-to "public/js/main.js"
                        :asset-path "js/out"
                        :main "tufdown.main"
                        :optimizations :none
                        :pretty-print true}}
            {:id "worker"
             :source-paths ["src"]
             :compiler {:output-to "public/js/worker.js"
                        :asset-path "js/out"
                        :main "tufdown.worker"
                        :optimizations :advanced}}
            {:id "prod"
             :source-paths ["src"]
             :compiler {:output-to "public/js/main.js"
                        :main "tufdown.main"
                        :optimizations :advanced}}]}
  :test-paths ["test"])
