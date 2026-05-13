<!--
  StatusBar — 頂部假狀態列
  =========================
  用途：模擬 iPhone 狀態列（時間、訊號、5G、電量）。純展示，沒有互動。
  使用位置：App.vue（每頁顯示）。
-->
<template>
  <div class="status">
    <div class="time">19:18 <span class="lock"></span></div>
    <div class="right">
      <div class="signal"><i /><i /><i /><i /></div>
      <span>5G</span>
      <div class="battery"><i /><span>85</span></div>
    </div>
  </div>
</template>

<style scoped>
.status {
  height: 54px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: calc(17px * var(--font-scale));
  font-weight: 600;
  color: #fff;
}
.time { display: flex; align-items: center; gap: 6px; }
.lock {
  width: 14px; height: 14px; border-radius: 3px; background: #fff;
  display: inline-block; position: relative;
}
.lock::before {
  content: ""; position: absolute; inset: 3px 4px; background: var(--bg); border-radius: 1px;
}
.right { display: flex; align-items: center; gap: 6px; font-size: calc(15px * var(--font-scale)); }
.signal { display: flex; align-items: flex-end; gap: 2px; height: 11px; }
.signal i { display: block; width: 3px; background: #fff; border-radius: 1px; }
.signal i:nth-child(1) { height: 4px; }
.signal i:nth-child(2) { height: 6px; }
.signal i:nth-child(3) { height: 8px; }
.signal i:nth-child(4) { height: 11px; }
.battery {
  width: 26px; height: 12px; border: 1.2px solid #fff; border-radius: 3px;
  position: relative; display: flex; align-items: center; padding: 1px;
}
.battery::after {
  content: ""; position: absolute; right: -3px; top: 3px;
  width: 2px; height: 6px; background: #fff; border-radius: 0 1px 1px 0;
}
.battery i { display: block; height: 100%; width: 78%; background: #fff; border-radius: 1px; }
.battery span {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: center; font-size: calc(9px * var(--font-scale)); color: #000; font-weight: 700;
}
</style>
