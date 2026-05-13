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
