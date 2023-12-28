# 写経練習アプリ

このプロジェクトは、写経の練習を支援するためのウェブアプリケーションです。ユーザーはテキストエリアにサンプルテキストを入力し、写経を開始することができます。入力中にタイプミスがあると警告が表示され、完了すると成功メッセージが表示されます。

## 前提条件

このアプリケーションをローカルで実行するためには、以下が必要です：

- Node.js v18.19.0
- npm 1.22.21


## NVMとNode.jsのインストール

このプロジェクトにはNode.jsのバージョン18.19.0が必要です。[NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)を使用して、指定されたバージョンのNode.jsをインストールできます。

### NVMのインストール

#### Linux と macOS:

1. ターミナルを開き、以下のコマンドを実行してください。

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   ```

   または、以下のコマンドを使用します。

   ```bash
   wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   ```

2. ターミナルを再起動するか、次のコマンドを実行してNVMを有効にします。

   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

#### Windows:

Windowsでは、[nvm-windows](https://github.com/coreybutler/nvm-windows)を使用します。[リリースページ](https://github.com/coreybutler/nvm-windows/releases)から最新版をダウンロードしてインストールしてください。

### Node.js v18.19.0のインストール

1. ターミナルで以下のコマンドを実行して、Node.js v18.19.0をインストールします。

   ```bash
   nvm install 18.19.0
   ```

2. インストールしたバージョンを使用するために、次のコマンドを実行します。

   ```bash
   nvm use 18.19.0
   ```

## セットアップ手順

1. **リポジトリをクローンする**

   ```bash
   git clone https://github.com/garchomp-game/shakyo-nuxt
   cd shakyo-nuxt
   ```

2. **依存関係をインストールする**

   ```bash
   npm install
   ```

3. **アプリケーションをローカルで実行する**

   ```bash
   npm run dev
   ```

   上記のコマンドを実行後、ブラウザで `http://localhost:3000` にアクセスしてアプリケーションを使用します。

## 機能

- ユーザーはテキストエリアにサンプルテキストを入力できます。
- 「shakyo開始」ボタンで写経を開始します。
- タイプミスがあると「Miss!」というアラートが表示されます。
- 全てのテキストを正確に入力すると「Complete!」というメッセージが表示されます。
- 「クリア」ボタンでテキストエリアをクリアできます。
- ユーザーの進行状況はローカルストレージに保存され、ページをリロードしても維持されます。

## 貢献

このプロジェクトはオープンソースであり、貢献を歓迎します。新しい機能の提案、バグ修正、ドキュメントの改善など、どのような貢献もありがたいです。

## ライセンス

このプロジェクトはMITライセンスの下で提供されています。詳細については[LICENSE](LICENSE)ファイルをご覧ください。
