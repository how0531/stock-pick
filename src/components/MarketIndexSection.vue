<template>
  <div class="mkt">
    <div class="top">
      <div class="col left">
        <div class="title">加權指數</div>
        <div class="big up">41898</div>
        <div class="chg up"><span class="tri up"></span>108.26 (0.26%)</div>
      </div>
      <div class="col mid">
        <div class="stat"><span class="lab">最高</span><span class="up">42253</span></div>
        <div class="stat"><span class="lab">最低</span><span class="down">41471</span></div>
        <div class="stat"><span class="lab">總量</span><span>13789.8 億</span></div>
        <div class="stat"><span class="lab">估量</span><span>13789.8 億</span></div>
      </div>
      <div class="col right">
        <div class="title">台指近</div>
        <div class="big down">41695</div>
        <div class="chg down"><span class="tri down"></span>274 (-0.65%)</div>
      </div>
    </div>

    <div class="chart-wrap">
      <div class="chart">
        <div class="y-axis">
          <span v-for="y in yLabels" :key="y">{{ y }}</span>
        </div>
        <svg class="svg" viewBox="0 0 360 240" preserveAspectRatio="none">
          <line v-for="(y, i) in gridY" :key="'g'+i" :x1="0" :x2="360" :y1="y" :y2="y" stroke="var(--line)" stroke-width="0.5" />
          <line v-for="(x, i) in gridX" :key="'gx'+i" :x1="x" :x2="x" :y1="0" :y2="180" stroke="var(--line)" stroke-width="0.5" />
          <polyline :points="avgPath" fill="none" stroke="#b8c5d6" stroke-width="1.2" />
          <polyline :points="twPath" fill="none" stroke="var(--orange)" stroke-width="1.2" />
          <polyline :points="idxPath" fill="none" stroke="var(--up)" stroke-width="1.4" />
          <g>
            <rect v-for="(v, i) in volumes" :key="'v'+i"
              :x="i * (360 / volumes.length) + 0.5"
              :y="220 - v"
              :width="360 / volumes.length - 1"
              :height="v"
              fill="#3a6fb5" />
          </g>
          <text x="4" y="195" fill="var(--text-dim)" font-size="9">365.8 億</text>
        </svg>
        <div class="legend">
          <div class="leg"><span class="dot" style="background:var(--up)"></span>加權指數</div>
          <div class="leg"><span class="dot" style="background:#b8c5d6"></span>加權均價</div>
          <div class="leg"><span class="dot" style="background:var(--orange)"></span>台指近</div>
        </div>
      </div>
      <div class="x-axis">
        <span>09</span><span>10</span><span>11</span><span>12</span><span>13</span>
      </div>
    </div>

    <div class="sub">
      <div class="sub-card">
        <div class="sub-name">櫃買指</div>
        <div class="sub-val up">425.71</div>
        <div class="sub-chg up"><span class="tri up"></span>3.70 (0.88%)</div>
      </div>
      <div class="sub-card">
        <div class="sub-name">電子指</div>
        <div class="sub-val up">2723.81</div>
        <div class="sub-chg up"><span class="tri up"></span>15.52 (0.57%)</div>
      </div>
      <div class="sub-card">
        <div class="sub-name">金融指</div>
        <div class="sub-val down">2506.32</div>
        <div class="sub-chg down"><span class="tri down"></span>52.83 (-2.06%)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const N = 80
const yMin = 41100
const yMax = 42400

function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function buildIdx() {
  const r = seeded(7)
  const pts = []
  let v = 41600
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1)
    let trend
    if (t < 0.12) trend = -1200 * t
    else if (t < 0.4) trend = -150 + 1100 * (t - 0.12)
    else if (t < 0.85) trend = 160 + Math.sin(t * 18) * 90 + (t - 0.4) * 80
    else trend = 230 - (t - 0.85) * 900
    const noise = (r() - 0.5) * 60
    v = 41600 + trend + noise
    pts.push(v)
  }
  pts[N - 1] = 41770
  return pts
}

