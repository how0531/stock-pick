<template>
  <div class="quick">
    <div v-for="item in actions" :key="item.label" class="qitem" @click="$emit('navigate', item.page)">
      <div class="ic">
        <svg v-if="item.icon === 'smart'" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="20" width="5" height="14" rx="1"/>
          <rect x="14.5" y="14" width="5" height="20" rx="1"/>
          <rect x="23" y="8" width="5" height="26" rx="1"/>
          <path d="M30 6l1.2 2.6L34 10l-2.8 1.4L30 14l-1.2-2.6L26 10l2.8-1.4z" fill="#fff"/>
        </svg>
        <svg v-else-if="item.icon === 'analysis'" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 26h20"/><path d="M14 26v-7"/><path d="M20 26v-12"/>
          <path d="M26 26v-9"/><path d="M16 10h8"/><path d="M20 10v4"/><path d="M8 30h24"/>
        </svg>
        <svg v-else-if="item.icon === 'sector'" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6l3.4 7 7.6 1.1-5.5 5.3 1.3 7.6L20 23.4 13.2 27l1.3-7.6L9 14.1 16.6 13z"/>
          <path d="M14 32h12"/>
        </svg>
        <svg v-else-if="item.icon === 'news'" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="22" height="22" rx="2"/>
          <text x="20" y="20" text-anchor="middle" font-size="6" fill="#fff" stroke="none" font-weight="700">NEWS</text>
          <path d="M13 25h14"/><path d="M13 28h10"/>
        </svg>
      </div>
      <div class="lbl">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup>
import { quickActions } from '../data/stocks.js'
defineEmits(['navigate'])
const actions = quickActions
</script>

<style scoped>
.quick {
  padding: 8px 8px 20px;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;
}
.qitem {
  display: flex; flex-direction: column; align-items: center;
  gap: 10px; padding: 14px 4px; color: #fff; cursor: pointer;
  border-radius: 8px; transition: background .15s;
}
.qitem:active { background: var(--bg-2); }
.ic { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
.lbl { font-size: 14.5px; }
</style>
