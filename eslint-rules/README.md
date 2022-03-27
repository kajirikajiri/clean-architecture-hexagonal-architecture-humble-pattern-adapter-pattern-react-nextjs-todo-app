# 参考
https://zenn.dev/nus3/articles/b2bc110efd0887442c11

# 開発順序
1. typescript で rule を定義
2. コンパイル
3. コンパイルされた js を eslint の rule として使用する

# フォルダ構成
`dist` ts で書いた rules のコンパイル後の js
`docs` rule のドキュメント
`rules` rule の定義場所
`test` rule のテスト
`tsconfig.json` ts で書かれた rule をコンパイルする設定を記載

# 追加設定
- vscodeのパス補完を制御
    - https://github.com/Microsoft/vscode/issues/49994
- tsconfigのpathsとbaseUrlを設定

