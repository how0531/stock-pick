/**
 * useEditMode — 選股清單區塊排序的編輯模式
 * ==========================================
 * 用途：管理「選股」頁面內各 SectionCard（大盤資訊、選股清單、產業清單、漲跌分佈）的顯示順序，
 *       並控制是否進入「編輯模式」（出現 ↑↓ 箭頭可調整順序）。
 *
 * 設計：模組層級 singleton，App.vue（從設定 sheet）與 StockPickView 共用同一份狀態。
 *
 * 對外 API：
 *   - editMode      ref<boolean>   是否處於編輯模式
 *   - sectionOrder  ref<string[]>  目前的排序，會持久化到 localStorage
 *   - enterEdit()   進入編輯模式
 *   - exitEdit()    離開編輯模式並儲存順序、跳出 toast
 *   - toggleEdit()  視當前狀態切換 enter / exit
 *   - moveUp(idx)   把第 idx 個區塊往上移
 *   - moveDown(idx) 把第 idx 個區塊往下移
 *
 * localStorage key：'section_order_v1'
 */
import { ref } from 'vue'
import { showToast } from './useToast.js'

const STORAGE_KEY = 'section_order_v1'
const DEFAULT_ORDER = ['stockpick', 'industry', 'market', 'distribution']

function readInitialOrder() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (Array.isArray(saved) && saved.length === DEFAULT_ORDER.length) {
      return saved
    }
  } catch {}
  return [...DEFAULT_ORDER]
}

const editMode = ref(false)
const sectionOrder = ref(readInitialOrder())

function persistOrder() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sectionOrder.value))
  } catch {}
}

function enterEdit() {
  editMode.value = true
}

function exitEdit() {
  if (!editMode.value) return
  editMode.value = false
  persistOrder()
  showToast('已儲存排序')
}

function toggleEdit() {
  if (editMode.value) exitEdit()
  else enterEdit()
}

function moveUp(idx) {
  if (idx <= 0) return
  const arr = [...sectionOrder.value]
  ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
  sectionOrder.value = arr
}

function moveDown(idx) {
  if (idx >= sectionOrder.value.length - 1) return
  const arr = [...sectionOrder.value]
  ;[arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]]
  sectionOrder.value = arr
}

export function useEditMode() {
  return { editMode, sectionOrder, enterEdit, exitEdit, toggleEdit, moveUp, moveDown }
}
