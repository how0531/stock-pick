<template>
  <div class="mkt">
    <div class="mkt-tabs">
      <div class="mkt-tab" :class="{ active: tab === 'intraday' }" @click="tab = 'intraday'">盤中</div>
      <div class="mkt-tab" :class="{ active: tab === 'afterhours' }" @click="tab = 'afterhours'">盤後</div>
    </div>

    <template v-if="tab === 'intraday'">
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
    </template>

    <template v-else>
      <div class="ah-module">
        <div class="ah-head">
          <div class="ah-title">三大法人合計（上市+上櫃）</div>
          <div class="ah-pill">🔥 土洋對作極端化</div>
        </div>
        <div class="ah-table">
          <div class="ah-th">法人</div>
          <div class="ah-th">買賣超(億)</div>
          <div class="ah-th">定性</div>
          <div class="ah-td"><span class="role-tag role-foreign">外資</span></div>
          <div class="ah-td down">-362.53</div>
          <div class="ah-td"><span class="tag tag-red">巨量賣超</span></div>
          <div class="ah-td"><span class="role-tag role-dealer">自營商</span></div>
          <div class="ah-td down">-45.03</div>
          <div class="ah-td"><span class="tag tag-green">中量賣超</span></div>
          <div class="ah-td"><span class="role-tag role-trust">投信</span></div>
          <div class="ah-td up">+426.69</div>
          <div class="ah-td"><span class="tag tag-red">極端逆向</span></div>
        </div>
      </div>

      <div class="ah-module">
        <div class="ah-head">
          <div class="ah-title">融資券增減（上市）</div>
        </div>
        <div class="mt-table">
          <div class="mt-row">
            <div class="mt-label"><span class="role-tag role-margin">融資</span>餘額增減</div>
            <div class="mt-val down">-125.34 億</div>
            <div class="mt-tag"><span class="tag tag-green">資減</span></div>
          </div>
          <div class="mt-row">
            <div class="mt-label"><span class="role-tag role-short">融券</span>餘額增減</div>
            <div class="mt-val up">+8.92 千張</div>
            <div class="mt-tag"><span class="tag tag-red">券增</span></div>
          </div>
        </div>
      </div>

      <div class="ah-module">
        <div class="ah-head">
          <div class="ah-title-row">
            <span class="role-tag role-retail">散戶</span>
            <span class="ah-title up">小台多空比</span>
          </div>
          <div class="ah-big up">+7.25%</div>
        </div>
        <div class="ah-pills">
          <span class="stat-pill up-bg">散戶多單 32249</span>
          <span class="stat-pill down-bg">散戶空單 29367</span>
        </div>
        <div class="rr-chart">
          <div class="rr-yl">
            <span v-for="y in retailYLeft" :key="'yl'+y">{{ y }}</span>
          </div>
          <svg class="rr-svg" viewBox="0 0 320 180" preserveAspectRatio="none">
            <line v-for="(y, i) in retailGridY" :key="'rg'+i" :x1="0" :x2="320" :y1="y" :y2="y" stroke="var(--line)" stroke-width="0.5" />
            <g>
              <rect v-for="(b, i) in retailBars" :key="'rb'+i"
                :x="i * (320 / retailBars.length) + 1"
                :y="b.y"
                :width="320 / retailBars.length - 2"
                :height="b.h"
                :fill="b.color" />
            </g>
            <polyline :points="retailIdxPath" fill="none" stroke="#1a1a1a" stroke-width="1.4" />
          </svg>
          <div class="rr-yr">
            <span v-for="y in retailYRight" :key="'yr'+y">{{ y }}</span>
          </div>
        </div>
        <div class="rr-xaxis">
          <span>1/5</span><span>2/2</span><span>3/12</span><span>4/13</span><span>5/12</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tab = ref('intraday')

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

const RN = 30
const pctMin = -20
const pctMax = 80
const idxMin = 25000
const idxMax = 45000

function buildRetail() {
  const r = seeded(91)
  const bars = []
  const idx = []
  let lvl = 27000
  for (let i = 0; i < RN; i++) {
    const t = i / (RN - 1)
    let pct
    if (i < 4) pct = -8 + (r() - 0.5) * 10
    else if (i < 10) pct = -3 + (r() - 0.3) * 14
    else if (i < 16) pct = 5 + (r() - 0.5) * 18
    else pct = 20 + r() * 45
    if (i === 7) pct = -14
    if (i === 12) pct = -6
    if (i === 22) pct = 62
    bars.push(pct)
    lvl = lvl + 600 + (r() - 0.3) * 400 + t * 200
    idx.push(lvl)
  }
  idx[RN - 1] = 44100
  return { bars, idx }
}

const retail = buildRetail()

