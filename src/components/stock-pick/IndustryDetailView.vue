<!--
  IndustryDetailView — 產業詳細頁
  =================================
  用途：點某產業後切換到此頁，顯示該產業內的所有個股清單（含篩選、加入自選功能）。
  使用位置：StockPickView（v-if="selectedIndustry"）。
  Props：industry
  事件：back（回到產業列表）、select-stock（開啟 StockDetailSheet）
-->
<template>
  <div class="detail">
    <div class="detail-header">
      <svg class="back-icon" @click="$emit('back')" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
      <span class="detail-title">{{ industry.name }}</span>
      <span class="header-spacer"></span>
      <svg class="funnel" @click="filterVisible = true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    </div>

    <div class="summary">
      <div class="summary-left">
        <div class="idx-val" :class="isUp ? 'up' : 'down'">{{ indexValue }}</div>
        <div class="idx-change" :class="isUp ? 'up' : 'down'">
          {{ isUp ? '▲' : '▼' }} {{ changeAmount }} ({{ industry.changePct }}%)
        </div>
      </div>
      <div class="summary-right">
        <div class="meta">{{ today }}</div>
        <div class="meta">成交金額 {{ industry.volume }}億元</div>
      </div>
    </div>

    <div class="col-head">
      <div class="col-stock">
        股票
        <span class="edit-pill" :class="{ on: selectMode }" @click="selectMode = !selectMode">+自選</span>
      </div>
      <div class="col-r sortable" :class="{ active: sort.key === 'price' }" @click="toggleSort('price')">股價 <span class="sort-ind" :class="{ dim: sort.key !== 'price' }">{{ indicator('price') }}</span></div>
      <div class="col-r sortable" :class="{ active: sort.key === 'changePct' }" @click="toggleSort('changePct')">漲跌幅 <span class="sort-ind" :class="{ dim: sort.key !== 'changePct' }">{{ indicator('changePct') }}</span></div>
      <div class="col-r sortable" :class="{ active: sort.key === 'volume' }" @click="toggleSort('volume')">成交值 <span class="sort-ind" :class="{ dim: sort.key !== 'volume' }">{{ indicator('volume') }}</span></div>
    </div>

    <div
      v-for="stock in displayedStocks"
      :key="stock.code"
      class="stock-row"
      @click="onRowClick(stock)"
    >
      <div class="stock-info">
        <div class="stock-name">
          <span
            v-if="selectMode"
            class="add-mark"
            :class="{ added: watchSet.has(stock.code) }"
            @click.stop="toggleWatch(stock)"
          >{{ watchSet.has(stock.code) ? '✓' : '+' }}</span>{{ stock.name }}
        </div>
        <div class="stock-code">{{ stock.code }}</div>
      </div>
      <div class="stock-price-cell">
        <span class="stock-price" :class="[stock.up ? 'up' : 'down', { limit: stock.limit }]">{{ stock.price }}</span>
      </div>
      <div class="stock-change" :class="stock.up ? 'up' : 'down'">
        <div>{{ stock.up ? '▲' : '▼' }}{{ computeChange(stock) }}</div>
        <div class="pct">{{ stock.changePct }}%</div>
      </div>
      <div class="stock-vol">{{ stock.volume }}億</div>
    </div>

    <Transition name="fab">
      <button
        v-if="selectMode && watchSet.size > 0"
        class="fab"
        @click="wlSheetVisible = true"
      >加入自選 ({{ watchSet.size }})</button>
    </Transition>

    <FilterSheet :visible="filterVisible" @close="filterVisible = false" @apply="applyFilter" />
    <WatchlistSheet
      :visible="wlSheetVisible"
      :stock-count="watchSet.size"
      @cancel="wlSheetVisible = false"
      @confirm="onWatchlistConfirm"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { getIndustryStocks } from '../../data/stocks.js'
import FilterSheet from '../sheets/FilterSheet.vue'
import WatchlistSheet from '../sheets/WatchlistSheet.vue'
import { showToast } from '../../composables/useToast.js'

