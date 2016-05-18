# instaparse-practice

> THIS IS FOR PERSONAL LEARNING AND NOT MEANT TO BE USED BY OTHERS YET.

## Usage


## Rationale

* [합리화와 사전조사](https://medium.com/happyprogrammer-in-jeju/마크다운-파서-만들기-1-합리화와-사전조사-932a269b7233)
* [인스타파서 연습](https://medium.com/happyprogrammer-in-jeju/마크다운-파서-만들기-2-인스타파서-연습-12b2291a9f8b)

## 해결할 것

* 블럭/스팬 나눠서 돌리니, instaparse/span의 메타정보가 어긋남. 원래 메타정보를 더하는 방법은?
  ```
  => (meta (as-and-bs "aaaaabbbaaaabb"))
  {:instaparse.gll/start-index 0, :instaparse.gll/end-index 14}
  ```

## License

Copyright © 2016 Daehyun Kim

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
