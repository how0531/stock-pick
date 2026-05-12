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
import StockPickView from './views/StockPickView.vue'
import OverviewView from './views/OverviewView.vue'
import PlaceholderView from './views/PlaceholderView.vue'

const activePage = ref('stock-pick')
const selectedStock = ref(null)

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
</style>
