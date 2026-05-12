<template>
  <div class="cat-bar">
    <div class="tabs">
      <div
        v-for="cat in categories"
        :key="cat.key"
        class="tab"
        :class="{ on: cat.key === active }"
        @click="$emit('update:active', cat.key)"
      >
        {{ cat.label }}
        <div v-if="cat.key === active" class="bar"></div>
      </div>
    </div>
    <div class="funnel" @click="$emit('openFilter')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({
  active: { type: String, default: 'hot' },
  categories: { type: Array, required: true },
})
defineEmits(['update:active', 'openFilter'])
</script>

<style scoped>
.cat-bar {
  display: flex; align-items: center; padding: 6px 16px 0;
}
.tabs { display: flex; gap: 24px; flex: 1; }
.tab {
  font-size: 14px; color: var(--text-dim); padding: 6px 0 8px;
  position: relative; cursor: pointer; font-weight: 500;
}
.tab.on { color: #fff; font-weight: 700; }
.bar {
  position: absolute; left: 0; right: 0; bottom: 0;
  height: 3px; background: var(--orange); border-radius: 2px;
}
.funnel { color: var(--text-dim); cursor: pointer; padding: 8px; }
.funnel:active { color: #fff; }
</style>
