<!--
  IndustrySection — 產業清單
  =============================
  用途：選股頁的「產業清單」區塊，依漲跌、營收等排序顯示各產業表現。
  使用位置：StockPickView。
  資料：industryCategories、industrySortChips、getIndustries()
  事件：select-industry（點某產業時往上傳，由 StockPickView 切換到 IndustryDetailView）
-->
<template>
  <div class="ind-tabs">
    <div
      v-for="cat in industryCategories"
      :key="cat.key"
      class="ind-tab"
      :class="{ active: activeCat === cat.key }"
      @click="activeCat = cat.key"
    >{{ cat.label }}</div>
  </div>

  <div class="ind-chips">
    <div
      v-for="chip in industrySortChips"
      :key="chip"
      class="ind-chip"
      :class="{ on: activeChip === chip }"
      @click="activeChip = chip"
    >
      <svg v-if="chip === '漲幅'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>
      <svg v-else-if="chip === '跌幅'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 7l6 6 4-4 8 8"/><path d="M17 17h4v-4"/></svg>
      <svg v-else-if="chip === '營收'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="12" width="4" height="8"/><rect x="10" y="8" width="4" height="12"/><rect x="17" y="4" width="4" height="16"/></svg>
      <svg v-else-if="chip === '量比'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
      <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>
      {{ chip }}
    </div>
  </div>

  <div class="ind-controls">
    <div class="ind-controls-left">
      <div class="view-toggle">
        <span class="vt" :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">清單</span>
        <span class="vt" :class="{ active: viewMode === 'heatmap' }" @click="viewMode = 'heatmap'">熱力圖</span>
      </div>
      <div class="period-chips">
        <span class="period" :class="{ on: period === 'today' }" @click="period = 'today'">當日</span>
        <span class="period" :class="{ on: period === 'yesterday' }" @click="period = 'yesterday'">昨日</span>
        <span class="period" :class="{ on: period === '5days' }" @click="period = '5days'">近5日</span>
      </div>
    </div>
    <a class="view-all" @click="showAll = !showAll">{{ showAll ? '收起' : '查看全部' }} <span class="chev">{{ showAll ? '‹' : '›' }}</span></a>
  </div>

  <div v-if="viewMode === 'list'" class="ind-list">
    <div v-for="(item, i) in industries" :key="item.name" class="ind-row" @click="emit('selectIndustry', item)">
      <div class="row-content">
        <span class="ind-name">{{ item.name }}</span>
        <span class="pct-badge" :class="parseFloat(item.changePct) >= 0 ? 'up' : 'down'">{{ item.changePct }}%</span>
        <span class="ind-vol">{{ item.volume }}億</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" :class="parseFloat(item.changePct) >= 0 ? 'up' : 'down'" :style="{ width: barWidth(item, i) }"></div>
      </div>
    </div>
  </div>

  <div v-else class="ind-heatmap">
    <div
      v-for="item in industries"
      :key="item.name"
      class="hm-block"
      :style="heatmapStyle(item)"
      @click="emit('selectIndustry', item)"
    >
      <span class="hm-name">{{ item.name }}</span>
      <span class="hm-pct">{{ item.changePct }}%</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { industryCategories, industrySortChips, getIndustries } from '../../data/stocks.js'

const emit = defineEmits(['selectIndustry'])

const activeCat = ref('sub')
const activeChip = ref('漲幅')
const viewMode = ref('list')
const period = ref('today')
const showAll = ref(false)

watch(activeCat, () => { activeChip.value = '漲幅'; showAll.value = false })
watch(activeChip, () => { showAll.value = false })

const industries = computed(() => {
  const all = getIndustries(activeCat.value, activeChip.value, period.value)
  return showAll.value ? all : all.slice(0, 6)
})

const maxAbsPct = computed(() => {
  return Math.max(...industries.value.map(i => Math.abs(parseFloat(i.changePct))), 1)
})

const maxVolume = computed(() => {
  return Math.max(...industries.value.map(i => parseFloat(i.volume)), 1)
})

function barWidth(item, index) {
  const pct = Math.abs(parseFloat(item.changePct))
  const max = Math.abs(parseFloat(industries.value[0]?.changePct || 1))
  return Math.max(10, (pct / max) * 100) + '%'
}

