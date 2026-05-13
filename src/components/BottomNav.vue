<template>
  <div class="nav">
    <div
      v-for="item in items"
      :key="item.key"
      class="ni"
      :class="{ on: item.key === active }"
      @click="$emit('update:active', item.key)"
    >
      <!-- 下單匣 center button -->
      <template v-if="item.key === 'order'">
        <div class="center">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 8h13l-3-3"/><path d="M20 16H7l3 3"/>
          </svg>
        </div>
        <div class="center-lbl">{{ item.label }}</div>
      </template>
      <template v-else>
        <div class="ic">
          <!-- 總覽 -->
          <svg v-if="item.key === 'overview'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="6" width="18" height="12" rx="1"/><path d="M3 14h18"/>
          </svg>
          <!-- 選股 -->
          <svg v-else-if="item.key === 'stock-pick'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 17l5-6 4 3 5-7 4 5"/>
          </svg>
          <!-- 自選 -->
          <svg v-else-if="item.key === 'watchlist'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          <!-- 帳務 -->
          <svg v-else-if="item.key === 'account'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <div>{{ item.label }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { bottomNavItems } from '../data/stocks.js'

defineProps({
  active: { type: String, default: 'stock-pick' },
})
defineEmits(['update:active'])

const items = bottomNavItems
</script>

<style scoped>
.nav {
  position: fixed; left: 50%; transform: translateX(-50%);
  bottom: 0; width: 100%; max-width: 420px;
  background: var(--bottom);
  border-top: 1px solid #1a1d22;
  height: 84px; padding: 6px 0 22px;
  display: grid; grid-template-columns: repeat(5, 1fr);
  align-items: center;
}
.ni {
  display: flex; flex-direction: column; align-items: center;
  gap: 4px; color: var(--text-dim); font-size: calc(12px * var(--font-scale)); cursor: pointer;
}
.ni.on { color: var(--up); }
.ic { width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; }
.center {
  width: 54px; height: 54px; border-radius: 50%; background: var(--up);
  display: flex; align-items: center; justify-content: center; color: #fff;
  transform: translateY(-14px);
  box-shadow: 0 6px 18px rgba(255, 59, 48, .35);
}
.center-lbl { margin-top: -8px; color: var(--text-dim); font-size: calc(12px * var(--font-scale)); }
</style>
