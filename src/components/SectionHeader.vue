<template>
  <div class="sec-head" @click="$emit('toggle')">
    <div class="l">
      <span class="minus">
        <span class="bar"></span>
        <span class="bar v" v-if="collapsed"></span>
      </span>
      <span>{{ title }}</span>
    </div>
    <div v-if="showChevron" class="chev">›</div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  showChevron: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false },
})
defineEmits(['toggle'])
</script>

<style scoped>
.sec-head {
  margin-top: 8px;
  padding: 14px 18px 12px;
  display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid #0a0c10;
  cursor: pointer;
  user-select: none;
}
.l { display: flex; align-items: center; gap: 10px; font-size: calc(17px * var(--font-scale)); font-weight: 600; }
.minus {
  width: 18px; height: 18px; border: 1.5px solid #fff; border-radius: 3px;
  display: inline-flex; align-items: center; justify-content: center; position: relative;
}
.bar {
  position: absolute; width: 10px; height: 1.6px; background: #fff; display: block;
}
.bar.v { transform: rotate(90deg); }
.chev { color: var(--text-dim); font-size: calc(18px * var(--font-scale)); }
</style>
