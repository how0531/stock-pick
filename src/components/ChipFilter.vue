<template>
  <div class="chips">
    <slot name="prefix" />
    <div
      v-for="chip in chips"
      :key="chip"
      class="chip"
      :class="{ on: chip === active }"
      @click="$emit('update:active', chip)"
    >{{ chip }}</div>
  </div>
</template>

<script setup>
defineProps({
  chips: { type: Array, required: true },
  active: { type: String, default: '' },
})
defineEmits(['update:active'])
</script>

<style scoped>
.chips {
  padding: 4px 16px 4px;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;
}
.chip {
  height: 30px; border-radius: 5px; background: var(--chip);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); font-size: calc(12px * var(--font-scale)); font-weight: 500;
  letter-spacing: .2px; cursor: pointer; white-space: nowrap;
}
.chip.on { background: var(--chip-on); color: #1a1408; font-weight: 700; }
</style>
