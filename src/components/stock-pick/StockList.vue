<!--
  StockList — 股票清單容器
  ==========================
  用途：渲染欄位標頭 +「+自選」勾選模式按鈕 + 多個 StockRow。
  使用位置：StockPickView、IndustryDetailView。
  Props：stocks、selectMode、watchSet
  事件：select、toggle-select-mode、toggle-watch
-->
<template>
  <div class="col-head">
    <div class="col-name">
      商品
      <span class="edit-pill" :class="{ on: selectMode }" @click="$emit('toggleSelectMode')">+自選</span>
    </div>
    <div class="col-r sortable" @click="cycleSort('price')">
      成交價<span class="sort-ind" :class="{ active: sort.key === 'price' }">{{ indicator('price') }}</span>
    </div>
    <div class="col-r sortable" @click="cycleSort('changePct')">
      漲跌幅<span class="sort-ind" :class="{ active: sort.key === 'changePct' }">{{ indicator('changePct') }}</span>
    </div>
    <div class="col-r sortable" @click="cycleSort('volume')">
      成交值<span class="sort-ind" :class="{ active: sort.key === 'volume' }">{{ indicator('volume') }}</span>
    </div>
  </div>
  <StockRow
    v-for="s in displayedStocks"
    :key="s.code"
    :stock="s"
    :select-mode="selectMode"
    :is-watched="watchSet.has(s.code)"
    @click="$emit('select', s)"
    @toggle-watch="$emit('toggleWatch', s)"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import StockRow from './StockRow.vue'

const props = defineProps({
  stocks: { type: Array, required: true },
  selectMode: { type: Boolean, default: false },
  watchSet: { type: Set, default: () => new Set() },
})
defineEmits(['select', 'toggleSelectMode', 'toggleWatch'])

const sort = ref({ key: null, dir: null })

function cycleSort(key) {
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

function parseVal(stock, key) {
  if (key === 'price') return parseFloat(String(stock.price).replace(/,/g, ''))
  if (key === 'changePct') return parseFloat(stock.changePct)
  if (key === 'volume') return parseFloat(stock.volume)
  return 0
}

const displayedStocks = computed(() => {
  if (!sort.value.key || !sort.value.dir) return props.stocks
  const arr = [...props.stocks]
  const k = sort.value.key
  const mult = sort.value.dir === 'desc' ? -1 : 1
  arr.sort((a, b) => {
    const va = parseVal(a, k)
    const vb = parseVal(b, k)
    const na = Number.isNaN(va)
    const nb = Number.isNaN(vb)
    if (na && nb) return 0
    if (na) return 1
    if (nb) return -1
    return (va - vb) * mult
  })
  return arr
})
</script>

<style scoped>
.col-head {
  padding: 8px 16px 6px;
  display: grid; grid-template-columns: 1.3fr 1fr 1.1fr 1fr;
  align-items: center; color: var(--text-dim); font-size: calc(12px * var(--font-scale));
  background: var(--bg-3);
  border-bottom: 1px solid var(--line);
}
.col-name {
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
.sortable {
  cursor: pointer;
  user-select: none;
  transition: color .15s;
}
.sortable:hover { color: var(--text); }
.sort-ind {
  display: inline-block;
  margin-left: 4px;
  opacity: 0.4;
  font-size: calc(11px * var(--font-scale));
}
.sort-ind.active {
  opacity: 1;
}
</style>
