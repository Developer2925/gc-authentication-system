# 認証システムのワークフロー（React + Node.js + Express + MySQL）

このドキュメントでは、**React**、**Node.js**、**Express**、**MySQL** を使用して構築された認証システムのワークフローを説明します。本システムでは、ユーザーが **登録・ログイン・JWT を利用した認証状態の維持** を行うことができます。JWT はブラウザの **localStorage** に保存されます。

---

## 🚀 使用技術（Tech Stack）

### **フロントエンド（Client）**

* React
* Axios
* TailwindCSS
* React Toastify（通知）
* React Router DOM（ルーティング）

### **バックエンド（Server）**

* Node.js
* Express
* MySQL2（DB 接続）
* JSON Web Token（JWT）
* BcryptJS（パスワードハッシュ化）
* CORS
* Dotenv
* Nodemon

---

## ⚙️ 全体のワークフロー概要

認証フローは以下の3つのステップで構成されています：

1. **ユーザー登録（Register）**
2. **ログイン（Login）**
3. **JWT を利用した保護されたルート（Protected Route）へのアクセス**

---

# 1️⃣ ユーザー登録（Register）ワークフロー
<img width="600" height="400" alt="Screenshot 2025-12-13 at 0 34 58" src="https://github.com/user-attachments/assets/bdec6183-4dda-4ed4-96c3-a535373fd02f" />

### **ステップ 1：ユーザーが情報を入力**

登録ページでは以下を入力します：

* ユーザー名（username）
* メールアドレス（email）
* パスワード（password）

### **ステップ 2：フロントエンドのバリデーション**

React 側で全フィールドが入力されているか確認し、未入力時には Toastify でエラーを表示します。

### **ステップ 3：バックエンドに API リクエスト送信**

```
POST /register
```

### **ステップ 4：サーバー側の検証**

* 全フィールドが入力されているか
* メールがユニークか
* パスワードが安全基準を満たしているか

### **ステップ 5：パスワードをハッシュ化**

`bcryptjs` を使ってパスワードを安全にハッシュ化します。

### **ステップ 6：ユーザーを MySQL に保存**

ユーザーをデータベースに登録します。

### **ステップ 7：ログインページにリダイレクト**

登録成功後、ログインページへ遷移します。

---

# 2️⃣ ログイン（Login）ワークフロー
<img width="600" height="400" alt="Screenshot 2025-12-13 at 0 35 06" src="https://github.com/user-attachments/assets/e7efa44d-9bb8-4aae-b204-889469e4a0a0" />

### **ステップ 1：メールとパスワードを入力**

空欄がある場合は Toastify がエラーを表示します。

### **ステップ 2：API リクエストを送信**

```
POST /login
```

### **ステップ 3：サーバー側の確認**

* ユーザーが存在するか
* パスワードが一致するか（bcryptjs）

### **ステップ 4：JWT トークンの生成**

認証成功時、ユーザー ID を含む JWT を生成。

### **ステップ 5：フロント側でトークンを保存**

```
localStorage.setItem("token", receivedToken);
```

### **ステップ 6：ホームページへリダイレクト**

ログイン成功後、保護された Home ページに遷移します。

---

# 3️⃣ 保護されたルート（Protected Route）のワークフロー
<img width="600" height="400" alt="Screenshot 2025-12-13 at 0 35 20" src="https://github.com/user-attachments/assets/f96e376c-7fac-45e0-8d19-56ef61ca4cfe" />

### **目的：**

未認証ユーザーが URL を直接入力して Home にアクセスするのを防ぐ。

### **ステップ 1：localStorage のトークン確認**

ユーザーが以下を開いた際：

* `/home`
* 新しいブラウザ（Safari、Chrome、Incognito）

React でトークンがあるか確認：

```
const token = localStorage.getItem("token");
```

### **ステップ 2：トークンがある場合**

* ユーザーはログイン状態を維持
* Home ページにアクセス可能

### **ステップ 3：トークンがない場合**

* 自動的に **Login ページへリダイレクト**

これにより **ブラウザごとに正しいセッション状態が維持** できます。

---

# 🔐 JWT 認証ロジック

### **トークンの役割**

* セッションをサーバーに保存しない「ステートレス認証」
* ユーザーIDと有効期限が含まれる

### **トークンの保存場所**

* localStorage（ブラウザ永続化）

React はこのトークンの有無で認証状態を判断します。

---

# 📦 依存関係（Dependencies）

## **フロントエンド（Client）**

```
npm install axios tailwindcss react-toastify react-router-dom
npm run dev
```

## **バックエンド（Server）**

```
npm install express cors dotenv nodemon jsonwebtoken mysql2 bcryptjs
npm start
```

---

# 🎯 機能まとめ

* ユーザー登録（username / email / password）
* パスワードはハッシュ化して保存
* メール＋パスワードでログイン
* JWT を生成してフロントへ送信
* JWT を localStorage に保存
* 登録・ログイン後は自動リダイレクト
* トークンがない場合は Home ページへアクセス不可
* トークンがある場合のみログイン状態を維持
