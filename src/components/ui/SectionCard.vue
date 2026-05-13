<!--
  SectionCard — 通用區塊卡片
  ============================
  用途：「選股」頁面內每個大區塊（大盤資訊 / 選股清單 / 產業清單 / 漲跌分佈）的外殼，
        提供統一的標題列與摺疊容器。
  Props：title、info（顯示 i icon）、chevron（右側箭頭）
  Slots：default（內容）、header-right（標題右側自訂內容，例如編輯模式的 ↑↓ 按鈕）
-->
<template>
  <div class="section">
    <div class="section-head">
      <button
        v-if="collapsible"
        class="collapse-btn"
        @click="collapsed = !collapsed"
      >{{ collapsed ? '+' : '−' }}</button>
      <span class="title">{{ title }}</span>
      <span v-if="info" class="info">ⓘ</span>
      <span class="spacer"></span>
      <slot name="header-right" />
      <span v-if="chevron" class="chevron">›</span>
    </div>
    <div v-show="!collapsed" class="section-body"><slot /></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: { type: String, required: true },
  info: { type: Boolean, default: false },
  chevron: { type: Boolean, default: false },
  collapsible: { type: Boolean, default: true },
})

const collapsed = ref(false)
</script>

<style scoped>
.section {
  border-top: 8px solid var(--bg-2);
}
.section-head {
  display: flex; align-items: center;
  padding: 14px 16px;
  gap: 8px;
}
.collapse-btn {
  width: 18px; height: 18px;
  border: 1.5px solid var(--text-dim);
  border-radius: 3px;
  background: transparent;
  color: var(--text-dim);
  font-size: calc(14px * var(--font-scale)); line-height: 1;
  cursor: pointer;
  padding: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: "Barlow", "Microsoft JhengHei", sans-serif;
}
.title {
  font-size: calc(16px * var(--font-scale)); font-weight: 700; color: var(--text);
}
.info {
  color: var(--text-dim);
  font-size: calc(13px * var(--font-scale));
  margin-left: 4px;
}
.spacer { flex: 1; }
.chevron {
  color: var(--text-dim);
  font-size: calc(22px * var(--font-scale)); line-height: 1;
}
</style>
