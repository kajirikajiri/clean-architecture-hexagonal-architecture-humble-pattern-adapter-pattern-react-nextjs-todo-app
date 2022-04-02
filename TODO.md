# eslintのルールを作る
- 作り方
https://zenn.dev/nus3/articles/b2bc110efd0887442c11

- ディレクトリ構成
https://zenn.dev/kichion/articles/fddf0eb35ffa2a

# clean-architecture

- golangサンプル
https://github.com/eminetto/clean-architecture-go-v2

- reactサンプル
https://github.com/bespoyasov/frontend-clean-architecture/tree/master/src

- 概要把握
https://qiita.com/nrslib/items/a5f902c4defc83bd46b8#repository

- nextjsディレクトリ構成
https://zenn.dev/kichion/articles/fddf0eb35ffa2a

# 理解
黄色はドメイン。どこから使ってもいい。
内側から外側を呼び出すのは禁止
web, ui, db, devices, external interfacesは薄くラップして使う
controllers, gateways, presentersは青の層を入れ換えても使えるように実装する

- presenterは表示するためのデータ加工を行う
https://qiita.com/nrslib/items/a5f902c4defc83bd46b8#presenter

- 実際の使い方は右下の図
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=At%20the%20lower,the%20use%20cases.


## Entities
- エンティティは、企業全体のビジネスルールをカプセル化します。エンティティは、メソッドを持つオブジェクトであることもあれば、データ構造と関数のセットであることもある。エンティティが企業内の多くの異なるアプリケーションで使用される限り、それは問題ではありません。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=Entities%20encapsulate%20Enterprise%20wide%20business%20rules.%20An%20entity%20can%20be%20an%20object%20with%20methods%2C%20or%20it%20can%20be%20a%20set%20of%20data%20structures%20and%20functions.%20It%20doesn%E2%80%99t%20matter%20so%20long%20as%20the%20entities%20could%20be%20used%20by%20many%20different%20applications%20in%20the%20enterprise.

- もしあなたが企業を持っておらず、単に一つのアプリケーションを書いているのであれば、これらのエンティティはアプリケーションのビジネスオブジェクトとなる。最も一般的で高度なルールをカプセル化します。このエンティティは、外部の何かが変更されたときに、変更される可能性が最も低いものです。例えば、これらのオブジェクトは、ページナビゲーションやセキュリティの変更によって影響を受けることはないでしょう。特定のアプリケーションの運用が変わっても、エンティティ層には影響がないはずです。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=If%20you%20don%E2%80%99t,the%20entity%20layer.

## Use Cases
- このレイヤーのソフトウェアは、アプリケーション固有のビジネスルールを含んでいます。これは、システムのすべてのユースケースをカプセル化し、実装するものです。これらのユースケースは、エンティティとの間のデータの流れを調整し、ユースケースの目標を達成するために企業全体のビジネスルールを使用するようにこれらのエンティティを指示します。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=The%20software%20in,the%20use%20case.

- このレイヤーの変更がエンティティに影響することはないと考えています。また、このレイヤーは、データベース、UI、または一般的なフレームワークのような外部性の変更によって影響を受けることはないと考えています。このレイヤーはそのような懸念から隔離されています。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=We%20do%20not%20expect%20changes%20in%20this%20layer%20to%20affect%20the%20entities.%20We%20also%20do%20not%20expect%20this%20layer%20to%20be%20affected%20by%20changes%20to%20externalities%20such%20as%20the%20database%2C%20the%20UI%2C%20or%20any%20of%20the%20common%20frameworks.%20This%20layer%20is%20isolated%20from%20such%20concerns.

- しかし、アプリケーションの運用を変更すると、ユースケースに影響を与え、その結果、このレイヤーのソフトウェアに影響を与えることが予想されます。ユースケースの詳細が変更された場合、このレイヤーのいくつかのコードは確実に影響を受けるでしょう。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=We%20do%2C%20however%2C%20expect%20that%20changes%20to%20the%20operation%20of%20the%20application%20will%20affect%20the%20use%2Dcases%20and%20therefore%20the%20software%20in%20this%20layer.%20If%20the%20details%20of%20a%20use%2Dcase%20change%2C%20then%20some%20code%20in%20this%20layer%20will%20certainly%20be%20affected.
## Interface Adapters
- このレイヤーのソフトウェアは、ユースケースやエンティティにとって最も便利なフォーマットから、データベースやウェブなどの外部機関にとって最も便利なフォーマットにデータを変換するアダプターの集合体である。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=The%20software%20in%20this%20layer%20is,cases%20to%20the%20presenters%20and%20views.

