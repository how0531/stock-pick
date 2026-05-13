/**
 * useToast — 全域 Toast 通知
 * ============================
 * 用途：在畫面上跳出短暫提示訊息（例如「已儲存排序」、「已加入自選」）。
 *
 * 設計：模組層級 singleton；同一時間只顯示一則 toast，新訊息會覆蓋舊的。
 *       Toast.vue 訂閱 current ref 來顯示，其他元件呼叫 showToast() 觸發。
 *
 * 對外 API：
 *   - showToast(message, type='success', duration=2000)   觸發一則 toast
 *   - useToast()  → { current, showToast }   給 Toast.vue 使用
 */
import { ref } from 'vue'

const current = ref(null)
let nextId = 0
let timer = null

export function showToast(message, type = 'success', duration = 2000) {
  if (timer) clearTimeout(timer)
  current.value = { id: ++nextId, message, type }
  timer = setTimeout(() => {
    current.value = null
    timer = null
  }, duration)
}

export function useToast() {
  return { current, showToast }
}
