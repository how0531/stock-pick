<template>
  <div class="top">
    <div class="badge">選</div>
    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab"
        class="t"
        :class="{ on: tab === activeTab }"
        @click="$emit('update:activeTab', tab)"
      >{{ tab }}</div>
    </div>
    <svg class="search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" @click="$emit('openSearch')">
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
    </svg>
  </div>
</template>

<script setup>
import { topTabs } from '../data/stocks.js'

defineProps({ activeTab: { type: String, default: '台股' } })
defineEmits(['update:activeTab', 'openSearch'])

const tabs = topTabs
</script>

<style scoped>
.top {
  padding: 6px 18px 14px;
  display: flex; align-items: center; gap: 18px;
}
.badge {
  width: 42px; height: 42px; border-radius: 50%;
  background: #fff; color: #000;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: calc(18px * var(--font-scale)); flex-shrink: 0;
}
.tabs { display: flex; gap: 22px; flex: 1; font-size: calc(18px * var(--font-scale)); color: var(--text-dim); }
.t { padding: 6px 0; position: relative; cursor: pointer; }
.t.on { color: #fff; font-weight: 600; }
.t.on::after {
  content: ""; position: absolute; left: -2px; right: -2px; bottom: -2px;
  height: 3px; background: var(--orange); border-radius: 2px;
}
.search { width: 24px; height: 24px; color: #fff; opacity: .9; cursor: pointer; }
</style>
