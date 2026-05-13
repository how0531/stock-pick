# stock-pick

模擬手機版股票 App 的 Vue 3 + Vite 前端 demo，內含選股、總覽、產業、跟單、設定等畫面。

> 純前端展示用途，所有資料來自 `src/data/stocks.js` 的靜態 mock data，沒有後端 API。

---

## 開發環境

| 項目 | 版本 |
|---|---|
| Vue | 3.5.x |
| Vite | 6.x |
| Node | 建議 18+ |

## 指令

```bash
npm install        # 安裝依賴
npm run dev        # 啟動開發伺服器（預設 http://localhost:5173）
npm run build      # 產生 production bundle 到 dist/
npm run preview    # 本地預覽 production 結果
```

---

## 目錄結構

```
stock-pick/
├─ index.html            HTML 入口
├─ package.json
├─ vite.config.js
└─ src/
   ├─ main.js            Vue app 進入點，掛載 #app 並載入全域 CSS
   ├─ App.vue            根元件：手機外殼、頁面切換、設定齒輪、全域 sheet
   │
   ├─ styles/
   │  └─ variables.css   設計 token（顏色、字型、reset、--font-scale）
   │
   ├─ data/
   │  └─ stocks.js       全部 mock 資料 + 取資料的 helper（getStocks 等）
   │
   ├─ composables/       共用 reactive 狀態（Vue 的 hooks）
   │  ├─ useEditMode.js  選股區塊排序、編輯模式
   │  ├─ useFontScale.js 全域字級倍率（CSS var --font-scale）
   │  └─ useToast.js     全域 toast 通知
   │
   ├─ views/             頁面層（由 App.vue 依 activePage 切換）
   │  ├─ StockPickView.vue   選股主頁
   │  ├─ OverviewView.vue    總覽頁
   │  └─ PlaceholderView.vue 未實作頁面的佔位（下單匣 / 自選 / 帳務）
   │
   └─ components/        可重用元件，依責任分子資料夾
      ├─ layout/         排版與導覽外殼
      │  ├─ StatusBar.vue        頂部假狀態列（時間、5G、電量）
      │  └─ BottomNav.vue        底部 5 分頁導覽
      │
      ├─ sheets/         底部彈出 Sheet（Teleport + Transition）
      │  ├─ SettingsSheet.vue    設定（字級 + 編輯排序）
      │  ├─ WatchlistSheet.vue   加入自選清單
      │  ├─ FilterSheet.vue      價/量/漲跌幅進階篩選
      │  ├─ FollowSheet.vue      一鍵跟單
      │  └─ StockDetailSheet.vue 個股詳細
      │
      ├─ ui/             跨頁通用基礎元件
      │  ├─ SectionCard.vue     有標題的卡片殼
      │  ├─ CategoryTabs.vue    分類分頁列
      │  ├─ ChipFilter.vue      chip 單選列
      │  └─ Toast.vue           顯示 toast 訊息
      │
      ├─ overview/       「總覽」頁面專屬元件
      │  ├─ InventoryCard.vue
      │  ├─ ShortcutGrid.vue
      │  └─ FocusGroupSection.vue
      │
      └─ stock-pick/     「選股」頁面專屬元件
         ├─ StockList.vue
         ├─ StockRow.vue
         ├─ IndustrySection.vue
         ├─ IndustryDetailView.vue
         ├─ MarketIndexSection.vue
         └─ MarketDistribution.vue
```

---

## 架構概念

### 資料流

```
data/stocks.js  ─────►  各元件 import
                        （沒有 store / Vuex / Pinia）
```

所有畫面顯示的數字、清單、產業、庫存…都是 `stocks.js` 內的 export const。要改成真實 API 時，只要把這些 export 換成 fetch 或 axios 即可。

### 跨元件共享狀態（composables singleton）

三個 composable 都用「**模組層級 ref + 直接 export 函式**」的 singleton 模式，多個元件 `useXxx()` 拿到的是同一份狀態：

| Composable | 控制什麼 | 持久化 |
|---|---|---|
| `useFontScale` | 全域文字倍率 0.8x ~ 1.5x | localStorage `font-scale` |
| `useEditMode` | 選股頁的編輯模式、區塊順序 | localStorage `section_order_v1` |
| `useToast` | 提示訊息 | 不需要持久化 |

### 頁面切換

`App.vue` 用 `activePage` ref（`'stock-pick'` / `'overview'` / 其他）做 `v-if` 切換，沒有用 vue-router（demo 等級不需要）。

### Sheet 模式

所有底部 sheet 共用一致的結構：

```vue
<Teleport to="body">
  <Transition name="sheet">
    <div v-if="visible" class="overlay" @click.self="close">
      <div class="sheet">
        <!-- 內容 -->
      </div>
    </div>
  </Transition>
</Teleport>
```

要新增一個 sheet，可直接複製 `WatchlistSheet.vue` 改內容即可。

---

## 使用說明（給 end user）

### 主畫面

- **底部導覽列**：總覽 / 選股 / 下單匣 / 自選 / 帳務（中間紅色按鈕為下單匣）
- **右上齒輪**：開啟「設定」面板（字級、編輯排序）

### 選股頁

- **短線 / 波段**：右上 toggle 切換選股策略風格
- **分類 tab**：盤中熱門 / 籌碼排行 / 策略選股 / 跟單策略
- **chip 列**：分類底下的細項篩選（短多精選、成值排行…）
- **漏斗 icon**：開啟進階篩選 sheet（價格、量、漲跌幅）
- **+ 自選**：進入勾選模式，多選後底部出現「加入自選」浮動鈕
- **點某產業**：切到產業詳細頁，看該產業的所有個股
- **點某股票**：開啟個股詳細 sheet

### 設定面板（齒輪 → 底部 sheet）

- **字級大小**：拖曳滑桿即時縮放全站文字（0.8x ~ 1.5x），會記住設定
- **選股清單排序**：點「編輯排序」→ 自動跳到選股頁、各區塊出現 ↑↓ 箭頭可重新排序；按上方「完成」或再開設定點「結束編輯」即儲存

### 一鍵跟單

選股頁某些分類（例如「跟單策略」）的 chip 列前面會有紫色「一鍵跟單」按鈕，點下去開啟 FollowSheet 可選股票與設定金額。

---

## 開發須知

### 加入新元件

1. 依責任放到對應 `components/<subfolder>/`：
   - 全頁通用 → `ui/`
   - 底部彈出 → `sheets/`
   - 「總覽」專屬 → `overview/`
   - 「選股」專屬 → `stock-pick/`
   - 排版／導覽 → `layout/`
2. 在檔案頂部加上繁中註解（用途、使用位置、Props/Emits）
3. 字級相關的 `font-size` 一律寫 `calc(Xpx * var(--font-scale))`，純 px 只用在「不應隨字級縮放」的 UI（icon 容器、設定面板控制元件等）

### 新增頁面

1. 在 `views/` 新增 `XxxView.vue`
2. 在 `App.vue` 的 `script setup` 加入 import 並補一條 `<XxxView v-else-if="activePage === 'xxx'" />`
3. 如果有新增分頁，在 `data/stocks.js` 的 `bottomNavItems` 補項目

### 新增全域共享狀態

依 `useToast.js`（最簡單）或 `useFontScale.js`（含 localStorage）為樣板，放到 `composables/`。

---

## 已知限制

- 純 demo，沒有真正的下單、API、登入機制
- 部分底部分頁（下單匣、自選、帳務）只有 PlaceholderView，待實作
- 為了 mobile-first 體驗，整個畫面寬度限制在 420px 內（`.phone` 容器）
