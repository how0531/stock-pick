<!--
  MarketDistribution — 個股漲跌分佈
  ===================================
  用途：選股頁的「個股漲跌分佈」區塊，用條狀圖呈現各漲跌幅級距的家數。
  使用位置：StockPickView 內的 SectionCard。
  資料：marketDistribution（來自 data/stocks.js）。
-->
<template>
  <div class="md-tabs">
    <div
      v-for="tab in tabs"
      :key="tab.key"
      class="md-tab"
      :class="{ active: activeTab === tab.key }"
      @click="activeTab = tab.key"
    >{{ tab.label }}</div>
  </div>

  <div class="md-summary-wrap">
    <div class="md-summary">
      <div class="md-stat">
        <div class="md-stat-num up">{{ data.limitUp }}</div>
        <div class="md-stat-label">漲停</div>
      </div>
      <div class="md-stat">
        <div class="md-stat-num up">{{ data.monthHigh }}</div>
        <div class="md-stat-label">創月新高</div>
      </div>
      <div class="md-stat">
        <div class="md-stat-num down">{{ data.monthLow }}</div>
        <div class="md-stat-label">創月新低</div>
      </div>
      <div class="md-stat">
        <div class="md-stat-num down">{{ data.limitDown }}</div>
        <div class="md-stat-label">跌停</div>
      </div>
    </div>
  </div>

  <div class="md-chart">
    <div class="md-bars">
      <div v-for="b in data.buckets" :key="b.label" class="md-col">
        <div class="md-count">{{ b.count }}</div>
        <div class="md-bar" :class="b.type" :style="{ height: barHeight(b.count) + '%' }"></div>
      </div>
    </div>
    <div class="md-labels">
      <div v-for="b in data.buckets" :key="b.label" class="md-label">{{ b.label }}</div>
    </div>
  </div>

  <div class="md-progress">
    <div class="md-seg up" :style="{ width: ratio(data.totalUp) + '%' }"></div>
    <div class="md-seg flat" :style="{ width: ratio(data.totalFlat) + '%' }"></div>
    <div class="md-seg down" :style="{ width: ratio(data.totalDown) + '%' }"></div>
  </div>
  <div class="md-totals">
    <div class="md-total">
      <span class="md-total-label">上漲</span>
      <span class="md-total-num up">{{ data.totalUp }}</span>
    </div>
    <div class="md-total">
      <span class="md-total-label">下跌</span>
      <span class="md-total-num down">{{ data.totalDown }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marketDistribution } from '../../data/stocks.js'

const tabs = [
  { key: 'listed', label: '上市' },
  { key: 'otc',    label: '上櫃' },
  { key: 'top100', label: '百大權值股' },
]

const activeTab = ref('listed')

const data = computed(() => marketDistribution[activeTab.value])
const maxCount = computed(() => Math.max(...data.value.buckets.map(b => b.count)))
function barHeight(count) {
  return (count / maxCount.value) * 85
}
const total = computed(() => data.value.totalUp + data.value.totalFlat + data.value.totalDown)
function ratio(n) { return (n / total.value) * 100 }
</script>

<style scoped>
.md-tabs {
  display: flex; padding: 12px 16px 8px;
}
.md-tab {
  flex: 1; text-align: center; font-size: calc(14px * var(--font-scale));
  padding: 6px 0; color: var(--text-dim); cursor: pointer;
  border-bottom: 2px solid transparent; transition: all .15s;
}
.md-tab.active {
  color: #fff; border-bottom-color: var(--accent); font-weight: 700;
}

.md-summary-wrap {
  padding: 0 12px;
}
.md-summary {
  background: var(--bg-3); border-radius: 8px;
  padding: 16px 0;
  display: grid; grid-template-columns: repeat(4, 1fr);
}
.md-stat {
  display: flex; flex-direction: column; align-items: center;
}
.md-stat-num {
  font-size: calc(24px * var(--font-scale)); font-weight: 700; line-height: 1;
}
.md-stat-num.up { color: var(--up); }
.md-stat-num.down { color: var(--down); }
.md-stat-label {
  font-size: calc(13px * var(--font-scale)); color: var(--text-dim); margin-top: 6px;
}

.md-chart {
  padding: 16px 12px 0;
}
.md-bars {
  height: 140px;
  display: grid; grid-template-columns: repeat(11, 1fr);
  align-items: flex-end;
}
.md-col {
  height: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-end;
}
.md-count {
  font-size: calc(11px * var(--font-scale)); color: var(--text-dim); margin-bottom: 2px;
  line-height: 1;
}
.md-bar {
  width: 65%;
  border-radius: 2px 2px 0 0;
  min-height: 2px;
}
.md-bar.up { background: var(--up); }
.md-bar.flat { background: var(--text-mute); }
.md-bar.down { background: var(--down); }

.md-labels {
  display: grid; grid-template-columns: repeat(11, 1fr);
  border-top: 1px solid var(--line);
  padding-top: 6px;
}
.md-label {
  font-size: calc(10px * var(--font-scale)); color: var(--text-dim); text-align: center;
}

.md-progress {
  height: 4px; border-radius: 2px; overflow: hidden;
  margin: 12px 16px 4px;
  display: flex; background: var(--bg-3);
}
.md-seg { height: 100%; }
.md-seg.up { background: var(--up); }
.md-seg.flat { background: var(--text-mute); }
.md-seg.down { background: var(--down); }

.md-totals {
  display: flex; justify-content: space-between;
  padding: 4px 16px 8px; font-size: calc(13px * var(--font-scale));
}
.md-total-label { color: var(--text-dim); margin-right: 6px; }
.md-total-num { font-weight: 700; }
.md-total-num.up { color: var(--up); }
.md-total-num.down { color: var(--down); }
</style>
