<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="visible" class="overlay" @click.self="$emit('cancel')">
        <div class="sheet">
          <div class="handle"></div>
          <div class="head">
            <div>
              <div class="title">一鍵跟單</div>
              <div class="subtitle">{{ stocks.length }} 檔個股可選</div>
            </div>
            <button class="close" @click="$emit('cancel')">✕</button>
          </div>

          <div class="amount-field">
            <label>跟單總金額</label>
            <div class="amount-input">
              <span class="currency">NT$</span>
              <input
                type="text"
                inputmode="numeric"
                :value="formattedAmount"
                @input="onAmountInput"
                placeholder="100,000"
              />
            </div>
            <div class="amount-presets">
              <span
                v-for="p in presets"
                :key="p"
                class="preset"
                :class="{ on: totalAmount === p }"
                @click="totalAmount = p"
              >{{ formatAmount(p) }}</span>
            </div>
          </div>

          <div class="order-type">
            <label>下單方式</label>
            <div class="ot-tabs">
              <span class="ot" :class="{ on: orderType === 'limit' }" @click="orderType = 'limit'">限價</span>
              <span class="ot" :class="{ on: orderType === 'market' }" @click="orderType = 'market'">市價</span>
            </div>
          </div>

          <div class="alloc-bar">
            <div class="alloc-info">
              <span class="alloc-label">已選</span>
              <span class="alloc-num">{{ selected.size }}</span>
              <span class="alloc-label">檔，每檔約</span>
              <span class="alloc-num">NT$ {{ perStockText }}</span>
            </div>
            <span
              class="all-btn"
              @click="toggleAll"
            >{{ selected.size === stocks.length ? '取消全選' : '全選' }}</span>
          </div>

          <div class="stock-list">
            <div
              v-for="stock in stocks"
              :key="stock.code"
              class="stock-row"
              :class="{ on: selected.has(stock.code) }"
              @click="toggle(stock.code)"
            >
              <span class="checkbox" :class="{ checked: selected.has(stock.code) }">
                <svg v-if="selected.has(stock.code)" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <div class="info">
                <div class="name">{{ stock.name }}</div>
                <div class="code">{{ stock.code }}</div>
              </div>
              <div class="price-col">
                <div class="price" :class="stock.up ? 'up' : 'down'">{{ stock.price }}</div>
                <div class="pct" :class="stock.up ? 'up' : 'down'">{{ stock.changePct }}%</div>
              </div>
              <div class="alloc-col" :class="{ active: selected.has(stock.code) }">
                <div class="alloc-amt">{{ selected.has(stock.code) ? perStockText : '—' }}</div>
                <div class="alloc-share">{{ selected.has(stock.code) ? perStockShares(stock) : '' }}</div>
              </div>
            </div>
          </div>

          <div class="actions">
            <button class="btn cancel" @click="$emit('cancel')">取消</button>
            <button
              class="btn confirm"
              :disabled="selected.size === 0 || !totalAmount"
              @click="confirm"
            >確認跟單</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  stocks: { type: Array, default: () => [] },
  strategyName: { type: String, default: '' },
})
const emit = defineEmits(['cancel', 'confirm'])

const presets = [50000, 100000, 300000, 500000]
const totalAmount = ref(100000)
const orderType = ref('limit')
const selected = ref(new Set())

watch(() => props.visible, (v) => {
  if (v) {
    selected.value = new Set(props.stocks.map(s => s.code))
  }
})

const formattedAmount = computed(() => {
  return totalAmount.value ? totalAmount.value.toLocaleString('en-US') : ''
})

function onAmountInput(e) {
  const raw = e.target.value.replace(/[^0-9]/g, '')
  totalAmount.value = raw ? parseInt(raw, 10) : 0
}

function formatAmount(n) {
  if (n >= 10000) return (n / 10000) + '萬'
  return n.toString()
}

const perStock = computed(() => {
  if (!selected.value.size || !totalAmount.value) return 0
  return Math.floor(totalAmount.value / selected.value.size)
})

const perStockText = computed(() => perStock.value.toLocaleString('en-US'))

function perStockShares(stock) {
  const p = parseFloat(String(stock.price).replace(/,/g, ''))
  if (!p || !perStock.value) return ''
  const shares = Math.floor(perStock.value / p)
  return shares > 0 ? `${shares.toLocaleString('en-US')} 股` : '< 1 股'
}

function toggle(code) {
  const next = new Set(selected.value)
  if (next.has(code)) next.delete(code)
  else next.add(code)
  selected.value = next
}

function toggleAll() {
  if (selected.value.size === props.stocks.length) {
    selected.value = new Set()
  } else {
    selected.value = new Set(props.stocks.map(s => s.code))
  }
}

function confirm() {
  emit('confirm', {
    totalAmount: totalAmount.value,
    orderType: orderType.value,
    selectedCodes: Array.from(selected.value),
    perStock: perStock.value,
  })
}
</script>

