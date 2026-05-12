<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="overlay">
        <div class="bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b919c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
          </svg>
          <input ref="inputEl" v-model="query" placeholder="輸入股票名稱或代號" @keydown.esc="$emit('close')" />
          <button class="cancel" @click="$emit('close')">取消</button>
        </div>
        <div v-if="results.length" class="results">
          <div v-for="s in results" :key="s.code" class="result-row" @click="$emit('close')">
            <div>
              <div class="rn">{{ s.name }}</div>
              <div class="rc">{{ s.code }}</div>
            </div>
            <div class="rp" :class="s.up ? 'up' : 'down'">{{ s.price }}</div>
          </div>
        </div>
        <div v-else-if="query" class="empty">找不到「{{ query }}」相關結果</div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { getStocks } from '../data/stocks.js'

const props = defineProps({ visible: { type: Boolean, default: false } })
defineEmits(['close'])

const query = ref('')
const inputEl = ref(null)
const allItems = [...getStocks('台股', '成交值'), ...getStocks('海外', '成交值')]

const results = computed(() => {
  if (!query.value) return []
  const q = query.value.toLowerCase()
  return allItems.filter(s => s.name.includes(q) || s.code.toLowerCase().includes(q)).slice(0, 6)
})

watch(() => props.visible, async (v) => {
  if (v) {
    query.value = ''
    await nextTick()
    inputEl.value?.focus()
  }
})
</script>

<style scoped>
.overlay {
  position: fixed; inset: 0; background: var(--bg);
  z-index: 200; padding: 54px 0 0;
}
.bar {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 16px; background: var(--bg-2); margin: 0 14px;
  border-radius: 12px;
}
input {
  flex: 1; background: none; border: none; outline: none;
  color: #fff; font-size: 17px;
  font-family: inherit;
}
input::placeholder { color: var(--text-dim); }
.cancel { background: none; border: none; color: var(--orange); font-size: 16px; cursor: pointer; white-space: nowrap; }
.results { margin-top: 8px; }
.result-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; border-bottom: 1px solid var(--line); cursor: pointer;
}
.result-row:active { background: var(--bg-2); }
.rn { font-size: 17px; font-weight: 600; }
.rc { font-size: 13px; color: var(--text-dim); margin-top: 3px; }
.rp { font-size: 18px; font-weight: 700; }
.up { color: var(--up); }
.down { color: var(--down); }
.empty { padding: 40px 20px; text-align: center; color: var(--text-dim); font-size: 16px; }

.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
