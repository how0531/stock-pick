<template>
  <div class="row" @click="$emit('click', stock)">
    <div class="name">
      <div class="n">
        <span
          v-if="selectMode"
          class="add-mark"
          :class="{ added: isWatched }"
          @click.stop="$emit('toggleWatch', stock)"
        >{{ isWatched ? '✓' : '+' }}</span>{{ stock.name }}
      </div>
      <div class="c">{{ stock.code }}</div>
    </div>
    <div class="price" :class="stock.up ? 'up' : 'down'">{{ stock.price }}</div>
    <div class="pct" :class="stock.up ? 'up' : 'down'">
      <span class="tri" :class="{ down: !stock.up }"></span>{{ stock.changePct }}%
    </div>
    <div class="vol">{{ stock.volume }} 億</div>
  </div>
</template>

<script setup>
defineProps({
  stock: { type: Object, required: true },
  selectMode: { type: Boolean, default: false },
  isWatched: { type: Boolean, default: false },
})
defineEmits(['click', 'toggleWatch'])
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1.1fr 1fr;
  align-items: center; padding: 10px 16px;
  border-bottom: 1px solid var(--line);
  cursor: pointer; transition: background .15s;
}
.row:active { background: var(--bg-2); }

.n { font-size: calc(16px * var(--font-scale)); font-weight: 700; letter-spacing: .3px; }
.c { font-size: calc(11px * var(--font-scale)); color: var(--text-dim); margin-top: 2px; }
.price { text-align: right; font-size: calc(16px * var(--font-scale)); font-weight: 700; letter-spacing: .3px; }
.pct { text-align: right; font-size: calc(13px * var(--font-scale)); font-weight: 600; }
.vol { text-align: right; color: #fff; font-size: calc(13px * var(--font-scale)); }
.up { color: var(--up); }
.down { color: var(--down); }
.tri {
  display: inline-block; width: 0; height: 0;
  border-left: 3.5px solid transparent; border-right: 3.5px solid transparent;
  border-bottom: 5px solid var(--up);
  margin-right: 2px; transform: translateY(-1px);
}
.tri.down { border-bottom: none; border-top: 5px solid var(--down); transform: translateY(1px); }

.add-mark {
  color: var(--accent); font-weight: 700; margin-right: 2px; cursor: pointer;
}
.add-mark.added { color: var(--up); }
</style>
