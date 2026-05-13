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

const current = ref(null) // 目前顯示中的 toast，null 代表沒有
let nextId = 0             // 每則訊息給唯一 id，方便 Vue Transition 觸發動畫
let timer = null           // 自動消失的計時器

export function showToast(message, type = 'success', duration = 2000) {
  // 重點：新訊息會覆蓋舊的（清掉前一個 timer），避免兩則 toast 重疊或順序錯亂
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