const props = defineProps({
  industry: { type: Object, required: true },
})
const emit = defineEmits(['back', 'selectStock'])

const isUp = computed(() => parseFloat(props.industry.changePct) >= 0)
const rawStocks = computed(() => getIndustryStocks(props.industry.name))

const sort = ref({ key: null, dir: null })
const selectMode = ref(false)
const watchSet = ref(new Set())
const filterVisible = ref(false)
const wlSheetVisible = ref(false)
const activeFilter = ref(null)

watch(() => props.industry.name, () => {
  sort.value = { key: null, dir: null }
  selectMode.value = false
  watchSet.value = new Set()
  activeFilter.value = null
})

function toggleSort(key) {
  if (sort.value.key !== key) {
    sort.value = { key, dir: 'desc' }
  } else if (sort.value.dir === 'desc') {
    sort.value = { key, dir: 'asc' }
  } else {
    sort.value = { key: null, dir: null }
  }
}

function indicator(key) {
  if (sort.value.key !== key) return '⇅'
  return sort.value.dir === 'desc' ? '↓' : '↑'
}

function getSortValue(stock, key) {
  if (key === 'price') return parseFloat(stock.price.replace(/,/g, ''))
  if (key === 'changePct') return parseFloat(stock.changePct)
  if (key === 'volume') return parseFloat(stock.volume)
  return 0
}

const sortedStocks = computed(() => {
  if (!sort.value.key || !sort.value.dir) return rawStocks.value
  const arr = [...rawStocks.value]
  const { key, dir } = sort.value
  const mul = dir === 'asc' ? 1 : -1
  arr.sort((a, b) => (getSortValue(a, key) - getSortValue(b, key)) * mul)
  return arr
})

const displayedStocks = computed(() => {
  const f = activeFilter.value
  if (!f) return sortedStocks.value
  return sortedStocks.value.filter(s => {
    const price = parseFloat(s.price.replace(/,/g, ''))
    const vol = parseFloat(s.volume)
    const pct = parseFloat(s.changePct)
    if (f.priceMin != null && price < f.priceMin) return false
    if (f.priceMax != null && price > f.priceMax) return false
    if (f.volMin != null && vol < f.volMin) return false
    if (f.volMax != null && vol > f.volMax) return false
    if (f.pctMin != null && pct < f.pctMin) return false
    if (f.pctMax != null && pct > f.pctMax) return false
    return true
  })
})

function onRowClick(stock) {
  if (selectMode.value) {
    toggleWatch(stock)
  } else {
    emit('selectStock', stock)
  }
}

function toggleWatch(stock) {
  const next = new Set(watchSet.value)
  if (next.has(stock.code)) {
    next.delete(stock.code)
  } else {
    next.add(stock.code)
  }
  watchSet.value = next
}

function applyFilter(filter) {
  activeFilter.value = filter
  filterVisible.value = false
  const count = displayedStocks.value.length
  showToast(`已套用篩選，找到 ${count} 檔`)
}

function onWatchlistConfirm(payload) {
  const n = watchSet.value.size
  const newCount = Array.isArray(payload) ? 0 : (payload?.newNames?.length ?? 0)
  wlSheetVisible.value = false
  selectMode.value = false
  watchSet.value = new Set()
  showToast(
    newCount > 0
      ? `已加入自選 (${n} 檔，新增 ${newCount} 個清單)`
      : `已加入自選 (${n} 檔)`
  )
}

const indexValue = computed(() => {
  const vol = parseFloat(props.industry.volume)
  const pct = Math.abs(parseFloat(props.industry.changePct))
  return (vol * 80 + 15000 + pct * 500).toFixed(2)
})

const changeAmount = computed(() => {
  const pct = parseFloat(props.industry.changePct)
  const idx = parseFloat(indexValue.value)
  return Math.abs(idx * pct / (100 + pct)).toFixed(2)
})

