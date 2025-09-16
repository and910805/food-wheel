
<img width="539" height="527" alt="image" src="https://github.com/user-attachments/assets/328769f9-f4a7-4b91-b394-f7136dcf6c48" />

[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

# 🎡 Food Wheel 食物轉盤

一個簡單好玩的 **食物隨機轉盤**，解決「今天要吃什麼？」的世紀難題 🍜🍣🍔。  
使用 **React + Vite + TypeScript + TailwindCSS** 建構，並可直接部署到 **GitHub Pages**。

👉 Demo： [Food Wheel](https://and910805.github.io/food-wheel/)

---

## ✨ 功能特色
- 🎡 點擊按鈕即可旋轉，隨機決定要吃什麼
- 🍱 預設清單（鍋燒意麵、便當、韓式、泰式…）
- ➕ 支援自訂新增、刪除選項
- 💾 自動保存到 `localStorage`，下次開啟不會消失
- 🔄 一鍵重置為預設清單
- 📜 歷史紀錄：記錄你之前吃過的選項
- 🎨 美觀 UI，支援淺色 / 深色模式

---

## 🖥️ 開發技術
- ⚡ [Vite](https://vitejs.dev/) - 快速的前端開發工具
- ⚛️ [React](https://react.dev/) - 組件化前端框架
- 📘 [TypeScript](https://www.typescriptlang.org/) - 型別安全
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - 快速設計 UI
- ☁️ [GitHub Pages](https://pages.github.com/) - 免費部署

---

## 📦 安裝與使用

1. Clone 專案：
 ```bash
   git clone https://github.com/and910805/food-wheel.git
   cd food-wheel
```

2. 安裝依賴：

   ```bash
   npm install
   ```

3. 啟動開發伺服器：

   ```bash
   npm run dev
   ```

4. 打包專案：

   ```bash
   npm run build
   ```

5. 部署到 GitHub Pages（自動 CI/CD via GitHub Actions）

---

## 📂 專案結構

```
food-wheel/
├─ src/                # 程式碼
│  ├─ components/      # React 元件 (轉盤)
│  ├─ config.ts        # 預設清單
│  └─ main.tsx         # 入口
├─ public/             # 靜態檔案
├─ index.html
├─ package.json
└─ tailwind.config.ts
```

---

## 📸 截圖

<img width="1379" height="759" alt="image" src="https://github.com/user-attachments/assets/dd9efe7b-b5cb-424b-baf7-8fafb0057ae2" />


---

## 🚀 部署

* 透過 GitHub Actions 自動部署至 GitHub Pages
* 預設網址：

```
    https://<你的 GitHub 使用者名稱>.github.io/food-wheel/
```

---

## 📜 授權

MIT License
自由使用、修改與分享。

---

## 🙌 貢獻

歡迎 Fork & PR！
如果你有新 idea（例如加上餐廳 API、自動推薦），也可以開 issue 一起討論 🤝

```

---

要不要我幫你加上 **screenshot.png** 產生方式？比如直接截你現在的頁面 → 放到 `/public/screenshot.png`，這樣 README 就會自動顯示畫面。
```
