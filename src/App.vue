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
      class="font-fab"
      :class="{ on: showFontPopover }"
      @click="showFontPopover = !showFontPopover"
      aria-label="調整字級"
      type="button"
    >
      <span class="a-sm">A</span><span class="a-lg">A</span>
    </button>
    <FontSizePopover :open="showFontPopover" @close="showFontPopover = false" />
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
import FontSizePopover from './components/FontSizePopover.vue'
import StockPickView from './views/StockPickView.vue'
import OverviewView from './views/OverviewView.vue'
import PlaceholderView from './views/PlaceholderView.vue'

const activePage = ref('stock-pick')
const selectedStock = ref(null)
const showFontPopover = ref(false)

const pageTitles = {
  order: '下單匣',
  watchlist: '自選',
  account: '帳務',
}
const pageTitle = computed(() => pageTitles[activePage.value] ?? '')
</script>

<style scoped>
.phone {
  width: 100%; max-width: 420px;
  background: var(--bg);
  min-height: 100vh; position: relative;
  padding-bottom: 96px;
  overflow-x: hidden;
}
.font-fab {
  position: absolute;
  top: 62px;
  right: 14px;
  z-index: 40;
  width: 44px;
  height: 28px;
  border: 1px solid var(--line);
  background: var(--chip);
  color: var(--text);
  border-radius: 999px;
  display: flex; align-items: center; justify-content: center;
  gap: 2px;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  line-height: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.font-fab.on {
  background: var(--accent);
  color: #1a1408;
  border-color: var(--accent);
}
.font-fab .a-sm { font-size: 11px; font-weight: 700; }
.font-fab .a-lg { font-size: 16px; font-weight: 800; }
</style>
