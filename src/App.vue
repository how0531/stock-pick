<!--
  App.vue — 應用程式根元件
  ==========================
  職責：
    1. 渲染整個「手機」容器（.phone，max-width 420px 模擬手機畫面）
    2. 用 activePage 切換主畫面（StockPickView / OverviewView / PlaceholderView）
    3. 掛載全域 UI：StatusBar（頂部假狀態列）、BottomNav（底部導覽）、
       SettingsSheet（設定）、StockDetailSheet（個股詳細）、Toast（提示訊息）
    4. 處理「設定 → 編輯排序」流程：自動跳到選股頁 + 進入編輯模式
-->
<template>
  <div class="phone">
    <StatusBar />

    <!-- 頁面切換：用 v-if/v-else-if 而非 vue-router，demo 等級不需要路由 -->
    <StockPickView
      v-if="activePage === 'stock-pick'"
      @select-stock="selectedStock = $event"
    />
    <OverviewView
      v-else-if="activePage === 'overview'"
      @select-stock="selectedStock = $event"
    />
    <!-- 下單匣 / 自選 / 帳務尚未實作，統一用 PlaceholderView -->
    <PlaceholderView v-else :title="pageTitle" @back="activePage = 'stock-pick'" />

    <BottomNav v-model:active="activePage" />

    <!-- 右上設定齒輪：固定浮動，所有頁面都看得到 -->
    <button
      class="settings-fab"
      :class="{ on: settingsVisible }"
      @click="settingsVisible = true"
      aria-label="設定"
      type="button"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    </button>
    <SettingsSheet
      :visible="settingsVisible"
      @close="settingsVisible = false"
      @edit-order="onEditOrder"
    />
  </div>

  <!-- 全域個股詳細 sheet：放在 .phone 外，避免被 padding-bottom: 96px 截斷 -->
  <StockDetailSheet :stock="selectedStock" @close="selectedStock = null" />
  <Toast />
</template>

<script setup>
import { ref, computed } from 'vue'
import StatusBar from './components/layout/StatusBar.vue'
import BottomNav from './components/layout/BottomNav.vue'
import StockDetailSheet from './components/sheets/StockDetailSheet.vue'
import Toast from './components/ui/Toast.vue'
import SettingsSheet from './components/sheets/SettingsSheet.vue'
import StockPickView from './views/StockPickView.vue'
import OverviewView from './views/OverviewView.vue'
import PlaceholderView from './views/PlaceholderView.vue'
import { useEditMode } from './composables/useEditMode.js'

// 目前顯示的頁面 key；改值即切換頁面
const activePage = ref('stock-pick')
// 點到的個股；非 null 時 StockDetailSheet 會自動展開
const selectedStock = ref(null)
const settingsVisible = ref(false)

// 從 composable 取出進入編輯模式的函式（singleton，與 StockPickView 共用同一份狀態）
const { enterEdit } = useEditMode()

const pageTitles = {
  order: '下單匣',
  watchlist: '自選',
  account: '帳務',
}
const pageTitle = computed(() => pageTitles[activePage.value] ?? '')

// 設定面板按「編輯排序」時的流程：
//   1. 切回選股頁（編輯排序只對該頁有意義）
//   2. 進入編輯模式（畫面上各 SectionCard 出現 ↑↓ 箭頭）
//   3. 關閉設定 sheet 讓使用者直接操作
function onEditOrder() {
  activePage.value = 'stock-pick'
  enterEdit()
  settingsVisible.value = false
}
</script>

<style scoped>
.phone {
  width: 100%; max-width: 420px;
  background: var(--bg);
  min-height: 100vh; position: relative;
  padding-bottom: 96px;
  overflow-x: hidden;
}
.settings-fab {
  position: absolute;
  top: 62px;
  right: 14px;
  z-index: 40;
  width: 36px;
  height: 36px;
  border: 1px solid var(--line);
  background: var(--chip);
  color: var(--text);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  padding: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.settings-fab.on {
  background: var(--accent);
  color: #1a1408;
  border-color: var(--accent);
}
</style>
