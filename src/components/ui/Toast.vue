<!--
  Toast — 全域訊息提示
  ======================
  用途：訂閱 useToast 的 current ref，在畫面底部跳出短暫提示（淡入淡出）。
  使用位置：App.vue（全頁掛載一次）。
  觸發方式：在任何元件呼叫 showToast('訊息')。
-->
<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="current" class="toast" :class="current.type" :key="current.id">
        <span class="icon">
          <svg v-if="current.type === 'success'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <svg v-else-if="current.type === 'info'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </span>
        <span class="msg">{{ current.message }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useToast } from '../../composables/useToast.js'
const { current } = useToast()
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 170px; left: 50%;
  transform: translateX(-50%);
  background: rgba(20, 23, 28, 0.95);
  border: 1px solid var(--line);
  color: var(--text);
  padding: 10px 18px;
  border-radius: 999px;
  font-size: calc(14px * var(--font-scale)); font-weight: 600;
  box-shadow: 0 6px 20px rgba(0,0,0,0.5);
  z-index: 200;
  display: flex; align-items: center; gap: 8px;
  white-space: nowrap;
  max-width: 90vw;
  font-family: "Barlow", "Microsoft JhengHei", sans-serif;
}
.toast.success .icon { color: var(--accent); }
.toast.info .icon { color: #4a9eff; }
.toast.error .icon { color: var(--up); }
.icon { display: inline-flex; align-items: center; }

.toast-enter-active, .toast-leave-active {
  transition: all .25s cubic-bezier(.32,1,.23,1);
}
.toast-enter-from {
  opacity: 0; transform: translateX(-50%) translateY(20px);
}
.toast-leave-to {
  opacity: 0; transform: translateX(-50%) translateY(10px);
}
</style>
