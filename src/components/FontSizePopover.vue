<template>
  <template v-if="open">
    <div class="backdrop" @click="$emit('close')" />
    <div class="panel" @click.stop>
      <div class="row head">
        <span class="label">字級大小</span>
        <span class="value">{{ fontScale.toFixed(2) }}×</span>
      </div>
      <input
        class="slider"
        type="range"
        :min="MIN"
        :max="MAX"
        :step="STEP"
        v-model.number="fontScale"
      />
      <div class="row foot">
        <span class="hint">{{ MIN.toFixed(1) }}× ~ {{ MAX.toFixed(1) }}×</span>
        <button class="reset" type="button" @click="reset">重設</button>
      </div>
    </div>
  </template>
</template>

<script setup>
import { useFontScale } from '../composables/useFontScale.js'

defineProps({ open: { type: Boolean, default: false } })
defineEmits(['close'])

const { fontScale, MIN, MAX, STEP, reset } = useFontScale()
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: transparent;
}
.panel {
  position: absolute;
  top: 54px;
  right: 16px;
  z-index: 51;
  width: 220px;
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 12px 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head { margin-bottom: 10px; }
.foot { margin-top: 8px; }
.label {
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
}
.value {
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.hint {
  color: var(--text-mute);
  font-size: 11px;
}
.reset {
  background: var(--chip);
  color: var(--text);
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
}
.reset:active { background: var(--tag); }
.slider {
  width: 100%;
  accent-color: var(--accent);
}
</style>
