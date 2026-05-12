<template>
  <div class="overview">
    <InventoryCard />
    <div class="band"></div>
    <ShortcutGrid />
    <div class="band"></div>
    <FocusGroupSection @select-stock="$emit('selectStock', $event)" />
  </div>
</template>

<script setup>
import InventoryCard from '../components/InventoryCard.vue'
import ShortcutGrid from '../components/ShortcutGrid.vue'
import FocusGroupSection from '../components/FocusGroupSection.vue'

defineEmits(['selectStock'])
</script>

<style scoped>
.overview {
  background: var(--bg);
}
.band {
  height: 8px;
  background: var(--bg-2);
}
</style>
