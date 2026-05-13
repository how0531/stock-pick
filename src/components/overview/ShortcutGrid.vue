<!--
  ShortcutGrid — 快捷功能格
  ===========================
  用途：總覽頁面的快捷功能小圖示格（盤後資訊、新聞、籌碼、技術…）。純展示。
  資料：shortcuts（來自 data/stocks.js）。
-->
<template>
  <div class="wrap">
    <div class="grid">
      <div v-for="s in shortcuts" :key="s.key" class="item">
        <div class="ic">
          <!-- piggy bank -->
          <svg v-if="s.icon === 'piggy'" width="36" height="36" viewBox="0 0 36 36">
            <g fill="#d6a25b">
              <path d="M5.5 17.5c0-5.2 4.7-9 10.5-9 2 0 4 .4 5.7 1.2l1.8-2.2v3.4c1.1.7 2 1.6 2.7 2.6h2.3c.8 0 1.3.6 1.3 1.4v3c0 .9-.6 1.5-1.4 1.5h-1.5l-1 2-1 2.2v2.4h-3l-.7-1.6h-7.2l-.7 1.6h-3v-2.4c-2.8-1.4-4.8-3.8-4.8-6.1z"/>
              <circle cx="22.5" cy="14.5" r="1" fill="#0b0d10"/>
            </g>
          </svg>

          <!-- globe -->
          <svg v-else-if="s.icon === 'globe'" width="36" height="36" viewBox="0 0 36 36">
            <g fill="none" stroke="#d6a25b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="18" r="11.5"/>
              <ellipse cx="18" cy="18" rx="5" ry="11.5"/>
              <line x1="6.5" y1="18" x2="29.5" y2="18"/>
              <path d="M9 11c2.5 1.8 15.5 1.8 18 0M9 25c2.5-1.8 15.5-1.8 18 0"/>
            </g>
          </svg>

          <!-- ticket / lottery -->
          <svg v-else-if="s.icon === 'note'" width="36" height="36" viewBox="0 0 36 36">
            <g fill="none" stroke="#d6a25b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 6h13l5 5v19H9z"/>
              <path d="M22 6v5h5"/>
              <path d="M13 17l3 3 7-7" stroke-width="2.4"/>
            </g>
          </svg>

          <!-- smart order / tap -->
          <svg v-else-if="s.icon === 'tap'" width="36" height="36" viewBox="0 0 36 36">
            <g fill="none" stroke="#d6a25b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 17V8.5a2.5 2.5 0 015 0V17"/>
              <path d="M21 14.5v-1a2.5 2.5 0 015 0V22c0 4.5-3 8-7 8h-2c-2.5 0-4-1-5.5-3l-5-7c-.7-1 .3-2.3 1.5-2 .8.2 1.4.6 2 1.3l2 2.4"/>
              <circle cx="18.5" cy="6" r="0.8" fill="#d6a25b"/>
              <path d="M11 6l-2-2M14 4l-1-2.5M22 4l1-2.5M25 6l2-2" stroke-width="1.8"/>
            </g>
          </svg>

          <!-- microphone / news -->
          <svg v-else-if="s.icon === 'mic'" width="36" height="36" viewBox="0 0 36 36">
            <g fill="#d6a25b">
              <rect x="13" y="4" width="10" height="17" rx="5"/>
              <path d="M9 16a9 9 0 0018 0" fill="none" stroke="#d6a25b" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M18 25v5M14 30h8" fill="none" stroke="#d6a25b" stroke-width="2.2" stroke-linecap="round"/>
            </g>
            <text x="18" y="14.5" font-size="4.5" font-weight="700" text-anchor="middle" fill="#0b0d10" font-family="Barlow, sans-serif" letter-spacing="-0.2">NEWS</text>
          </svg>

          <!-- hand give (lend) -->
          <svg v-else-if="s.icon === 'handgive'" width="36" height="36" viewBox="0 0 36 36">
            <g fill="none" stroke="#d6a25b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="25" cy="8.5" r="3.5"/>
              <path d="M21 12l2 2" />
              <path d="M4 23l5.5-2.5c.6-.3 1.3-.3 1.8 0L16 22.5l5-1.5c1.5-.5 3 .5 3 2 0 1-.5 1.8-1.4 2.2L16 28.5l-7-2-5 1.5z"/>
            </g>
          </svg>

          <!-- hand coin (loan) -->
          <svg v-else-if="s.icon === 'handcoin'" width="36" height="36" viewBox="0 0 36 36">
            <g fill="none" stroke="#d6a25b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="20" cy="9" r="4.5"/>
              <path d="M20 6.5v5M18 9h4" stroke-width="1.8"/>
              <path d="M4 24l5.5-2.5c.6-.3 1.3-.3 1.8 0L16 23.5l5-1.5c1.5-.5 3 .5 3 2 0 1-.5 1.8-1.4 2.2L16 29.5l-7-2-5 1.5z"/>
            </g>
          </svg>

          <!-- calendar -->
          <svg v-else-if="s.icon === 'cal'" width="36" height="36" viewBox="0 0 36 36">
            <g fill="none" stroke="#d6a25b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="7" width="26" height="23" rx="2"/>
              <line x1="5" y1="13" x2="31" y2="13"/>
              <path d="M12 4v6M24 4v6"/>
              <path d="M18 18v6M15 21h6" stroke-width="2"/>
            </g>
          </svg>
        </div>
        <div class="lbl">{{ s.label }}</div>
      </div>
    </div>
    <div class="dots">
      <span class="dot active"></span>
      <span class="dot"></span>
    </div>
  </div>
</template>

<script setup>
import { shortcuts } from '../../data/stocks.js'
</script>

<style scoped>
.wrap {
  padding: 22px 0 14px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 24px;
  padding: 0 8px;
}
.item {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px;
  cursor: pointer;
}
.ic {
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
}
.lbl {
  font-size: calc(13px * var(--font-scale));
  color: #d8dbe0;
  letter-spacing: .5px;
}

.dots {
  display: flex; justify-content: center; gap: 6px;
  margin-top: 16px;
}
.dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--text-mute);
}
.dot.active {
  background: #fff;
  width: 16px;
  border-radius: 3px;
}
</style>
