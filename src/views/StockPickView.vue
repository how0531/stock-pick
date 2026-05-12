<template>
  <IndustryDetailView
    v-if="selectedIndustry"
    :industry="selectedIndustry"
    @back="selectedIndustry = null"
    @select-stock="$emit('selectStock', $event)"
  ></IndustryDetailView>
  <div v-else>
    <div class="page-head">
      <span
        class="edit-toggle"
        :class="{ on: editMode }"
        @click="toggleEditMode"
      >{{ editMode ? '完成' : '編輯排序' }}</span>
    </div>

    <template v-for="(key, idx) in sectionOrder" :key="key">
      <SectionCard
        v-if="key === 'market'"
        title="大盤資訊"
      >
        <template v-if="editMode" #header-right>
          <div class="order-ctrl">
            <button class="ord-btn" :disabled="idx === 0" @click="moveUp(idx)">↑</button>
            <button class="ord-btn" :disabled="idx === sectionOrder.length - 1" @click="moveDown(idx)">↓</button>
          </div>
        </template>
        <MarketIndexSection />
      </SectionCard>

      <SectionCard
        v-if="key === 'stockpick'"
        title="選股清單"
      >
        <template v-if="editMode" #header-right>
          <div class="order-ctrl">
            <button class="ord-btn" :disabled="idx === 0" @click="moveUp(idx)">↑</button>
            <button class="ord-btn" :disabled="idx === sectionOrder.length - 1" @click="moveDown(idx)">↓</button>
          </div>
        </template>
        <template v-else #header-right>
          <div class="mode-toggle">
            <span class="mt" :class="{ active: mode === 'short' }" @click="mode = 'short'">短線</span>
            <span class="mt" :class="{ active: mode === 'swing' }" @click="mode = 'swing'">波段</span>
          </div>
        </template>
        <CategoryTabs :categories="activeCategories" v-model:active="activeCat" @open-filter="filterVisible = true" />
        <ChipFilter :chips="currentChips" v-model:active="activeChip" />
        <StockList
          :stocks="displayedStocks"
          :select-mode="selectMode"
          :watch-set="watchSet"
          @select="$emit('selectStock', $event)"
          @toggle-select-mode="selectMode = !selectMode"
          @toggle-watch="toggleWatch"
        />
      </SectionCard>

      <SectionCard
        v-if="key === 'industry'"
        title="產業清單"
      >
        <template v-if="editMode" #header-right>
          <div class="order-ctrl">
            <button class="ord-btn" :disabled="idx === 0" @click="moveUp(idx)">↑</button>
            <button class="ord-btn" :disabled="idx === sectionOrder.length - 1" @click="moveDown(idx)">↓</button>
          </div>
        </template>
        <IndustrySection @select-industry="selectedIndustry = $event" />
      </SectionCard>

      <SectionCard
        v-if="key === 'distribution'"
        title="個股漲跌分佈"
        :info="!editMode"
        :chevron="!editMode"
      >
        <template v-if="editMode" #header-right>
          <div class="order-ctrl">
            <button class="ord-btn" :disabled="idx === 0" @click="moveUp(idx)">↑</button>
            <button class="ord-btn" :disabled="idx === sectionOrder.length - 1" @click="moveDown(idx)">↓</button>
          </div>
        </template>
        <MarketDistribution />
      </SectionCard>
    </template>

    <Transition name="fab">
      <button
        v-if="selectMode && watchSet.size > 0 && !editMode"
        class="fab"
        @click="wlSheetVisible = true"
      >加入自選 ({{ watchSet.size }})</button>
    </Transition>
  </div>
  <FilterSheet :visible="filterVisible" @close="filterVisible = false" @apply="applyFilter" />
  <WatchlistSheet
    :visible="wlSheetVisible"
    :stock-count="watchSet.size"
    @cancel="wlSheetVisible = false"
    @confirm="onWatchlistConfirm"
  />
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { shortCategories, swingCategories, getStocks } from '../data/stocks.js'
import CategoryTabs from '../components/CategoryTabs.vue'
import ChipFilter from '../components/ChipFilter.vue'
import StockList from '../components/StockList.vue'
import FilterSheet from '../components/FilterSheet.vue'
import WatchlistSheet from '../components/WatchlistSheet.vue'
import IndustrySection from '../components/IndustrySection.vue'
import IndustryDetailView from '../components/IndustryDetailView.vue'
import SectionCard from '../components/SectionCard.vue'
import MarketDistribution from '../components/MarketDistribution.vue'
import MarketIndexSection from '../components/MarketIndexSection.vue'
import { showToast } from '../composables/useToast.js'

