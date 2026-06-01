<!--
  StockPickView — 選股頁（主畫面）
  =================================
  職責：
    1. 顯示四個可排序區塊（大盤資訊 / 選股清單 / 產業清單 / 個股漲跌分佈），順序由
       useEditMode().sectionOrder 控制
    2. 短線 / 波段模式切換、CategoryTabs、ChipFilter、StockList
    3. 編輯模式中顯示「完成」按鈕讓使用者退出
    4. 串接 FilterSheet（進階篩選）、WatchlistSheet（加入自選）、FollowSheet（一鍵跟單）
    5. 點某產業時切到 IndustryDetailView

  狀態管理：editMode 與 sectionOrder 來自 useEditMode（singleton），所以 App.vue 的設定面板
  也能控制；其他 UI 狀態（mode、activeCat、watchSet 等）保留在本頁。
-->
<template>
  <IndustryDetailView
    v-if="selectedIndustry"
    :industry="selectedIndustry"
    @back="selectedIndustry = null"
    @select-stock="$emit('selectStock', $event)"
  ></IndustryDetailView>
  <div v-else>
    <div v-if="editMode" class="page-head">
      <span class="edit-toggle on" @click="exitEdit">完成</span>
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
        <template #title-addon>
          <div v-if="!editMode" class="mode-toggle">
            <span class="mt" :class="{ active: mode === 'short' }" @click="mode = 'short'">短線</span>
            <span class="mt" :class="{ active: mode === 'swing' }" @click="mode = 'swing'">波段</span>
          </div>
        </template>
        <template v-if="editMode" #header-right>
          <div class="order-ctrl">
            <button class="ord-btn" :disabled="idx === 0" @click="moveUp(idx)">↑</button>
            <button class="ord-btn" :disabled="idx === sectionOrder.length - 1" @click="moveDown(idx)">↓</button>
          </div>
        </template>
        <CategoryTabs :categories="activeCategories" v-model:active="activeCat" @open-filter="filterVisible = true" />
        <ChipFilter :chips="currentChips" v-model:active="activeChip">
          <template v-if="activeCat === 'follow' || activeCat === 'swing_follow'" #prefix>
            <div class="follow-btn" @click="followSheetVisible = true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              一鍵跟單
            </div>
          </template>
        </ChipFilter>
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
  <FollowSheet
    :visible="followSheetVisible"
    :stocks="displayedStocks"
    :strategy-name="activeChip"
    @cancel="followSheetVisible = false"
    @confirm="onFollowConfirm"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { shortCategories, swingCategories, getStocks } from '../data/stocks.js'
import CategoryTabs from '../components/ui/CategoryTabs.vue'
import ChipFilter from '../components/ui/ChipFilter.vue'
import SectionCard from '../components/ui/SectionCard.vue'
import StockList from '../components/stock-pick/StockList.vue'
import IndustrySection from '../components/stock-pick/IndustrySection.vue'
import IndustryDetailView from '../components/stock-pick/IndustryDetailView.vue'
import MarketDistribution from '../components/stock-pick/MarketDistribution.vue'
import MarketIndexSection from '../components/stock-pick/MarketIndexSection.vue'
import FilterSheet from '../components/sheets/FilterSheet.vue'
import WatchlistSheet from '../components/sheets/WatchlistSheet.vue'
import FollowSheet from '../components/sheets/FollowSheet.vue'
import { showToast } from '../composables/useToast.js'
import { useEditMode } from '../composables/useEditMode.js'

defineEmits(['selectStock'])

// 編輯模式 + 區塊順序：來自 singleton composable，App.vue 也能切換
const { editMode, sectionOrder, exitEdit, moveUp, moveDown } = useEditMode()

const selectedIndustry = ref(null)   // 非 null 時切到 IndustryDetailView
const mode = ref('short')             // 'short'（短線）或 'swing'（波段）
const activeCat = ref('hot')          // 目前選中的 CategoryTabs key
const activeChip = ref('短多精選')    // 目前選中的 ChipFilter
const selectMode = ref(false)         // 「+ 自選」勾選模式開關
const filterVisible = ref(false)
const wlSheetVisible = ref(false)
const followSheetVisible = ref(false)
const watchSet = ref(new Set())       // 勾選模式下被勾選的股票代號集合
const activeFilter = ref(null)        // FilterSheet apply 後的篩選條件物件

