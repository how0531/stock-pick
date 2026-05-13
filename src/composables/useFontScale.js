/**
 * useFontScale — 全域字級倍率
 * =============================
 * 用途：控制全站文字的縮放倍率（不影響版面、icon、SVG）。
 *
 * 機制：把倍率寫到 :root 的 CSS 變數 --font-scale，所有元件的 font-size 用
 *       calc(Xpx * var(--font-scale)) 計算。修改值即可即時生效。
 *
 * 設計：模組層級 singleton。讀寫都走同一個 ref，模組載入時先讀 localStorage。
 *
 * 對外 API：
 *   - fontScale  ref<number>   目前倍率，可雙向綁定到 <input type="range">
 *   - MIN, MAX, STEP, DEFAULT  滑桿用的範圍常數
 *   - reset()    回到預設 1.0×
 *
 * localStorage key：'font-scale'
 */
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
