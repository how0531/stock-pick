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

// 重點：把倍率限制在 [MIN, MAX]，避免使用者改 localStorage / DevTools 灌入怪值
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

// singleton ref，模組第一次被 import 就建立並讀回上次倍率
const fontScale = ref(readInitial())

// 重點：把倍率寫進 :root 的 CSS 變數，所有元件的 font-size: calc(Xpx * var(--font-scale)) 立即生效
function applyToDom(v) {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--font-scale', String(v))
  }
}

// 模組載入時先套用一次，避免首屏使用預設 1.0× 後才跳到使用者偏好
applyToDom(fontScale.value)

// 之後每次倍率變動：clamp → 同步 DOM → 寫 localStorage
watch(fontScale, (v) => {
  const safe = clamp(v)
  if (safe !== v) fontScale.value = safe // 反向修正：滑桿外掛超出範圍時拉回合法值
  applyToDom(safe)
  try {
    localStorage.setItem(STORAGE_KEY, String(safe))
  } catch {
    // 隱私模式 / 配額爆掉，靜默失敗（畫面照樣套用）
  }
})

function reset() {
  fontScale.value = DEFAULT
}

export function useFontScale() {
  return { fontScale, MIN, MAX, STEP, DEFAULT, reset }
}
