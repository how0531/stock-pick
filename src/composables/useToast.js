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
