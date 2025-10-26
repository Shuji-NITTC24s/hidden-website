# クラス見どころサイト（サンプル）

このリポジトリには、クラスの魅力を日本語で紹介するシンプルで楽しい静的サイトが入っています。

ファイル配置:

- `docs/index.html` — サイト本体（日本語）
- `docs/styles.css` — スタイル
- `docs/script.js` — 少しのインタラクション（お祝いのコンフェッティなど）

公開 (GitHub Pages)

1. GitHub のリポジトリ設定 > Pages に移動します。
2. ブランチを `main`、フォルダを `/docs` に設定して保存します。
3. 数分待つとサイトが <your-username>.github.io/<repo-name> で公開されます。

ローカルで確認する方法（簡易）:

PowerShell でリポジトリのルートを開き、以下を実行します:

```powershell
cd .\docs
python -m http.server 8000
# その後、ブラウザで http://localhost:8000 を開く
```

変更のヒント:
- `docs/index.html` のテキストを日本語で更新してください。
- 画像を使いたい場合は `docs/assets/` フォルダを作り、`<img>` タグで参照してください。

次のステップ（提案）:
- 実際の写真を追加する
- 各プロジェクトページを個別の HTML に分ける
- アクセシビリティの細かな改善とメタデータ追加
