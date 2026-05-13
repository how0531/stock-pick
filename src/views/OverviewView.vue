<!--
  OverviewView — 總覽頁
  =======================
  職責：純展示頁，由三個區塊組成：庫存卡 → 快捷功能格 → 關注族群。
  事件：select-stock（往上傳給 App.vue 開啟 StockDetailSheet）。
-->
<template>
  <div class="overview">
    <InventoryCard />
    <div class="band"></div>
    <ShortcutGrid />
    <div class="band"></div>
    <FocusGroupSection @select-stock="$emit('selectStock', $event)" />
  </div>
</template>

<script setup>
import InventoryCard from '../components/overview/InventoryCard.vue'
import ShortcutGrid from '../components/overview/ShortcutGrid.vue'
import FocusGroupSection from '../components/overview/FocusGroupSection.vue'

defineEmits(['selectStock'])
</script>

<style scoped>
.overview {
  background: var(--bg);
}
.band {
  height: 8px;
  background: var(--bg-2);
}
</style>
