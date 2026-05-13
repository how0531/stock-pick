<!--
  SettingsSheet — 設定底部 Sheet
  ================================
  用途：全域設定面板，整合「字級大小」滑桿與「編輯排序」入口。
  使用位置：App.vue（從右上齒輪按鈕開啟）。
  Props：visible
  事件：close、edit-order（點「編輯排序」時，App.vue 接到後切到選股頁並進入編輯模式）
-->
<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="visible" class="overlay" @click.self="$emit('close')">
        <div class="sheet">
          <div class="handle"></div>
          <div class="head">
            <span class="title">設定</span>
            <button class="close" @click="$emit('close')">✕</button>
          </div>

          <section class="block">
            <div class="block-head">
              <span class="block-title">字級大小</span>
              <span class="block-value">{{ fontScale.toFixed(2) }}×</span>
            </div>
            <input
              class="slider"
              type="range"
              :min="MIN"
              :max="MAX"
              :step="STEP"
              v-model.number="fontScale"
            />
            <div class="block-foot">
              <span class="hint">{{ MIN.toFixed(1) }}× ~ {{ MAX.toFixed(1) }}×</span>
              <button class="link-btn" type="button" @click="resetFont">重設</button>
            </div>
          </section>

          <section class="block">
            <div class="block-head">
              <span class="block-title">選股清單排序</span>
            </div>
            <p class="desc">調整大盤資訊、選股清單、產業清單等區塊在「選股」頁的顯示順序。</p>
            <button
              class="action-btn"
              :class="{ active: editMode }"
              type="button"
              @click="onToggleEdit"
            >{{ editMode ? '結束編輯' : '編輯排序' }}</button>
          </section>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useFontScale } from '../../composables/useFontScale.js'
import { useEditMode } from '../../composables/useEditMode.js'

defineProps({ visible: { type: Boolean, default: false } })
const emit = defineEmits(['close', 'edit-order'])

const { fontScale, MIN, MAX, STEP, reset: resetFont } = useFontScale()
const { editMode, toggleEdit } = useEditMode()

function onToggleEdit() {
  if (editMode.value) {
    toggleEdit()
    emit('close')
  } else {
    emit('edit-order')
  }
}
</script>

<style scoped>
.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.6);
  z-index: 100; display: flex; align-items: flex-end; justify-content: center;
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
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;
}
.title { font-size: 20px; font-weight: 700; color: var(--text); }
.close {
  background: var(--bg-3); border: none; color: var(--text-dim);
  width: 30px; height: 30px; border-radius: 50%; cursor: pointer;
  font-size: 14px;
}

.block {
  padding: 16px 0;
  border-top: 1px solid var(--line);
}
.block-head {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 10px;
}
.block-title { font-size: 15px; font-weight: 600; color: var(--text); }
.block-value {
  font-size: 13px; font-weight: 600; color: var(--accent);
  font-variant-numeric: tabular-nums;
}
.block-foot {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 6px;
}
.desc {
  font-size: 12px; color: var(--text-dim); line-height: 1.5;
  margin-bottom: 12px;
}
.hint { font-size: 11px; color: var(--text-mute); }
.link-btn {
  background: transparent; border: none; cursor: pointer;
  color: var(--accent); font-size: 12px; font-weight: 600;
  padding: 4px 0;
}
.slider {
  width: 100%;
  accent-color: var(--accent);
}
.action-btn {
  width: 100%;
  height: 44px;
  border: 1px solid var(--line);
  background: var(--bg-3);
  color: var(--text);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.action-btn.active {
  background: var(--accent);
  color: #1a1408;
  border-color: var(--accent);
}

.sheet-enter-active, .sheet-leave-active {
  transition: transform .3s cubic-bezier(.32,1,.23,1);
}
.sheet-enter-from, .sheet-leave-to { transform: translateY(100%); }
</style>