<style scoped>
.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.6);
  z-index: 100; display: flex; align-items: flex-end;
  justify-content: center;
}
.sheet {
  width: 100%; max-width: 420px;
  background: var(--bg-2);
  border-radius: 20px 20px 0 0;
  padding: 12px 20px 32px;
  max-height: 88vh; overflow-y: auto;
}
.handle {
  width: 40px; height: 4px; background: #3a3f48; border-radius: 2px;
  margin: 0 auto 16px;
}
.head {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 18px;
}
.title { font-size: 19px; font-weight: 700; }
.subtitle { font-size: 12px; color: var(--text-dim); margin-top: 4px; }
.close {
  background: var(--bg-3); border: none; color: var(--text-dim);
  width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 14px;
}

.amount-field { margin-bottom: 14px; }
.amount-field label {
  display: block; font-size: 12px; color: var(--text-dim);
  margin-bottom: 6px;
}
.amount-input {
  display: flex; align-items: center;
  background: var(--bg-3); border-radius: 8px;
  padding: 12px 14px;
  border: 1px solid var(--line);
}
.amount-input .currency {
  color: var(--text-dim); font-size: 14px; margin-right: 8px;
}
.amount-input input {
  flex: 1; background: transparent; border: none; outline: none;
  color: var(--text); font-size: 20px; font-weight: 700;
  font-family: "Barlow", "Microsoft JhengHei", sans-serif;
}
.amount-presets {
  display: flex; gap: 6px; margin-top: 8px;
}
.preset {
  flex: 1; text-align: center; padding: 6px 0;
  background: var(--bg-3); border: 1px solid var(--line);
  border-radius: 6px; font-size: 12px; color: var(--text-dim);
  cursor: pointer; transition: all .15s;
}
.preset.on {
  background: rgba(126,63,242,0.15); border-color: #7e3ff2;
  color: #b48cff; font-weight: 700;
}

.order-type {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 14px;
}
.order-type label {
  font-size: 12px; color: var(--text-dim);
}
.ot-tabs {
  display: inline-flex; background: var(--bg-3);
  border: 1px solid var(--line); border-radius: 999px; padding: 3px;
  flex: 1;
}
.ot {
  flex: 1; text-align: center;
  font-size: 13px; padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer; color: var(--text-dim);
  font-weight: 600; transition: all .15s;
}
.ot.on {
  background: #7e3ff2; color: #fff; font-weight: 700;
  box-shadow: 0 0 0 2px rgba(126,63,242,0.2);
}

.alloc-bar {
  display: flex; justify-content: space-between; align-items: center;
  background: rgba(126,63,242,0.1);
  border-radius: 8px; padding: 10px 14px;
  margin-bottom: 12px;
}
.alloc-info { font-size: 13px; color: var(--text-dim); }
.alloc-num { color: #b48cff; font-weight: 700; margin: 0 4px; }
.all-btn {
  font-size: 12px; color: #b48cff; cursor: pointer;
  padding: 4px 10px; border: 1px solid #7e3ff2; border-radius: 999px;
}

.stock-list {
  max-height: 320px; overflow-y: auto;
  margin: 0 -4px 16px;
}
.stock-row {
  display: grid;
  grid-template-columns: 22px 1.3fr 1fr 1fr;
  align-items: center; gap: 8px;
  padding: 10px 4px;
  cursor: pointer;
  border-bottom: 1px solid var(--line);
  transition: background .15s;
}
.stock-row.on { background: rgba(126,63,242,0.06); }
.checkbox {
  width: 20px; height: 20px; border-radius: 4px;
  border: 1.5px solid var(--text-dim);
  display: flex; align-items: center; justify-content: center;
  transition: all .15s;
}
.checkbox.checked {
  background: #7e3ff2; border-color: #7e3ff2;
}
.name { font-size: 15px; font-weight: 700; }
.code { font-size: 11px; color: var(--text-dim); margin-top: 2px; }
.price-col { text-align: right; }
.price { font-size: 14px; font-weight: 700; }
.price.up { color: var(--up); }
.price.down { color: var(--down); }
.pct { font-size: 11px; margin-top: 2px; }
.pct.up { color: var(--up); }
.pct.down { color: var(--down); }
.alloc-col {
  text-align: right;
  font-size: 13px; color: var(--text-mute);
}
.alloc-col.active { color: #b48cff; font-weight: 700; }
.alloc-amt { font-weight: 700; }
.alloc-share { font-size: 10px; color: var(--text-dim); margin-top: 2px; font-weight: 400; }

.actions {
  display: flex; gap: 10px;
  position: sticky; bottom: -32px;
  background: var(--bg-2);
  padding: 12px 0 0;
}
.btn {
  flex: 1; height: 48px; border: none; border-radius: 10px;
  font-size: 16px; font-weight: 700; cursor: pointer;
  font-family: "Barlow", "Microsoft JhengHei", sans-serif;
}
.cancel { background: var(--bg-3); color: var(--text); }
.confirm {
  background: #7e3ff2; color: #fff;
}
.confirm:disabled {
  background: var(--bg-3); color: var(--text-mute); cursor: not-allowed;
}

.sheet-enter-active, .sheet-leave-active {
  transition: transform .3s cubic-bezier(.32,1,.23,1);
}
.sheet-enter-from, .sheet-leave-to { transform: translateY(100%); }
</style>