const retailBars = computed(() => {
  const zeroY = 180 - ((0 - pctMin) / (pctMax - pctMin)) * 180
  return retail.bars.map(v => {
    const y = 180 - ((v - pctMin) / (pctMax - pctMin)) * 180
    const top = Math.min(y, zeroY)
    const h = Math.abs(y - zeroY)
    const color = v >= 0 ? 'rgba(255,59,48,0.7)' : 'rgba(0,194,122,0.7)'
    return { y: top, h, color }
  })
})

const retailIdxPath = computed(() => {
  return retail.idx.map((v, i) => {
    const x = (i / (RN - 1)) * 320
    const y = 180 - ((v - idxMin) / (idxMax - idxMin)) * 180
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
})

const retailYLeft = ['45000', '40000', '35000', '30000', '25000']
const retailYRight = ['80%', '55%', '30%', '5%', '-20%']
const retailGridY = [0, 45, 90, 135, 180]
</script>

<style scoped>
.mkt {
  color: var(--text);
  width: 100%;
  max-width: 420px;
  padding: 0 0 8px;
}
.mkt-tabs {
  display: flex; gap: 0; padding: 8px 16px 0;
}
.mkt-tab {
  flex: 1; text-align: center; font-size: 14px;
  padding: 8px 0; color: var(--text-dim); cursor: pointer;
  border-bottom: 2px solid transparent; transition: all .15s;
}
.mkt-tab.active {
  color: #fff; border-bottom-color: var(--up); font-weight: 700;
}

.top {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding: 12px 16px 8px;
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

.ah-module {
  padding: 12px 16px;
  border-top: 1px solid var(--line);
}
.ah-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 10px;
}
.ah-title { font-size: 14px; font-weight: 700; }
.ah-title.up { color: var(--up); }
.ah-pill {
  font-size: 11px; color: var(--up);
  background: rgba(255,59,48,0.15);
  padding: 3px 8px; border-radius: 999px;
}
.ah-big { font-size: 20px; font-weight: 700; }
.ah-big.up { color: var(--up); }

.ah-table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 12px;
}
.ah-th {
  color: var(--text-dim); font-size: 11px;
  padding: 6px 4px; border-bottom: 1px solid var(--line);
}
.ah-td {
  padding: 8px 4px; border-bottom: 1px solid var(--line);
  display: flex; align-items: center;
}
.ah-td.up { color: var(--up); font-weight: 700; }
.ah-td.down { color: var(--down); font-weight: 700; }

.tag {
  font-size: 11px; padding: 2px 6px; border-radius: 4px;
  font-weight: 600;
}
.tag-red { color: var(--up); background: rgba(255,59,48,0.15); }
.tag-green { color: var(--down); background: rgba(0,194,122,0.15); }

.role-tag {
  display: inline-block;
  font-size: 11px; font-weight: 700;
  padding: 2px 7px; border-radius: 4px;
  letter-spacing: 0.3px;
  margin-right: 4px;
}
.role-foreign { color: #4a9eff; background: rgba(74,158,255,0.15); }
.role-trust   { color: #f5c93b; background: rgba(245,201,59,0.15); }
.role-dealer  { color: #b48cff; background: rgba(180,140,255,0.15); }
.role-margin  { color: var(--up); background: rgba(255,59,48,0.15); }
.role-short   { color: var(--down); background: rgba(0,194,122,0.15); }
.role-retail  { color: var(--orange); background: rgba(255,138,61,0.15); }

.ah-title-row { display: flex; align-items: center; gap: 4px; }

.ah-pills {
  display: flex; gap: 8px; margin-bottom: 8px;
}
.stat-pill {
  font-size: 11px; padding: 4px 10px; border-radius: 999px;
  font-weight: 600;
}
.stat-pill.up-bg { color: var(--up); background: rgba(255,59,48,0.15); }
.stat-pill.down-bg { color: var(--down); background: rgba(0,194,122,0.15); }

.rr-chart {
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  height: 120px;
}
.rr-yl, .rr-yr {
  display: flex; flex-direction: column; justify-content: space-between;
  font-size: 9px; color: var(--text-dim);
  padding: 0 4px;
  text-align: right;
}
.rr-yr { text-align: left; }
.rr-svg { width: 100%; height: 120px; }
.rr-xaxis {
  display: flex; justify-content: space-between;
  font-size: 10px; color: var(--text-dim);
  padding: 4px 40px 0 40px;
}

.mt-table {
  display: flex; flex-direction: column;
}
.mt-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid var(--line);
}
.mt-label { font-size: 12px; color: var(--text-dim); }
.mt-val { font-size: 15px; font-weight: 700; }
.mt-val.up { color: var(--up); }
.mt-val.down { color: var(--down); }
.mt-sub {
  font-size: 11px; color: var(--text-dim);
  padding: 4px 0 6px;
  border-bottom: 1px solid var(--line);
}
.mt-table .mt-row:last-of-type { border-bottom: none; }
.mt-table .mt-sub:last-child { border-bottom: none; }
</style>