const today = computed(() => {
  const d = new Date()
  const days = ['日', '一', '二', '三', '四', '五', '六']
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${mm}/${dd}(${days[d.getDay()]})${hh}:${mi}`
})

function computeChange(stock) {
  const price = parseFloat(stock.price.replace(/,/g, ''))
  const pct = parseFloat(stock.changePct)
  const change = Math.abs(price - price / (1 + pct / 100))
  return change >= 100 ? change.toFixed(0) : change.toFixed(2)
}
</script>

<style scoped>
.detail-header {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
}
.back-icon { cursor: pointer; color: #fff; flex-shrink: 0; }
.detail-title { font-size: calc(17px * var(--font-scale)); font-weight: 700; }
.header-spacer { flex: 1; }
.funnel { cursor: pointer; color: var(--text-dim); flex-shrink: 0; }
.funnel:active { color: #fff; }

.summary {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 16px; border-bottom: 1px solid var(--line);
}
.idx-val { font-size: calc(28px * var(--font-scale)); font-weight: 700; letter-spacing: .3px; }
.idx-change { font-size: calc(14px * var(--font-scale)); margin-top: 4px; }
.up { color: var(--up); }
.down { color: var(--down); }
.summary-right { text-align: right; }
.meta { font-size: calc(12px * var(--font-scale)); color: var(--text-dim); line-height: 1.8; }

.col-head {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr 1fr;
  gap: 0 8px;
  padding: 10px 16px 8px;
  font-size: calc(12px * var(--font-scale)); color: var(--text-dim);
  border-bottom: 1px solid var(--line);
  background: var(--bg-3);
}
.col-stock {
  display: flex; align-items: center; gap: 8px;
}
.edit-pill {
  font-size: calc(11px * var(--font-scale)); line-height: 1;
  padding: 4px 9px; border-radius: 999px;
  border: 1px solid var(--text-dim);
  color: var(--text-dim);
  cursor: pointer; transition: all .15s;
  white-space: nowrap;
}
.edit-pill.on {
  background: var(--accent); border-color: var(--accent); color: #1a1408;
}
.col-r { text-align: right; }
.sortable { cursor: pointer; user-select: none; }
.sortable.active { color: #fff; }
.sort-ind { margin-left: 2px; }
.sort-ind.dim { opacity: 0.5; }

.stock-row {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr 1fr;
  align-items: center; gap: 0 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
  cursor: pointer; transition: background .15s;
}
.stock-row:active { background: var(--bg-2); }

.stock-name { font-size: calc(16px * var(--font-scale)); font-weight: 700; }
.stock-code { font-size: calc(11px * var(--font-scale)); color: var(--text-dim); margin-top: 2px; }
.add-mark {
  color: var(--accent); font-weight: 700; margin-right: 4px; cursor: pointer;
}
.add-mark.added { color: var(--up); }

.stock-price-cell { text-align: right; }
.stock-price { font-size: calc(16px * var(--font-scale)); font-weight: 700; letter-spacing: .3px; }
.stock-price.limit {
  color: #fff; padding: 2px 8px; border-radius: 4px;
}
.stock-price.limit.up { background: var(--up); }
.stock-price.limit.down { background: var(--down); }

.stock-change { text-align: right; font-size: calc(13px * var(--font-scale)); font-weight: 600; }
.pct { font-size: calc(12px * var(--font-scale)); margin-top: 1px; }

.stock-vol { text-align: right; font-size: calc(13px * var(--font-scale)); color: #fff; }

.fab {
  position: fixed; bottom: 110px; left: 50%;
  transform: translateX(-50%);
  background: var(--accent); color: #1a1408;
  border: none; border-radius: 24px;
  padding: 12px 28px; font-size: calc(16px * var(--font-scale)); font-weight: 700;
  cursor: pointer; z-index: 50;
  box-shadow: 0 4px 16px rgba(0,0,0,.4);
  font-family: "Barlow", "Microsoft JhengHei", sans-serif;
}
.fab-enter-active, .fab-leave-active { transition: all .2s ease; }
.fab-enter-from, .fab-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }
</style>