defineEmits(['selectStock'])

const STORAGE_KEY = 'section_order_v1'
const DEFAULT_ORDER = ['market', 'stockpick', 'industry', 'distribution']

const selectedIndustry = ref(null)
const mode = ref('short')
const activeCat = ref('hot')
const activeChip = ref('短多精選')
const selectMode = ref(false)
const filterVisible = ref(false)
const wlSheetVisible = ref(false)
const watchSet = ref(new Set())
const activeFilter = ref(null)
const editMode = ref(false)
const sectionOrder = ref([...DEFAULT_ORDER])

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (Array.isArray(saved) && saved.length === DEFAULT_ORDER.length) {
      sectionOrder.value = saved
    }
  } catch {}
})

function toggleEditMode() {
  editMode.value = !editMode.value
  if (!editMode.value) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sectionOrder.value))
    showToast('已儲存排序')
  }
}

function moveUp(idx) {
  if (idx === 0) return
  const arr = [...sectionOrder.value]
  ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
  sectionOrder.value = arr
}

function moveDown(idx) {
  if (idx === sectionOrder.value.length - 1) return
  const arr = [...sectionOrder.value]
  ;[arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]]
  sectionOrder.value = arr
}

const activeCategories = computed(() => mode.value === 'short' ? shortCategories : swingCategories)

const currentChips = computed(() => {
  const cat = activeCategories.value.find(c => c.key === activeCat.value)
  return cat?.chips ?? []
})

watch(mode, () => {
  activeCat.value = activeCategories.value[0]?.key ?? ''
  activeChip.value = activeCategories.value[0]?.chips?.[0] ?? ''
})

watch(activeCat, () => {
  const chips = currentChips.value
  activeChip.value = chips[0] ?? ''
  selectMode.value = false
})

const displayedStocks = computed(() => {
  let list = getStocks(activeCat.value, activeChip.value)
  const f = activeFilter.value
  if (!f) return list
  return list.filter(s => {
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

function applyFilter(filter) {
  activeFilter.value = filter
  const count = displayedStocks.value.length
  showToast(`已套用篩選，找到 ${count} 檔`)
}

function onWatchlistConfirm() {
  const n = watchSet.value.size
  wlSheetVisible.value = false
  selectMode.value = false
  watchSet.value = new Set()
  showToast(`已加入自選 (${n} 檔)`)
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
</script>

<style scoped>
.page-head {
  display: flex; justify-content: flex-end;
  padding: 8px 16px 0;
}
.edit-toggle {
  font-size: 13px; color: var(--text-dim);
  padding: 4px 10px; border-radius: 999px;
  border: 1px solid var(--line);
  cursor: pointer; transition: all .15s;
}
.edit-toggle.on {
  background: var(--accent); color: #1a1408;
  border-color: var(--accent); font-weight: 700;
}

.order-ctrl {
  display: inline-flex; gap: 6px;
}
.ord-btn {
  width: 32px; height: 28px;
  background: var(--bg-3); color: var(--text);
  border: 1px solid var(--line); border-radius: 6px;
  font-size: 14px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-family: "Barlow", "Microsoft JhengHei", sans-serif;
}
.ord-btn:disabled {
  color: var(--text-mute); cursor: not-allowed; opacity: 0.5;
}
.ord-btn:not(:disabled):active {
  background: var(--accent); color: #1a1408;
}

.fab {
  position: fixed; bottom: 110px; left: 50%;
  transform: translateX(-50%);
  background: var(--accent); color: #1a1408;
  border: none; border-radius: 24px;
  padding: 12px 28px; font-size: 16px; font-weight: 700;
  cursor: pointer; z-index: 50;
  box-shadow: 0 4px 16px rgba(0,0,0,.4);
  font-family: "Barlow", "Microsoft JhengHei", sans-serif;
}
.fab-enter-active, .fab-leave-active { transition: all .2s ease; }
.fab-enter-from, .fab-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }

.mode-toggle {
  display: inline-flex; background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 999px; padding: 3px;
}
.mt {
  font-size: 14px; padding: 6px 18px; border-radius: 999px;
  cursor: pointer; color: var(--text); font-weight: 600;
  transition: all .15s; letter-spacing: 0.5px;
}
.mt.active {
  background: var(--accent); color: #1a1408; font-weight: 800;
  box-shadow: 0 0 0 2px rgba(214,162,91,0.25), 0 2px 6px rgba(0,0,0,0.3);
}
</style>
