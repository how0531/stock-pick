<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="stock" class="overlay" @click.self="$emit('close')">
        <div class="sheet">
          <div class="handle"></div>
          <div class="head">
            <div>
              <div class="sname">{{ stock.name }}</div>
              <div class="scode">{{ stock.code }}</div>
            </div>
            <button class="close" @click="$emit('close')">✕</button>
          </div>
          <div class="price-row">
            <span class="big-price" :class="stock.up ? 'up' : 'down'">{{ stock.price }}</span>
            <span class="big-change" :class="stock.up ? 'up' : 'down'">
              {{ stock.up ? '▲' : '▼' }} {{ stock.change }} ({{ stock.pct }}%)
            </span>
          </div>
          <div class="range-bar">
            <div class="range-labels">
              <span class="range-lbl">低 {{ rangeLow }}</span>
              <span class="range-lbl">高 {{ rangeHigh }}</span>
            </div>
            <div class="range-track">
              <div class="range-fill" :class="stock.up ? 'fill-up' : 'fill-down'" :style="{ width: rangePct + '%' }"></div>
              <div class="range-thumb" :style="{ left: rangePct + '%' }"></div>
            </div>
          </div>
          <div class="stats">
            <div class="stat">
              <div class="sl">成交值</div>
              <div class="sv">{{ stock.volume }} 億</div>
            </div>
            <div class="stat">
              <div class="sl">成交量</div>
              <div class="sv">{{ stock.shares }}</div>
            </div>
            <div class="stat">
              <div class="sl">狀態</div>
              <div class="sv">{{ stock.status }}</div>
            </div>
            <div class="stat">
              <div class="sl">漲停</div>
              <div class="sv" :class="stock.limit ? 'up' : ''">{{ stock.limit ? '漲停' : '否' }}</div>
            </div>
          </div>
          <div class="stats stats-2">
            <div class="stat">
              <div class="sl">本益比</div>
              <div class="sv">{{ stock.pe ?? '-' }}</div>
            </div>
            <div class="stat">
              <div class="sl">EPS</div>
              <div class="sv">{{ stock.eps ?? '-' }}</div>
            </div>
            <div class="stat">
              <div class="sl">外資持股</div>
              <div class="sv">{{ stock.foreignPct ? stock.foreignPct + '%' : '-' }}</div>
            </div>
            <div class="stat">
              <div class="sl">投信持股</div>
              <div class="sv">{{ stock.trustPct ? stock.trustPct + '%' : '-' }}</div>
            </div>
          </div>
          <div class="actions">
            <button class="btn buy">買進</button>
            <button class="btn sell">賣出</button>
            <button class="btn watch">加自選</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ stock: { type: Object, default: null } })
defineEmits(['close'])

const priceNum = computed(() => parseFloat(props.stock?.price) || 0)
const pctNum = computed(() => parseFloat(props.stock?.changePct) || 0)
const prevClose = computed(() => priceNum.value / (1 + pctNum.value / 100))
const rangeLow = computed(() => {
  const low = props.stock?.up ? prevClose.value : priceNum.value * 0.997
  return low.toFixed(low >= 100 ? 0 : 1)
})
const rangeHigh = computed(() => {
  const high = props.stock?.up ? priceNum.value * 1.003 : prevClose.value
  return high.toFixed(high >= 100 ? 0 : 1)
})
const rangePct = computed(() => {
  const lo = parseFloat(rangeLow.value)
  const hi = parseFloat(rangeHigh.value)
  if (hi <= lo) return 50
  return Math.min(100, Math.max(0, ((priceNum.value - lo) / (hi - lo)) * 100))
})
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
  padding: 12px 22px 40px;
}
.handle {
  width: 40px; height: 4px; background: #3a3f48; border-radius: 2px;
  margin: 0 auto 18px;
}
.head {
  display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;
}
.sname { font-size: calc(22px * var(--font-scale)); font-weight: 700; }
.scode { font-size: calc(14px * var(--font-scale)); color: var(--text-dim); margin-top: 4px; }
.close {
  background: var(--bg-3); border: none; color: var(--text-dim);
  width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: calc(14px * var(--font-scale));
}
.price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 14px; }
.range-bar { margin-bottom: 18px; }
.range-labels { display: flex; justify-content: space-between; margin-bottom: 6px; }
.range-lbl { font-size: calc(12px * var(--font-scale)); color: var(--text-dim); }
.range-track {
  position: relative; height: 6px; background: var(--bg-3);
  border-radius: 3px; overflow: visible;
}
.range-fill {
  height: 100%; border-radius: 3px; min-width: 2px;
}
.fill-up { background: var(--up); }
.fill-down { background: var(--down); }
.range-thumb {
  position: absolute; top: 50%; width: 10px; height: 10px;
  border-radius: 50%; background: #fff; transform: translate(-50%, -50%);
}
.big-price { font-size: calc(32px * var(--font-scale)); font-weight: 700; }
.big-change { font-size: calc(16px * var(--font-scale)); }
.up { color: var(--up); }
.down { color: var(--down); }
.stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 10px;
}
.stats-2 { margin-bottom: 28px; }
.stat { background: var(--bg-3); border-radius: 8px; padding: 12px 8px; text-align: center; }
.sl { font-size: calc(12px * var(--font-scale)); color: var(--text-dim); margin-bottom: 6px; }
.sv { font-size: calc(15px * var(--font-scale)); font-weight: 600; }
.actions { display: flex; gap: 10px; }
.btn {
  flex: 1; height: 48px; border: none; border-radius: 10px;
  font-size: calc(17px * var(--font-scale)); font-weight: 700; cursor: pointer;
}
.buy  { background: var(--up); color: #fff; }
.sell { background: var(--down); color: #fff; }
.watch { background: var(--bg-3); color: var(--text); }

.sheet-enter-active, .sheet-leave-active { transition: transform .3s cubic-bezier(.32,1,.23,1); }
.sheet-enter-from, .sheet-leave-to { transform: translateY(100%); }
</style>
