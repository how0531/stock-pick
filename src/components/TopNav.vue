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
    <div class="actions">
      <div
        class="font-btn"
        :class="{ on: showFontPopover }"
        @click="showFontPopover = !showFontPopover"
        aria-label="調整字級"
      >A</div>
      <svg class="search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" @click="$emit('openSearch')">
        <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
      </svg>
    </div>
  </div>
  <FontSizePopover :open="showFontPopover" @close="showFontPopover = false" />
</template>

<script setup>
import { ref } from 'vue'
import { topTabs } from '../data/stocks.js'
import FontSizePopover from './FontSizePopover.vue'

defineProps({ activeTab: { type: String, default: '台股' } })
defineEmits(['update:activeTab', 'openSearch'])

const tabs = topTabs
const showFontPopover = ref(false)
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
.actions { display: flex; align-items: center; gap: 14px; }
.font-btn {
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; opacity: .9;
  font-weight: 700; font-size: 18px;
  cursor: pointer; user-select: none;
  line-height: 1;
}
.font-btn.on { color: var(--accent); opacity: 1; }
.search { width: 24px; height: 24px; color: #fff; opacity: .9; cursor: pointer; }
</style>
