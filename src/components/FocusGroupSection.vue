<template>
  <div class="focus">
    <div class="tabs">
      <div
        v-for="t in focusTabs"
        :key="t.key"
        class="tab"
        :class="{ on: t.key === activeTab }"
        @click="activeTab = t.key"
      >{{ t.label }}</div>
    </div>

    <div class="chips">
      <div
        v-for="g in currentGroups"
        :key="g.name"
        class="chip"
        :class="{ on: g.name === activeGroup }"
        @click="activeGroup = g.name"
      >{{ g.name }}</div>
    </div>

    <div class="rows">
      <div
        v-for="s in currentStocks"
        :key="s.code"
        class="row"
        @click="$emit('selectStock', s)"
      >
        <div class="status"><span>{{ s.status[0] }}</span><span>{{ s.status[1] }}</span></div>
        <div class="info">
          <div class="name">{{ s.name }}</div>
          <div class="code">{{ s.code }}</div>
        </div>
        <div class="price-block">
          <div class="price" :class="s.up ? 'up' : 'down'">{{ s.price }}</div>
          <div class="change" :class="s.up ? 'up' : 'down'">
            <span class="tri" :class="{ down: !s.up }"></span>{{ s.change }}<span class="paren">({{ s.changePct }}%)</span>
          </div>
        </div>
        <div class="qty">
          <div class="qty-row">
            <span class="qty-lbl">單量</span>
            <span class="qty-val" :class="s.bidUp ? 'up' : 'down'">{{ s.bidQty }}</span>
          </div>
          <div class="qty-row">
            <span class="qty-lbl">總量</span>
            <span class="qty-val">{{ s.volume }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { focusTabs, focusGroups } from '../data/stocks.js'

defineEmits(['selectStock'])

const activeTab = ref('strong')
const activeGroup = ref('5G基礎建設')

const currentGroups = computed(() => focusGroups[activeTab.value] ?? [])

watch(activeTab, (val) => {
  activeGroup.value = focusGroups[val]?.[0]?.name ?? ''
})

const currentStocks = computed(() => {
  const g = currentGroups.value.find(x => x.name === activeGroup.value)
  return g?.stocks ?? []
})
</script>

<style scoped>
.focus {
  background: var(--bg);
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--line);
}
.tab {
  flex: 1; text-align: center;
  font-size: calc(17px * var(--font-scale));
  padding: 16px 0 14px;
  color: var(--text-dim);
  cursor: pointer;
  position: relative;
}
.tab.on {
  color: var(--accent);
  font-weight: 600;
}
.tab.on::after {
  content: "";
  position: absolute; left: 22%; right: 22%; bottom: -1px;
  height: 2px; background: var(--accent);
}

.chips {
  display: flex; gap: 10px;
  padding: 14px 14px 10px;
}
.chip {
  flex: 1;
  padding: 12px 6px;
  text-align: center;
  font-size: calc(14px * var(--font-scale));
  border-radius: 6px;
  background: var(--bg-3);
  color: var(--text-dim);
  cursor: pointer;
  transition: all .15s;
}
.chip.on {
  background: var(--chip-on);
  color: #1a1408;
  font-weight: 700;
}

.rows { padding-bottom: 8px; }
.row {
  display: grid;
  grid-template-columns: 24px 1.1fr 1.5fr 0.95fr;
  align-items: center;
  gap: 10px;
  padding: 18px 14px;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition: background .15s;
}
.row:active { background: var(--bg-2); }

.status {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  font-size: calc(10.5px * var(--font-scale));
  color: var(--text-mute);
  line-height: 1.3;
  letter-spacing: 1px;
  background: var(--bg-3);
  padding: 6px 2px;
  border-radius: 3px;
  min-height: 36px;
}
.status span { display: block; }

.info .name {
  font-size: calc(21px * var(--font-scale));
  font-weight: 700;
  color: #fff;
  letter-spacing: .3px;
  line-height: 1.1;
}
.info .code {
  font-size: calc(12px * var(--font-scale));
  color: var(--text-dim);
  margin-top: 4px;
}

.price-block {
  text-align: right;
}
.price {
  font-size: calc(24px * var(--font-scale));
  font-weight: 700;
  letter-spacing: .3px;
  line-height: 1.1;
}
.change {
  font-size: calc(13px * var(--font-scale));
  margin-top: 5px;
}
.tri {
  display: inline-block; width: 0; height: 0;
  border-left: 4px solid transparent; border-right: 4px solid transparent;
  border-bottom: 6px solid var(--up);
  margin-right: 3px;
  transform: translateY(-1px);
}
.tri.down {
  border-bottom: none;
  border-top: 6px solid var(--down);
  transform: translateY(1px);
}
.paren { margin-left: 4px; }

.qty {
  display: flex; flex-direction: column;
  gap: 4px;
  font-size: calc(12px * var(--font-scale));
}
.qty-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.qty-lbl { color: var(--text-dim); }
.qty-val { color: #fff; font-weight: 600; }

.up { color: var(--up); }
.down { color: var(--down); }
</style>