function buildAvg(idx) {
  const out = []
  let sum = 0
  for (let i = 0; i < idx.length; i++) {
    sum += idx[i]
    out.push(sum / (i + 1))
  }
  return out
}

function buildTw(idx) {
  const r = seeded(31)
  return idx.map((v, i) => {
    const offset = -80 + Math.sin(i * 0.4) * 50 + (r() - 0.5) * 40 - i * 1.2
    return v + offset
  })
}

function buildVolumes() {
  const r = seeded(53)
  const out = []
  for (let i = 0; i < N; i++) {
    let h = 4 + r() * 14
    if (i % 11 === 0) h += 6
    out.push(h)
  }
  out[N - 1] = 28
  return out
}

const idxData = buildIdx()
const avgData = buildAvg(idxData)
const twData = buildTw(idxData)
const volumes = buildVolumes()

function toPath(data) {
  return data.map((v, i) => {
    const x = (i / (N - 1)) * 360
    const y = 180 - ((v - yMin) / (yMax - yMin)) * 170
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

const idxPath = computed(() => toPath(idxData))
const avgPath = computed(() => toPath(avgData))
const twPath = computed(() => toPath(twData))

const yLabels = ['42346', '42068', '41790', '41512', '41234']
const gridY = [10, 50, 90, 130, 170]
const gridX = [0, 90, 180, 270, 360]
</script>

<style scoped>
.mkt {
  background: var(--bg-3);
  color: var(--text);
  width: 100%;
  max-width: 420px;
  padding: 12px 0 8px;
}
.top {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding: 0 16px 8px;
  align-items: center;
}
.col { display: flex; flex-direction: column; }
.col.right { align-items: flex-end; }
.title { font-size: 12px; color: var(--text-dim); margin-bottom: 2px; }
.big {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 1.1;
}
.big.up { color: var(--up); }
.big.down { color: var(--down); }
.chg { font-size: 11px; margin-top: 2px; display: flex; align-items: center; gap: 3px; }
.chg.up { color: var(--up); }
.chg.down { color: var(--down); }
.mid { gap: 2px; font-size: 10px; }
.stat { display: flex; justify-content: space-between; gap: 6px; }
.stat .lab { color: var(--text-dim); }
.stat .up { color: var(--up); }
.stat .down { color: var(--down); }

.tri {
  display: inline-block; width: 0; height: 0;
  border-left: 4px solid transparent; border-right: 4px solid transparent;
}
.tri.up { border-bottom: 5px solid var(--up); }
.tri.down { border-top: 5px solid var(--down); }

.chart-wrap { padding: 0 16px; }
.chart {
  position: relative;
  display: grid;
  grid-template-columns: 36px 1fr 50px;
  height: 200px;
}
.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 9px;
  color: var(--text-dim);
  padding: 4px 4px 28px 0;
  text-align: right;
}
.svg {
  width: 100%;
  height: 200px;
}
.legend {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding-left: 6px;
  font-size: 10px;
  color: var(--text-dim);
}
.leg { display: flex; align-items: center; gap: 4px; }
.dot {
  width: 6px; height: 6px; border-radius: 50%; display: inline-block;
}
.x-axis {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-dim);
  padding: 2px 50px 0 36px;
}

.sub {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding: 8px 16px;
}
.sub-card {
  background: var(--bg-2);
  border-radius: 4px;
  padding: 6px 8px;
}
.sub-name { font-size: 11px; color: var(--text-dim); }
.sub-val { font-size: 16px; font-weight: 700; margin-top: 2px; }
.sub-val.up { color: var(--up); }
.sub-val.down { color: var(--down); }
.sub-chg { font-size: 10px; margin-top: 2px; display: flex; align-items: center; gap: 3px; }
.sub-chg.up { color: var(--up); }
.sub-chg.down { color: var(--down); }
</style>
