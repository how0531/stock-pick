import { ref, watch } from 'vue'

const STORAGE_KEY = 'font-scale'
export const MIN = 0.8
export const MAX = 1.5
export const STEP = 0.05
export const DEFAULT = 1

function clamp(v) {
  if (Number.isNaN(v)) return DEFAULT
  return Math.min(MAX, Math.max(MIN, v))
}

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw == null) return DEFAULT
    return clamp(parseFloat(raw))
  } catch {
    return DEFAULT
  }
}

const fontScale = ref(readInitial())

function applyToDom(v) {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--font-scale', String(v))
  }
}

applyToDom(fontScale.value)

watch(fontScale, (v) => {
  const safe = clamp(v)
  if (safe !== v) fontScale.value = safe
  applyToDom(safe)
  try {
    localStorage.setItem(STORAGE_KEY, String(safe))
  } catch {
    // ignore quota / privacy mode errors
  }
})

function reset() {
  fontScale.value = DEFAULT
}

export function useFontScale() {
  return { fontScale, MIN, MAX, STEP, DEFAULT, reset }
}
