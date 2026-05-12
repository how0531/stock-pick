<template>
  <div class="index">
    <div v-for="idx in indices" :key="idx.name" class="item">
      <span class="k">{{ idx.name }}</span>
      <span class="v" :class="idx.up ? 'up' : 'down'">{{ idx.value }}</span>
      <span class="d" :class="idx.up ? 'up' : 'down'">
        <span class="tri" :class="{ down: !idx.up }"></span>{{ idx.change }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { indices } from '../data/stocks.js'
</script>

<style scoped>
.index {
  padding: 4px 16px 6px;
  display: flex; align-items: center; gap: 18px;
  color: #fff; font-size: 14px;
}
.item { display: flex; align-items: center; }
.k { color: var(--text-dim); margin-right: 6px; font-size: 13px; }
.v { font-weight: 700; letter-spacing: .3px; }
.v.up, .d.up { color: var(--up); }
.v.down, .d.down { color: var(--down); }
.d { margin-left: 4px; font-size: 12px; }
.tri {
  display: inline-block; width: 0; height: 0;
  border-left: 4px solid transparent; border-right: 4px solid transparent;
  border-bottom: 6px solid var(--up);
  transform: translateY(-1px); margin-right: 2px;
}
.tri.down { border-bottom: none; border-top: 6px solid var(--down); transform: translateY(1px); }
</style>