// 短線 / 波段對應到不同的分類資料
const activeCategories = computed(() => mode.value === 'short' ? shortCategories : swingCategories)

// 由當前分類取出 chips 陣列；optional chaining 避免分類找不到時崩潰
const currentChips = computed(() => {
  const cat = activeCategories.value.find(c => c.key === activeCat.value)
  return cat?.chips ?? []
})

// 切換短線/波段時，分類與 chip 都重置成新模式的第一筆
// （否則會殘留舊模式的 key，導致 currentChips 找不到對應分類而變空）
watch(mode, () => {
  activeCat.value = activeCategories.value[0]?.key ?? ''
  activeChip.value = activeCategories.value[0]?.chips?.[0] ?? ''
})

// 切換分類時，chip 重置為該分類的第一筆，並關閉勾選模式（避免跨分類誤勾）
watch(activeCat, () => {
  const chips = currentChips.value
  activeChip.value = chips[0] ?? ''
  selectMode.value = false
})

// 顯示用清單：原始資料 + 套用 FilterSheet 條件
// 重點：mock 資料把 price 用千分號字串表示（如 "1,234"），所以要先 replace 再 parseFloat
const displayedStocks = computed(() => {
  let list = getStocks(activeCat.value, activeChip.value)
  const f = activeFilter.value
  if (!f) return list
  return list.filter(s => {
    const price = parseFloat(s.price.replace(/,/g, ''))
    const vol = parseFloat(s.volume)
    const pct = parseFloat(s.changePct)
    // 任一條件不符即排除；null 代表使用者沒設這個條件
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

function onWatchlistConfirm(payload) {
  const n = watchSet.value.size
  // 兼容舊格式（陣列）與新格式（{ existingIds, newNames }），方便未來再演進
  const newCount = Array.isArray(payload) ? 0 : (payload?.newNames?.length ?? 0)
  wlSheetVisible.value = false
  selectMode.value = false
  watchSet.value = new Set() // 清空：避免下次進勾選模式時殘留上次的選擇
  showToast(
    newCount > 0
      ? `已加入自選 (${n} 檔，新增 ${newCount} 個清單)`
      : `已加入自選 (${n} 檔)`
  )
}

function onFollowConfirm(payload) {
  followSheetVisible.value = false
  const amt = payload.totalAmount.toLocaleString('en-US')
  showToast(`已建立跟單 (${payload.selectedCodes.length} 檔，NT$ ${amt})`)
}

// 重點：建立新 Set 再賦值，Vue 才能偵測到 ref 變更（直接 add/delete 不會觸發 reactivity）
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
  font-size: calc(13px * var(--font-scale)); color: var(--text-dim);
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
  font-size: calc(14px * var(--font-scale)); cursor: pointer;
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
  padding: 12px 28px; font-size: calc(16px * var(--font-scale)); font-weight: 700;
  cursor: pointer; z-index: 50;
  box-shadow: 0 4px 16px rgba(0,0,0,.4);
  font-family: "Barlow", "Microsoft JhengHei", sans-serif;
}
.fab-enter-active, .fab-leave-active { transition: all .2s ease; }
.fab-enter-from, .fab-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }

.mode-toggle {
  display: inline-flex; background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 999px; padding: 2px;
}
.mt {
  font-size: calc(12px * var(--font-scale)); padding: 4px 12px; border-radius: 999px;
  cursor: pointer; color: var(--text-dim); font-weight: 600;
  transition: all .15s; letter-spacing: 0.5px;
}
.mt.active {
  background: var(--accent); color: #1a1408; font-weight: 700;
  box-shadow: 0 0 0 2px rgba(214,162,91,0.15), 0 2px 4px rgba(0,0,0,0.2);
}

.follow-btn {
  height: 30px; border-radius: 5px;
  background: #7e3ff2; color: #fff;
  display: flex; align-items: center; justify-content: center; gap: 4px;
  font-size: calc(12px * var(--font-scale)); font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(126,63,242,0.35);
  transition: all .15s;
}
.follow-btn:active {
  background: #6a2cd9; transform: scale(0.98);
}
</style>
