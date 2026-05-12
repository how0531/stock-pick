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
            <label
              v-for="wl in watchlists"
              :key="wl.id"
              class="wl-item"
              @click="toggle(wl.id)"
            >
              <span class="checkbox" :class="{ checked: chosen.has(wl.id) }">
                <svg v-if="chosen.has(wl.id)" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1408" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span class="wl-name">{{ wl.name }}</span>
            </label>
          </div>

          <div class="actions">
            <button class="btn cancel" @click="$emit('cancel')">取消</button>
            <button class="btn confirm" :disabled="chosen.size === 0" @click="confirm">確定</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  stockCount: { type: Number, default: 0 },
  watchlists: { type: Array, default: () => [
    { id: 1, name: '自選清單 1' },
    { id: 2, name: '自選清單 2' },
  ] },
})
const emit = defineEmits(['cancel', 'confirm'])

const chosen = ref(new Set())

watch(() => props.visible, (v) => {
  if (v) chosen.value = new Set()
})

function toggle(id) {
  const next = new Set(chosen.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  chosen.value = next
}

function confirm() {
  emit('confirm', [...chosen.value])
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
.title { font-size: 20px; font-weight: 700; }
.close {
  background: var(--bg-3); border: none; color: var(--text-dim);
  width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 14px;
}
.stock-summary {
  font-size: 13px; color: var(--text-dim); margin-bottom: 18px;
}
.stock-summary .count { color: var(--accent); font-weight: 700; }
.list { margin-bottom: 24px; }
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
.wl-name { font-size: 16px; font-weight: 500; }
.actions { display: flex; gap: 12px; margin-top: 4px; }
.btn {
  flex: 1; height: 48px; border: none; border-radius: 10px;
  font-size: 17px; font-weight: 700; cursor: pointer;
  font-family: "Barlow", "Microsoft JhengHei", sans-serif;
}
.cancel { background: var(--bg-3); color: var(--text); }
.confirm { background: var(--accent); color: #1a1408; }
.confirm:disabled { opacity: .4; cursor: not-allowed; }

.sheet-enter-active, .sheet-leave-active { transition: transform .3s cubic-bezier(.32,1,.23,1); }
.sheet-enter-from, .sheet-leave-to { transform: translateY(100%); }
</style>
