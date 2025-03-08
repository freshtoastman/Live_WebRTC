# 目錄

/public/index.html



# WebRTC 音訊直播平台

使用 WebRTC 技術構建的實時音訊直播平台，支持廣播者和聽眾角色。

## 功能特性

- 廣播者可以創建音訊直播
- 聽眾可以加入特定房間收聽
- 實時音訊傳輸
- 最小化延遲
- 直播狀態顯示
- 即時顯示連接的聽眾數量
- 支援廣播系統音訊或麥克風
- 簡短易記的房間 ID

## 技術棧

- **前端**: HTML, CSS, JavaScript, WebRTC API
- **後端**: Node.js, Express
- **實時通訊**: Socket.IO
- **信令**: 自定義信令伺服器
- **NAT穿透**: STUN 伺服器

## 部署選項

### 1. 本地開發

1. 安裝依賴:
   ```
   npm install
   ```

2. 啟動伺服器:
   ```
   npm start
   ```
   或者開發模式:
   ```
   npm run dev
   ```

3. 在瀏覽器中訪問:
   ```
   http://localhost:3000
   ```

### 2. GitHub Pages 部署

由於 GitHub Pages 僅支持靜態網站，您需要進行下列步驟：

1. **部署前端到 GitHub Pages**
   - 將 `public` 目錄中的文件推送到您的 GitHub 倉庫
   - 在倉庫設置中啟用 GitHub Pages

2. **部署信令伺服器**
   您需要將 `server.js` 部署到支持 Node.js 的雲平台，例如：
   
   **使用 Glitch:**
   - 在 [Glitch](https://glitch.com) 上創建新項目
   - 上傳 `server.js` 和 `package.json`
   - 項目將自動運行

   **使用 Heroku:**
   - 在 [Heroku](https://heroku.com) 上創建新應用
   - 推送代碼到 Heroku
   - 確保添加了 `Procfile` 含有 `web: node server.js`

3. **配置前端以使用您的信令伺服器**
   - 在廣播者和聽眾頁面上輸入您部署的信令伺服器 URL
   - 確保廣播者和聽眾使用相同的信令伺服器

## 使用指南

### 廣播者:
1. 點擊首頁上的"開始廣播"
2. 輸入信令伺服器 URL（如果部署在 GitHub Pages 上）
3. 選擇音訊來源（麥克風或系統音訊）
4. 點擊"開始廣播"按鈕
5. 記下生成的房間 ID 並分享給聽眾

### 聽眾:
1. 點擊首頁上的"聆聽直播"
2. 輸入信令伺服器 URL（與廣播者相同）
3. 輸入廣播者提供的房間 ID
4. 點擊"加入直播"按鈕

## 瀏覽器兼容性

支持大多數現代瀏覽器，包括:
- Google Chrome (推薦)
- Mozilla Firefox
- Microsoft Edge
- Safari (iOS 11+ 與 macOS High Sierra+)

## 注意事項

- 所有用戶必須授予麥克風訪問權限
- 系統音訊捕獲功能僅在 Chrome 和 Edge 中完全支持
- 某些企業網絡和防火牆設置可能阻止 WebRTC 連接
- 在生產環境中應該使用 HTTPS 與 TURN 伺服器 
