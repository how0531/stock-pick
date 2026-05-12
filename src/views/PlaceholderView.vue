<template>
  <div class="top-bar">
    <button class="back" @click="$emit('back')">‹</button>
    <span class="ttitle">{{ title }}</span>
  </div>
  <div class="placeholder">
    <div class="icon">🚧</div>
    <div class="label">{{ title }}（開發中）</div>
  </div>
</template>

<script setup>
defineProps({ title: { type: String, default: '' } })
defineEmits(['back'])
</script>

<style scoped>
.top-bar {
  height: 54px; padding: 0 18px;
  display: flex; align-items: center; gap: 12px;
  border-bottom: 1px solid var(--line);
}
.back {
  background: none; border: none; color: #fff;
  font-size: 30px; cursor: pointer; line-height: 1; padding: 0;
}
.ttitle { font-size: 18px; font-weight: 600; }
.placeholder {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; min-height: 60vh;
  color: var(--text-dim); gap: 16px;
}
.icon { font-size: 48px; }
.label { font-size: 18px; }
</style>
