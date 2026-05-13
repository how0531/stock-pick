/**
 * 應用程式進入點
 * ===============
 * 用途：建立 Vue 3 應用實例並掛載到 index.html 的 #app 節點。
 * 全域樣式（CSS 變數、字型、reset）一併在此載入。
 */
import { createApp } from 'vue'
import App from './App.vue'
import './styles/variables.css'

createApp(App).mount('#app')
