<!--
  WatchlistSheet — 加入自選清單 Sheet
  ====================================
  用途：批次把已勾選的股票加進自選清單；可同時加入多個自選分類。
  使用位置：StockPickView、IndustryDetailView。
  Props：visible、stockCount、watchlists
  事件：cancel、confirm（傳出選中的 watchlist id 陣列）
-->
<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="visible" class="overlay" @click.self="$emit('cancel')">
        <div class="sheet">
          <div class="handle"></div>
          <div class="head">
            <span class="title">加入自選</span>
            <button class="close" @click="$emit('cancel')">✕</button>
          </div>

          <div class="stock-summary">
            已選 <span class="count">{{ stockCount }}</span> 檔股票
          </div>

          <div class="list">
            <!-- 既有清單 -->
            <label
              v-for="wl in watchlists"
              :key="wl.id"
              class="wl-item"
              @click="toggleExisting(wl.id)"
            >
              <span class="checkbox" :class="{ checked: chosenExisting.has(wl.id) }">
                <svg v-if="chosenExisting.has(wl.id)" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1408" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span class="wl-name">{{ wl.name }}</span>
            </label>

            <!-- 本次新建的清單（顯示在現有清單之後，可取消勾選或刪除） -->
            <label
              v-for="(c, i) in created"
              :key="`new-${i}`"
              class="wl-item"
              @click="toggleCreated(i)"
            >
              <span class="checkbox" :class="{ checked: c.checked }">
                <svg v-if="c.checked" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1408" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span class="wl-name">{{ c.name }}</span>
              <span class="badge-new">新</span>
              <button class="remove-new" @click.stop="removeCreated(i)" aria-label="移除">✕</button>
            </label>
          </div>

          <!-- 新增清單區：未展開時顯示按鈕；展開後顯示輸入框 -->
          <div class="new-zone">
            <button v-if="!creating" class="add-btn" type="button" @click="startCreate">
              <span class="plus">＋</span>新增清單
            </button>
            <div v-else class="create-form">
              <input
                ref="newInputEl"
                v-model="newName"
                class="new-input"
                type="text"
                placeholder="清單名稱"
                maxlength="20"
                @keydown.enter="commitCreate"
                @keydown.esc="cancelCreate"
              />
              <button class="form-btn cancel-create" type="button" @click="cancelCreate">取消</button>
              <button
                class="form-btn commit"
                type="button"
                :disabled="!canCommit"
                @click="commitCreate"
              >建立</button>
            </div>
            <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
          </div>

          <div class="actions">
            <button class="btn cancel" @click="$emit('cancel')">取消</button>
            <button class="btn confirm" :disabled="totalChosen === 0" @click="confirm">確定</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  stockCount: { type: Number, default: 0 },
  watchlists: { type: Array, default: () => [
    { id: 1, name: '自選清單 1' },
    { id: 2, name: '自選清單 2' },
  ] },
})
const emit = defineEmits(['cancel', 'confirm'])

// 既有清單的勾選 ID 集合
const chosenExisting = ref(new Set())
// 本次新建的清單；每筆 { name, checked }；確定時把 checked = true 的 name 一併送出
const created = ref([])

// 新建區的 UI 狀態
const creating = ref(false)
const newName = ref('')
const errorMsg = ref('')
const newInputEl = ref(null)

// 全部勾選總數（既有 + 新建已勾），決定「確定」鈕是否可按
const totalChosen = computed(
  () => chosenExisting.value.size + created.value.filter((c) => c.checked).length
)

// 名稱必須非空、不重複（既有清單名 + 已新增名）才能建立
const canCommit = computed(() => {
  const v = newName.value.trim()
  if (!v) return false
  const existing = props.watchlists.some((w) => w.name === v)
  const dup = created.value.some((c) => c.name === v)
  return !existing && !dup
})

// 每次 sheet 打開都重置狀態，避免上次的勾選 / 新建項殘留
watch(() => props.visible, (v) => {
  if (v) {
    chosenExisting.value = new Set()
    created.value = []
    creating.value = false
    newName.value = ''
    errorMsg.value = ''
  }
})

