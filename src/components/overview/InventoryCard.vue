<!--
  InventoryCard — 帳戶總覽卡
  ============================
  用途：顯示模擬庫存資訊（總市值、損益、報酬率、持股檔數）。
  使用位置：OverviewView。
  資料：inventory（來自 data/stocks.js）。
-->
<template>
  <div class="card">
    <div class="head">
      <span class="title">台股庫存總市值(TWD)</span>
      <span class="eye">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/>
          <circle cx="12" cy="12" r="3"/>
          <line x1="3" y1="3" x2="21" y2="21"/>
        </svg>
      </span>
      <span class="tag">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
          <circle cx="7" cy="7" r="2.4"/><line x1="3" y1="7" x2="4.5" y2="7"/><line x1="9.5" y1="7" x2="21" y2="7"/>
          <circle cx="17" cy="17" r="2.4"/><line x1="3" y1="17" x2="14.5" y2="17"/><line x1="19.5" y1="17" x2="21" y2="17"/>
        </svg>
        {{ inventory.taxLabel }}
      </span>
      <span class="spacer"></span>
      <span class="expand">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 4h6v6"/><path d="M20 4l-7 7"/>
          <path d="M10 20H4v-6"/><path d="M4 20l7-7"/>
        </svg>
      </span>
    </div>

    <div class="value">
      <span class="big">{{ inventory.totalValue }}</span>
      <span class="sub">({{ inventory.pnl }})</span>
    </div>

    <div class="cells">
      <template v-for="(cell, i) in inventory.cells" :key="i">
        <div v-if="cell.kind === 'combined'" class="cell combined">
          <div v-for="(item, j) in cell.items" :key="j" class="sub-cell">
            <div class="lbl">{{ item.label }}</div>
            <div class="val"><span class="dim-star">{{ item.value }}</span><span class="unit"> {{ item.unit }}</span></div>
          </div>
        </div>
        <div v-else class="cell">
          <div class="lbl">{{ cell.label }}</div>
          <div class="val"><span class="dim-star">{{ cell.value }}</span></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { inventory } from '../../data/stocks.js'
</script>

<style scoped>
.card {
  padding: 16px 16px 18px;
  background: var(--bg);
}
.head {
  display: flex; align-items: center; gap: 8px;
  color: var(--text);
}
.title {
  font-size: calc(15px * var(--font-scale)); font-weight: 600; color: #fff;
}
.eye {
  color: var(--text-dim); display: inline-flex; cursor: pointer;
}
.tag {
  display: inline-flex; align-items: center; gap: 4px;
  background: rgba(70, 140, 220, 0.18);
  color: #6ab3ff;
  font-size: calc(12px * var(--font-scale));
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 500;
}
.spacer { flex: 1; }
.expand { color: var(--text-dim); cursor: pointer; display: inline-flex; }

.value {
  display: flex; align-items: baseline; gap: 8px;
  margin: 14px 0 16px;
}
.big {
  font-size: calc(32px * var(--font-scale)); font-weight: 700;
  letter-spacing: 4px;
  color: #fff;
  font-family: "Barlow", monospace;
}
.sub {
  font-size: calc(18px * var(--font-scale)); color: var(--text);
  letter-spacing: 2px;
}

.cells {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.cell {
  background: var(--bg-3);
  border-radius: 8px;
  padding: 12px 14px;
  min-height: 72px;
  display: flex; align-items: stretch; justify-content: space-between;
  gap: 8px;
}
.cell.combined {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0;
  gap: 0;
}
.sub-cell {
  padding: 12px 12px;
  display: flex; align-items: stretch; justify-content: space-between;
  gap: 6px;
  position: relative;
  min-height: 72px;
}
.sub-cell + .sub-cell::before {
  content: "";
  position: absolute; left: 0; top: 22%; bottom: 22%;
  width: 1px; background: var(--line);
}

.lbl {
  font-size: calc(12px * var(--font-scale));
  color: var(--text-dim);
  line-height: 1.35;
  white-space: pre-line;
  align-self: flex-start;
}
.val {
  font-size: calc(16px * var(--font-scale));
  color: #fff;
  font-weight: 600;
  display: inline-flex; align-items: baseline; gap: 2px;
  align-self: flex-end;
}
.dim-star {
  letter-spacing: 1px;
}
.unit {
  font-size: calc(12px * var(--font-scale)); color: var(--text-dim); font-weight: 400;
}
</style>
