<!--
  FilterSheet — 進階篩選 Sheet
  ==============================
  用途：依價格、成交量、漲跌幅等條件篩選股票清單。
  使用位置：StockPickView、IndustryDetailView。
  Props：visible
  事件：close、apply（傳出 filter 物件 { priceMin, priceMax, volMin, volMax, pctMin, pctMax }）
-->
<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="visible" class="overlay" @click.self="$emit('close')">
        <div class="sheet">
          <div class="handle"></div>
          <div class="head">
            <span class="title">條件篩選</span>
            <button class="close" @click="$emit('close')">✕</button>
          </div>

          <div class="field">
            <label>股價區間</label>
            <div class="range">
              <input v-model="priceMin" type="number" placeholder="最低" />
              <span>—</span>
              <input v-model="priceMax" type="number" placeholder="最高" />
            </div>
          </div>

          <div class="field">
            <label>成交值區間（億）</label>
            <div class="range">
              <input v-model="volMin" type="number" placeholder="最低" />
              <span>—</span>
              <input v-model="volMax" type="number" placeholder="最高" />
            </div>
          </div>

          <div class="field">
            <label>漲跌幅區間（%）</label>
            <div class="range">
              <input v-model="pctMin" type="number" placeholder="最低" />
              <span>—</span>
              <input v-model="pctMax" type="number" placeholder="最高" />
            </div>
          </div>

          <div class="actions">
            <button class="btn reset" @click="resetAll">重置</button>
            <button class="btn apply" @click="applyFilter">套用</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ visible: { type: Boolean, default: false } })
const emit = defineEmits(['close', 'apply'])

const priceMin = ref('')
const priceMax = ref('')
const volMin = ref('')
const volMax = ref('')
const pctMin = ref('')
const pctMax = ref('')

function resetAll() {
  priceMin.value = ''
  priceMax.value = ''
  volMin.value = ''
  volMax.value = ''
  pctMin.value = ''
  pctMax.value = ''
  emit('apply', null)
  emit('close')
}

function applyFilter() {
  emit('apply', {
    priceMin: priceMin.value !== '' ? parseFloat(priceMin.value) : null,
    priceMax: priceMax.value !== '' ? parseFloat(priceMax.value) : null,
    volMin: volMin.value !== '' ? parseFloat(volMin.value) : null,
    volMax: volMax.value !== '' ? parseFloat(volMax.value) : null,
    pctMin: pctMin.value !== '' ? parseFloat(pctMin.value) : null,
    pctMax: pctMax.value !== '' ? parseFloat(pctMax.value) : null,
  })
  emit('close')
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
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;
}
.title { font-size: calc(20px * var(--font-scale)); font-weight: 700; }
.close {
  background: var(--bg-3); border: none; color: var(--text-dim);
  width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: calc(14px * var(--font-scale));
}
.field { margin-bottom: 20px; }
label { display: block; font-size: calc(14px * var(--font-scale)); color: var(--text-dim); margin-bottom: 8px; }
.range { display: flex; align-items: center; gap: 10px; }
.range input {
  flex: 1; height: 44px; background: var(--bg-3); border: 1px solid var(--line);
  border-radius: 8px; color: #fff; font-size: calc(16px * var(--font-scale)); padding: 0 12px;
  font-family: "Barlow", "Microsoft JhengHei", sans-serif;
  outline: none;
}
.range input:focus { border-color: var(--accent); }
.range span { color: var(--text-dim); }
.actions { display: flex; gap: 12px; margin-top: 28px; }
.btn {
  flex: 1; height: 48px; border: none; border-radius: 10px;
  font-size: calc(17px * var(--font-scale)); font-weight: 700; cursor: pointer;
}
.reset { background: var(--bg-3); color: var(--text); }
.apply { background: var(--accent); color: #1a1408; }

.sheet-enter-active, .sheet-leave-active { transition: transform .3s cubic-bezier(.32,1,.23,1); }
.sheet-enter-from, .sheet-leave-to { transform: translateY(100%); }
</style>