function toggleExisting(id) {
  // 重點：建立新 Set 再賦值，Vue 才能偵測 ref 變更
  const next = new Set(chosenExisting.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  chosenExisting.value = next
}

function toggleCreated(i) {
  // 直接 mutate 陣列的 .checked 屬性（淺反應 OK，因為 v-for 是用 index 當 key 重渲染）
  created.value = created.value.map((c, idx) =>
    idx === i ? { ...c, checked: !c.checked } : c
  )
}

function removeCreated(i) {
  created.value = created.value.filter((_, idx) => idx !== i)
}

function startCreate() {
  creating.value = true
  errorMsg.value = ''
  // 等下一個 tick 元素出現再 focus，否則 ref 還沒掛上
  nextTick(() => newInputEl.value?.focus())
}

function cancelCreate() {
  creating.value = false
  newName.value = ''
  errorMsg.value = ''
}

function commitCreate() {
  const v = newName.value.trim()
  if (!v) {
    errorMsg.value = '請輸入清單名稱'
    return
  }
  if (props.watchlists.some((w) => w.name === v)) {
    errorMsg.value = '已有同名的自選清單'
    return
  }
  if (created.value.some((c) => c.name === v)) {
    errorMsg.value = '已新增過此名稱'
    return
  }
  // 新建後預設勾選，使用者可以再手動取消
  created.value = [...created.value, { name: v, checked: true }]
  newName.value = ''
  errorMsg.value = ''
  creating.value = false
}

function confirm() {
  emit('confirm', {
    existingIds: [...chosenExisting.value],
    newNames: created.value.filter((c) => c.checked).map((c) => c.name),
  })
}
</script>

<style scoped>
.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.6);
  z-index: 100; display: flex; align-items: flex-end; justify-content: center;
}
.sheet {
  width: 100%; max-width: 420px;
  background: var(--bg-2);
  border-radius: 20px 20px 0 0;
  padding: 12px 22px 40px;
}
.handle {
  width: 40px; height: 4px; background: #3a3f48; border-radius: 2px;
  margin: 0 auto 18px;
}
.head {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;
}
.title { font-size: calc(20px * var(--font-scale)); font-weight: 700; }
.close {
  background: var(--bg-3); border: none; color: var(--text-dim);
  width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: calc(14px * var(--font-scale));
}
.stock-summary {
  font-size: calc(13px * var(--font-scale)); color: var(--text-dim); margin-bottom: 18px;
}
.stock-summary .count { color: var(--accent); font-weight: 700; }
.list { margin-bottom: 12px; }
.wl-item {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 0; border-bottom: 1px solid var(--line);
  cursor: pointer; user-select: none;
}
.checkbox {
  width: 22px; height: 22px; border-radius: 4px;
  border: 1.5px solid var(--text-dim);
  display: flex; align-items: center; justify-content: center;
  transition: all .15s;
}
.checkbox.checked {
  background: var(--accent); border-color: var(--accent);
}
.wl-name { font-size: calc(16px * var(--font-scale)); font-weight: 500; flex: 1; }
.badge-new {
  font-size: calc(10px * var(--font-scale)); font-weight: 700;
  background: var(--accent); color: #1a1408;
  padding: 2px 6px; border-radius: 4px; line-height: 1;
}
.remove-new {
  background: transparent; border: none;
  color: var(--text-mute); font-size: calc(14px * var(--font-scale));
  width: 24px; height: 24px; border-radius: 50%;
  cursor: pointer; padding: 0;
  display: flex; align-items: center; justify-content: center;
}
.remove-new:active { background: var(--bg-3); color: var(--text); }

.new-zone { margin: 4px 0 20px; }
.add-btn {
  display: flex; align-items: center; gap: 6px;
  background: transparent; border: 1px dashed var(--text-mute);
  color: var(--text-dim);
  font-size: calc(14px * var(--font-scale)); font-weight: 600;
  padding: 10px 14px; border-radius: 8px;
  cursor: pointer; width: 100%; justify-content: center;
  font-family: inherit;
  transition: all .15s;
}
.add-btn:active { background: var(--bg-3); color: var(--text); border-color: var(--text-dim); }
.add-btn .plus { font-size: calc(16px * var(--font-scale)); }
.create-form { display: flex; gap: 8px; align-items: stretch; }
.new-input {
  flex: 1; min-width: 0;
  background: var(--bg-3); border: 1px solid var(--line);
  color: var(--text);
  font-size: calc(14px * var(--font-scale));
  padding: 10px 12px; border-radius: 8px;
  font-family: inherit;
  outline: none;
}
.new-input:focus { border-color: var(--accent); }
.form-btn {
  border: none; border-radius: 8px;
  font-size: calc(13px * var(--font-scale)); font-weight: 600;
  padding: 0 14px; cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
}
.form-btn.cancel-create { background: var(--bg-3); color: var(--text-dim); }
.form-btn.commit { background: var(--accent); color: #1a1408; }
.form-btn.commit:disabled { opacity: .4; cursor: not-allowed; }
.error {
  font-size: calc(12px * var(--font-scale));
  color: var(--up); margin-top: 6px;
}

.actions { display: flex; gap: 12px; margin-top: 4px; }
.btn {
  flex: 1; height: 48px; border: none; border-radius: 10px;
  font-size: calc(17px * var(--font-scale)); font-weight: 700; cursor: pointer;
  font-family: "Barlow", "Microsoft JhengHei", sans-serif;
}
.cancel { background: var(--bg-3); color: var(--text); }
.confirm { background: var(--accent); color: #1a1408; }
.confirm:disabled { opacity: .4; cursor: not-allowed; }

.sheet-enter-active, .sheet-leave-active { transition: transform .3s cubic-bezier(.32,1,.23,1); }
.sheet-enter-from, .sheet-leave-to { transform: translateY(100%); }
</style>