- 例えば、GUIのMVCアーキテクチャを全面的に含むのはこの層である。Presenters、Views、Controllersはすべてここに含まれます
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=It%20is%20this%20layer%2C%20for%20example%2C%20that%20will%20wholly%20contain%20the%20MVC%20architecture%20of%20a%20GUI.%20The%20Presenters%2C%20Views%2C%20and%20Controllers%20all%20belong%20in%20here.

- モデルは、コントローラからユースケースに渡され、ユースケースからプレゼンターやビューに戻されるデータ構造に過ぎないと思われます。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=The%20models%20are%20likely%20just%20data%20structures%20that%20are%20passed%20from%20the%20controllers%20to%20the%20use%20cases%2C%20and%20then%20back%20from%20the%20use%20cases%20to%20the%20presenters%20and%20views.

- 同様に、データはこの層で、エンティティやユースケースに最も適した形式から、使用する永続化フレームワークに最も適した形式、つまり、データベースに変換されます。この円の内側にあるコードは、データベースについて全く何も知らないはずです。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=Similarly%2C%20data%20is%20converted%2C%20in%20this%20layer%2C%20from%20the%20form%20most%20convenient%20for%20entities%20and%20use%20cases%2C%20into%20the%20form%20most%20convenient%20for%20whatever%20persistence%20framework%20is%20being%20used.%20i.e.%20The%20Database.

- もしデータベースがSQLデータベースなら、すべてのSQLはこのレイヤーに、特にデータベースと関係のあるこのレイヤーの部分に限定されるべきです。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=If%20the%20database%20is%20a%20SQL%20database%2C%20then%20all%20the%20SQL%20should%20be%20restricted%20to%20this%20layer%2C%20and%20in%20particular%20to%20the%20parts%20of%20this%20layer%20that%20have%20to%20do%20with%20the%20database.

- また、このレイヤーには、外部サービスなどの外部フォームから、ユースケースやエンティティが使用する内部フォームにデータを変換するために必要なその他のアダプターがあります。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=Also%20in%20this%20layer%20is%20any%20other%20adapter%20necessary%20to%20convert%20data%20from%20some%20external%20form%2C%20such%20as%20an%20external%20service%2C%20to%20the%20internal%20form%20used%20by%20the%20use%20cases%20and%20entities.

## Frameworks and Drivers.

- 一番外側の層は、一般的にデータベースやWebフレームワークなどのフレームワークやツールで構成されています。一般的に、このレイヤーでは、次のサークル内と通信するためのグルーコード以外、あまりコードを書きません。
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#:~:text=The%20outermost%20layer%20is%20generally%20composed%20of%20frameworks%20and%20tools%20such%20as%20the%20Database%2C%20the%20Web%20Framework%2C%20etc.%20Generally%20you%20don%E2%80%99t%20write%20much%20code%20in%20this%20layer%20other%20than%20glue%20code%20that%20communicates%20to%20the%20next%20circle%20inwards.

## viewの考察 mvvm, mvp, mvc, humble view, supervising controller

https://qiita.com/nrslib/items/a5f902c4defc83bd46b8#view-%E3%81%AE%E5%86%8D%E7%8F%BE

## redux best practice

色々見るとユーザーのアクションに基づいてactionの単位を決める。っぽい。が、actorになりうるものであればactionの単位に含めてみる。
https://github.com/reduxjs/redux/issues/1171#issuecomment-167615246

パラメータ形式はflux-standard-actionで定義されているものを使う
https://github.com/redux-utilities/flux-standard-action
https://qiita.com/yasuhiro-okada-aktsk/items/a14f7f37262fb6cf0bf8#action-%E3%81%AE%E6%A7%8B%E9%80%A0

/*
 * type: '',      // must アクションタイプ
 * payload: {},   // optional 主なデータ
 * meta?: {},     // optional 追加情報
 * error?:        // optional エラーかどうか
 */