function heatmapStyle(item) {
  const pct = parseFloat(item.changePct)
  const absPct = Math.abs(pct)
  const alpha = 0.15 + (absPct / maxAbsPct.value) * 0.35
  const vol = parseFloat(item.volume)
  const minH = 48 + (vol / maxVolume.value) * 52
  const isUp = pct >= 0
  return {
    background: isUp
      ? `rgba(255,59,48,${alpha})`
      : `rgba(0,194,122,${alpha})`,
    color: isUp ? 'var(--up)' : 'var(--down)',
    minHeight: minH + 'px'
  }
}
</script>

<style scoped>
.ind-tabs {
  display: flex; gap: 0; padding: 12px 16px 0;
}
.ind-tab {
  flex: 1; text-align: center; font-size: calc(14px * var(--font-scale));
  padding: 8px 0; color: var(--text-dim); cursor: pointer;
  border-bottom: 2px solid transparent; transition: all .15s;
}
.ind-tab.active {
  color: var(--up); border-bottom-color: var(--up); font-weight: 700;
}

.ind-chips {
  display: flex; gap: 0; padding: 10px 8px 6px;
}
.ind-chip {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 3px;
  font-size: calc(12px * var(--font-scale)); color: var(--text-dim); cursor: pointer;
  padding: 6px 0; border-radius: 8px; transition: all .15s;
}
.ind-chip.on {
  background: var(--chip-on); color: #1a1408; font-weight: 700;
}

.ind-controls {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 16px 10px;
}
.view-all {
  font-size: calc(12px * var(--font-scale)); color: var(--text-dim); cursor: pointer;
  display: inline-flex; align-items: center; gap: 2px;
}
.view-all .chev { font-size: calc(14px * var(--font-scale)); line-height: 1; }

.ind-controls-left {
  display: flex; align-items: center; gap: 10px;
}
.view-toggle {
  display: inline-flex; background: var(--bg-3); border-radius: 999px; padding: 2px;
}
.vt {
  font-size: calc(11px * var(--font-scale)); padding: 4px 10px; border-radius: 999px;
  cursor: pointer; color: var(--text-dim); transition: all .15s;
}
.vt.active {
  background: #fff; color: #1a1408; font-weight: 700;
}

.period-chips {
  display: inline-flex; gap: 2px;
}
.period {
  font-size: calc(11px * var(--font-scale)); padding: 4px 6px; border-radius: 4px;
  cursor: pointer; color: var(--text-dim); transition: color .15s;
}
.period.on { color: #fff; font-weight: 700; }

.ind-list { padding: 0 16px; }
.ind-row {
  padding: 10px 0 8px; border-bottom: 1px solid var(--line);
  cursor: pointer; transition: background .15s;
}
.ind-row:active { background: var(--bg-2); }
.row-content {
  display: flex; align-items: center; gap: 10px; margin-bottom: 6px;
}
.pct-badge {
  min-width: 64px; text-align: center;
  font-size: calc(13px * var(--font-scale)); font-weight: 700;
  padding: 3px 8px; border-radius: 4px;
}
.pct-badge.up { color: var(--up); background: rgba(255,59,48,0.12); }
.pct-badge.down { color: var(--down); background: rgba(0,194,122,0.18); }
.ind-name { flex: 1; font-size: calc(15px * var(--font-scale)); font-weight: 600; }
.ind-vol { color: var(--text-dim); font-size: calc(13px * var(--font-scale)); white-space: nowrap; }

.bar-track {
  height: 4px; background: var(--bg-3); border-radius: 2px; overflow: hidden;
}
.bar-fill {
  height: 100%; border-radius: 2px; transition: width .3s ease;
}
.bar-fill.up { background: var(--up); }
.bar-fill.down { background: var(--down); }

.ind-heatmap {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
  padding: 8px 16px;
}
.hm-block {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  border-radius: 8px; padding: 10px 6px; cursor: pointer;
  transition: opacity .15s;
}
.hm-block:active { opacity: 0.7; }
.hm-name { font-size: calc(13px * var(--font-scale)); font-weight: 600; }
.hm-pct { font-size: calc(12px * var(--font-scale)); font-weight: 700; margin-top: 2px; }
</style>
