# 公開メモ

このサイトは静的構成です。現在の作業環境では外部のホスティング先や認証済みの公開先が未接続のため、ライブ公開そのものはまだ実行していません。

用意済みの公開手段:

1. GitHub Pages
   `.github/workflows/deploy-pages.yml` を同梱済みです。
   `main` ブランチへ push すると GitHub Pages に公開できる構成です。

2. 手動アップロード
   後で生成する `release/nisshindo-site.zip` を、静的ホスティングへそのまま配置できます。

公開時に置き換える値:

- `https://nisshindo-music-demo.example/`
- `info@nisshindo-music-demo.example`
- 住所、電話、講師名、営業時間
