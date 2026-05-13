<template>
  <div class="phone">
    <StatusBar />
    <StockPickView
      v-if="activePage === 'stock-pick'"
      @select-stock="selectedStock = $event"
    />
    <OverviewView
      v-else-if="activePage === 'overview'"
      @select-stock="selectedStock = $event"
    />
    <PlaceholderView v-else :title="pageTitle" @back="activePage = 'stock-pick'" />
    <BottomNav v-model:active="activePage" />

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

  <StockDetailSheet :stock="selectedStock" @close="selectedStock = null" />
  <Toast />
</template>

<script setup>
import { ref, computed } from 'vue'
import StatusBar from './components/StatusBar.vue'
import BottomNav from './components/BottomNav.vue'
import StockDetailSheet from './components/StockDetailSheet.vue'
import Toast from './components/Toast.vue'
import SettingsSheet from './components/SettingsSheet.vue'
import StockPickView from './views/StockPickView.vue'
import OverviewView from './views/OverviewView.vue'
import PlaceholderView from './views/PlaceholderView.vue'
import { useEditMode } from './composables/useEditMode.js'

const activePage = ref('stock-pick')
const selectedStock = ref(null)
const settingsVisible = ref(false)
const { enterEdit } = useEditMode()

const pageTitles = {
  order: '下單匣',
  watchlist: '自選',
  account: '帳務',
}
const pageTitle = computed(() => pageTitles[activePage.value] ?? '')

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
