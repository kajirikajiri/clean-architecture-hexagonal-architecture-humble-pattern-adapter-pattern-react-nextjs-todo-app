# アダプタパターン
アダプタの説明でわかりやすかったもの: https://alistair.cockburn.us/hexagonal-architecture/#:~:text=Removing%20any%20left,be%20plugged%20in.
自分の理解: パソコンとUSBとUSBドライバがあるとする。パソコンはこのデータなら出力可能だという。USBはこの入力が必要だという。わかっているのはそれだけだ。その情報をもとに作業するのがUSBドライバ

パソコンのoutput(USBドライバのinput) -> USBドライバ(パソコンのoutputをもとに、USBのinputを生成して出力(USBドライバのoutput)する) -> USB(この形式のデータが必要(USBのinput)という要求をする)

これをコンポーネントに置き換えてみよう。

input -> アダプタ -> output

1
ユーザーが何かしらの動作を行う。その動作で出力されるデータ形式を決定しておく。
アダプタは入力を出力形式に変換する。
コンポーネントは必要なデータの形式を示しておく。入ってきたものをただ表示するだけ。(humbleパターン)

2
ユーザーが何かしらの動作を行う。その動作で出力されるデータ形式を決定しておく。そして、アダプタは入力を出力形式に変換する。
コンポーネントは必要なデータの形式を示しておく。入ってきたものをただ表示するだけ。(humbleパターン)

page

入力
has user actions
has lifecicle events
?? actions

view 要求(表示に必要なデータ)