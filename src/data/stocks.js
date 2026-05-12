export const indices = [
  { name: '加權指', value: '41898.32', change: '108.26', up: true },
  { name: '櫃買指', value: '425.71', change: '3.70', up: true },
]

export const shortCategories = [
  {
    key: 'hot',
    label: '盤中熱門',
    chips: ['短多精選', '成值排行', '量能排行', '周轉排行', '漲幅排行', '跌幅排行', '瞬間量', '量放大股'],
  },
  {
    key: 'chip_rank',
    label: '籌碼排行',
    chips: ['外資排行', '投信排行', '主力排行', '當沖排行'],
  },
  {
    key: 'strategy',
    label: '策略選股',
    chips: ['當沖空', '分數選股', '動能排行'],
  },
]

export const categories = shortCategories

export const swingCategories = [
  {
    key: 'fundamental',
    label: '基本面',
    chips: ['營收創高', '合約負債', 'ROE排行'],
  },
  {
    key: 'technical',
    label: '技術面',
    chips: ['多頭奔放', '股價創高', '急跌抄底'],
  },
  {
    key: 'swing_strategy',
    label: '策略選股',
    chips: ['法人目標價', '即將法說會'],
  },
]

const baseStocks = [
  { name: '台積電',  code: '2330',  price: '2255',   changePct: '+0.89',  volume: '995',  status: '收盤', up: true,  limit: false, pe: '28.5',  eps: '79.12', foreignPct: '72.3', trustPct: '3.8' },
  { name: '南亞科',  code: '2408',  price: '321.0',  changePct: '+6.64',  volume: '672',  status: '收盤', up: true,  limit: false, pe: '15.2',  eps: '21.12', foreignPct: '38.5', trustPct: '6.2' },
  { name: '群聯',    code: '8299',  price: '2725',   changePct: '+2.06',  volume: '401',  status: '收盤', up: true,  limit: false, pe: '22.8',  eps: '119.5', foreignPct: '55.1', trustPct: '8.7' },
  { name: '聯電',    code: '2303',  price: '104.5',  changePct: '+10.00', volume: '383',  status: '收盤', up: true,  limit: true,  pe: '12.6',  eps: '8.29',  foreignPct: '52.8', trustPct: '2.1' },
  { name: '華邦電',  code: '2344',  price: '121.5',  changePct: '+3.40',  volume: '376',  status: '收盤', up: true,  limit: false, pe: '18.3',  eps: '6.64',  foreignPct: '28.9', trustPct: '4.5' },
  { name: '聯發科',  code: '2454',  price: '3700',   changePct: '-4.64',  volume: '359',  status: '收盤', up: false, limit: false, pe: '16.7',  eps: '221.6', foreignPct: '78.2', trustPct: '5.3' },
  { name: '群創',    code: '3481',  price: '35.50',  changePct: '+9.91',  volume: '288',  status: '收盤', up: true,  limit: true,  pe: '8.5',   eps: '4.18',  foreignPct: '22.4', trustPct: '1.9' },
  { name: '台達電',  code: '2308',  price: '2195',   changePct: '-2.23',  volume: '263',  status: '收盤', up: false, limit: false, pe: '32.1',  eps: '68.38', foreignPct: '68.7', trustPct: '7.1' },
  { name: '欣興',    code: '3037',  price: '875',    changePct: '+1.63',  volume: '258',  status: '收盤', up: true,  limit: false, pe: '14.9',  eps: '58.72', foreignPct: '45.6', trustPct: '9.2' },
  { name: '國巨',    code: '2327',  price: '419.5',  changePct: '+7.15',  volume: '256',  status: '收盤', up: true,  limit: false, pe: '11.8',  eps: '35.55', foreignPct: '41.3', trustPct: '5.8' },
  { name: '華通',    code: '2313',  price: '260.0',  changePct: '+7.44',  volume: '237',  status: '收盤', up: true,  limit: false, pe: '13.5',  eps: '19.26', foreignPct: '33.7', trustPct: '3.4' },
  { name: '緯穎',    code: '6669',  price: '5790',   changePct: '+8.43',  volume: '225',  status: '收盤', up: true,  limit: false, pe: '19.4',  eps: '298.5', foreignPct: '62.1', trustPct: '10.3' },
  { name: '光寶科',  code: '2301',  price: '234.5',  changePct: '+4.69',  volume: '217',  status: '收盤', up: true,  limit: false, pe: '17.2',  eps: '13.63', foreignPct: '48.9', trustPct: '4.7' },
  { name: '旺宏',    code: '2337',  price: '153.0',  changePct: '-4.08',  volume: '208',  status: '收盤', up: false, limit: false, pe: '25.3',  eps: '6.05',  foreignPct: '18.6', trustPct: '2.3' },
  { name: '鴻海',    code: '2317',  price: '250.0',  changePct: '-0.79',  volume: '202',  status: '收盤', up: false, limit: false, pe: '10.2',  eps: '24.51', foreignPct: '50.4', trustPct: '3.1' },
]

function sortBy(arr, key, desc = true) {
  return [...arr].sort((a, b) => desc
    ? parseFloat(b[key]) - parseFloat(a[key])
    : parseFloat(a[key]) - parseFloat(b[key])
  )
}

function byAbsPct(desc) {
  return [...baseStocks]
    .filter(s => desc ? s.up : !s.up)
    .sort((a, b) => Math.abs(parseFloat(b.changePct)) - Math.abs(parseFloat(a.changePct)))
}

const stockPool = {
  hot: {
    '短多精選': baseStocks.filter(s => s.up),
    '成值排行': sortBy(baseStocks, 'volume'),
    '量能排行': sortBy(baseStocks, 'volume'),
    '周轉排行': [...baseStocks].reverse(),
    '漲幅排行': sortBy(baseStocks.filter(s => s.up), 'changePct'),
    '跌幅排行': sortBy(baseStocks.filter(s => !s.up), 'changePct', false),
    '瞬間量':   sortBy(baseStocks, 'volume').slice(0, 10),
    '量放大股': sortBy(baseStocks, 'volume').slice(3, 13),
  },
  chip_rank: {
    '外資排行': [baseStocks[0], baseStocks[2], baseStocks[4], baseStocks[5], baseStocks[7], baseStocks[8], baseStocks[10], baseStocks[14]],
    '投信排行': [baseStocks[1], baseStocks[3], baseStocks[6], baseStocks[9], baseStocks[11], baseStocks[12], baseStocks[13]],
    '主力排行': [baseStocks[3], baseStocks[6], baseStocks[1], baseStocks[9], baseStocks[10], baseStocks[11], baseStocks[0]],
    '當沖排行': [baseStocks[1], baseStocks[3], baseStocks[6], baseStocks[13], baseStocks[8], baseStocks[14], baseStocks[0]],
  },
  strategy: {
    '當沖空': baseStocks.filter(s => !s.up),
    '分數選股': [baseStocks[0], baseStocks[2], baseStocks[11], baseStocks[9], baseStocks[4], baseStocks[8], baseStocks[12]],
    '動能排行': [baseStocks[1], baseStocks[3], baseStocks[6], baseStocks[11], baseStocks[10], baseStocks[9], baseStocks[4]],
  },
  fundamental: {
    '營收創高': [baseStocks[0], baseStocks[2], baseStocks[11], baseStocks[8], baseStocks[4], baseStocks[12]],
    '合約負債': [baseStocks[0], baseStocks[5], baseStocks[7], baseStocks[2], baseStocks[11], baseStocks[9]],
    'ROE排行': [baseStocks[0], baseStocks[11], baseStocks[2], baseStocks[5], baseStocks[7], baseStocks[8]],
  },
  technical: {
    '多頭奔放': [baseStocks[1], baseStocks[3], baseStocks[6], baseStocks[10], baseStocks[4], baseStocks[9]],
    '股價創高': [baseStocks[3], baseStocks[6], baseStocks[1], baseStocks[11], baseStocks[10], baseStocks[4]],
    '急跌抄底': [baseStocks[5], baseStocks[7], baseStocks[13], baseStocks[14], baseStocks[5], baseStocks[13]],
  },
  swing_strategy: {
    '法人目標價': [baseStocks[0], baseStocks[2], baseStocks[5], baseStocks[7], baseStocks[11], baseStocks[8]],
    '即將法說會': [baseStocks[0], baseStocks[5], baseStocks[14], baseStocks[7], baseStocks[2], baseStocks[12]],
  },
}

export function getStocks(categoryKey, chip) {
  return (stockPool[categoryKey]?.[chip] ?? []).slice(0, 6)
}

export const industryCategories = [
  { key: 'listed', label: '上市櫃' },
  { key: 'sub', label: '細產業' },
  { key: 'theme', label: '主題' },
]

export const industrySortChips = ['漲幅', '跌幅', '營收', '量比', '買進大']

const industryPool = {
  sub: {
    '漲幅': [
      { name: 'MLCC指標', changePct: '+6.71', volume: '376.1' },
      { name: '利基型記憶體IC指標', changePct: '+4.46', volume: '223.7' },
      { name: '光固化材料指標', changePct: '+4.09', volume: '36.05' },
      { name: 'PCB設備指標', changePct: '+4.00', volume: '100.6' },
      { name: '砷化鎵相關指標', changePct: '+3.55', volume: '337.9' },
      { name: 'USB IC指標', changePct: '+3.52', volume: '201.1' },
      { name: '半導體封測材料指標', changePct: '+3.26', volume: '187.2' },
      { name: '面板設備指標', changePct: '+3.16', volume: '31.78' },
      { name: '被動元件指標', changePct: '+3.11', volume: '511.6' },
      { name: '電池材料相關指標', changePct: '+2.95', volume: '21.70' },
      { name: '分離式元件指標', changePct: '+2.88', volume: '144.5' },
    ],
    '跌幅': [
      { name: '太陽能電池指標', changePct: '-3.20', volume: '45.2' },
      { name: '面板指標', changePct: '-2.85', volume: '312.4' },
      { name: 'LED指標', changePct: '-2.10', volume: '28.6' },
      { name: '觸控面板指標', changePct: '-1.95', volume: '15.8' },
      { name: '電源供應器指標', changePct: '-1.72', volume: '67.3' },
      { name: '光碟片指標', changePct: '-1.55', volume: '8.2' },
    ],
    '營收': [
      { name: '半導體指標', changePct: '+1.20', volume: '2350' },
      { name: '被動元件指標', changePct: '+3.11', volume: '511.6' },
      { name: '砷化鎵相關指標', changePct: '+3.55', volume: '337.9' },
      { name: 'MLCC指標', changePct: '+6.71', volume: '376.1' },
      { name: '利基型記憶體IC指標', changePct: '+4.46', volume: '223.7' },
      { name: 'USB IC指標', changePct: '+3.52', volume: '201.1' },
    ],
    '量比': [
      { name: 'MLCC指標', changePct: '+6.71', volume: '376.1' },
      { name: '光固化材料指標', changePct: '+4.09', volume: '36.05' },
      { name: 'PCB設備指標', changePct: '+4.00', volume: '100.6' },
      { name: '砷化鎵相關指標', changePct: '+3.55', volume: '337.9' },
      { name: '面板設備指標', changePct: '+3.16', volume: '31.78' },
      { name: '分離式元件指標', changePct: '+2.88', volume: '144.5' },
    ],
    '買進大': [
      { name: '半導體封測材料指標', changePct: '+3.26', volume: '187.2' },
      { name: '被動元件指標', changePct: '+3.11', volume: '511.6' },
      { name: 'MLCC指標', changePct: '+6.71', volume: '376.1' },
      { name: 'USB IC指標', changePct: '+3.52', volume: '201.1' },
      { name: '利基型記憶體IC指標', changePct: '+4.46', volume: '223.7' },
      { name: '電池材料相關指標', changePct: '+2.95', volume: '21.70' },
    ],
  },
  listed: {
    '漲幅': [
      { name: '電子零組件', changePct: '+3.85', volume: '1250' },
      { name: '半導體業', changePct: '+2.94', volume: '3580' },
      { name: '光電業', changePct: '+2.41', volume: '620' },
      { name: '通信網路業', changePct: '+1.88', volume: '340' },
      { name: '電腦及週邊', changePct: '+1.55', volume: '890' },
      { name: '其他電子業', changePct: '+1.32', volume: '215' },
    ],
    '跌幅': [
      { name: '航運業', changePct: '-2.15', volume: '430' },
      { name: '鋼鐵業', changePct: '-1.80', volume: '125' },
      { name: '水泥業', changePct: '-1.42', volume: '58' },
      { name: '食品業', changePct: '-0.95', volume: '72' },
      { name: '紡織業', changePct: '-0.78', volume: '45' },
      { name: '塑膠業', changePct: '-0.65', volume: '96' },
    ],
    '營收': [
      { name: '半導體業', changePct: '+2.94', volume: '3580' },
      { name: '電子零組件', changePct: '+3.85', volume: '1250' },
      { name: '電腦及週邊', changePct: '+1.55', volume: '890' },
      { name: '光電業', changePct: '+2.41', volume: '620' },
      { name: '航運業', changePct: '-2.15', volume: '430' },
      { name: '通信網路業', changePct: '+1.88', volume: '340' },
    ],
    '量比': [
      { name: '電子零組件', changePct: '+3.85', volume: '1250' },
      { name: '光電業', changePct: '+2.41', volume: '620' },
      { name: '半導體業', changePct: '+2.94', volume: '3580' },
      { name: '通信網路業', changePct: '+1.88', volume: '340' },
      { name: '電腦及週邊', changePct: '+1.55', volume: '890' },
      { name: '其他電子業', changePct: '+1.32', volume: '215' },
    ],
    '買進大': [
      { name: '半導體業', changePct: '+2.94', volume: '3580' },
      { name: '電子零組件', changePct: '+3.85', volume: '1250' },
      { name: '光電業', changePct: '+2.41', volume: '620' },
      { name: '電腦及週邊', changePct: '+1.55', volume: '890' },
      { name: '通信網路業', changePct: '+1.88', volume: '340' },
      { name: '其他電子業', changePct: '+1.32', volume: '215' },
    ],
  },
  theme: {
    '漲幅': [
      { name: 'AI伺服器', changePct: '+5.12', volume: '1820' },
      { name: 'HBM概念', changePct: '+4.38', volume: '950' },
      { name: '先進封裝', changePct: '+3.75', volume: '680' },
      { name: '矽光子', changePct: '+3.20', volume: '245' },
      { name: 'CoWoS概念', changePct: '+2.95', volume: '520' },
      { name: '低軌衛星', changePct: '+2.68', volume: '178' },
    ],
    '跌幅': [
      { name: '元宇宙', changePct: '-2.80', volume: '85' },
      { name: '電動車', changePct: '-1.92', volume: '320' },
      { name: '綠能概念', changePct: '-1.55', volume: '142' },
      { name: '5G概念', changePct: '-1.20', volume: '210' },
      { name: 'NFT概念', changePct: '-0.88', volume: '32' },
      { name: '生技新藥', changePct: '-0.65', volume: '155' },
    ],
    '營收': [
      { name: 'AI伺服器', changePct: '+5.12', volume: '1820' },
      { name: 'HBM概念', changePct: '+4.38', volume: '950' },
      { name: '先進封裝', changePct: '+3.75', volume: '680' },
      { name: 'CoWoS概念', changePct: '+2.95', volume: '520' },
      { name: '電動車', changePct: '-1.92', volume: '320' },
      { name: '矽光子', changePct: '+3.20', volume: '245' },
    ],
    '量比': [
      { name: 'AI伺服器', changePct: '+5.12', volume: '1820' },
      { name: '矽光子', changePct: '+3.20', volume: '245' },
      { name: 'HBM概念', changePct: '+4.38', volume: '950' },
      { name: '低軌衛星', changePct: '+2.68', volume: '178' },
      { name: '先進封裝', changePct: '+3.75', volume: '680' },
      { name: 'CoWoS概念', changePct: '+2.95', volume: '520' },
    ],
    '買進大': [
      { name: 'AI伺服器', changePct: '+5.12', volume: '1820' },
      { name: 'HBM概念', changePct: '+4.38', volume: '950' },
      { name: '先進封裝', changePct: '+3.75', volume: '680' },
      { name: 'CoWoS概念', changePct: '+2.95', volume: '520' },
      { name: '矽光子', changePct: '+3.20', volume: '245' },
      { name: '低軌衛星', changePct: '+2.68', volume: '178' },
    ],
  },
}

function transformByPeriod(items, period, sortChip) {
  if (period === 'today') return items
  const transformed = items.map((item, i) => {
    const basePct = parseFloat(item.changePct)
    const baseVol = parseFloat(item.volume)
    let pct, vol
    if (period === 'yesterday') {
      pct = basePct * 0.7 + (i % 3 - 1) * 0.3
      vol = baseVol * (1 + (i % 2 === 0 ? 0.15 : -0.15))
    } else {
      pct = basePct * 2.3 + (i % 2 === 0 ? 0.5 : -0.2)
      vol = baseVol * 1.4
    }
    const sign = pct >= 0 ? '+' : ''
    return { ...item, changePct: sign + pct.toFixed(2), volume: vol.toFixed(1).replace(/\.0$/, '') }
  })
  const desc = sortChip !== '跌幅'
  transformed.sort((a, b) => {
    const va = Math.abs(parseFloat(a.changePct))
    const vb = Math.abs(parseFloat(b.changePct))
    return desc ? vb - va : va - vb
  })
  return transformed
}

export function getIndustries(catKey, sortChip, period = 'today') {
  const base = industryPool[catKey]?.[sortChip] ?? []
  return transformByPeriod(base, period, sortChip)
}

export function getIndustryStocks(industryName) {
  let hash = 0
  for (let i = 0; i < industryName.length; i++) {
    hash = ((hash << 5) - hash) + industryName.charCodeAt(i)
    hash |= 0
  }
  const count = 6 + (Math.abs(hash) % 4)
  const shuffled = [...baseStocks].sort((a, b) => {
    const ha = ((hash >>> 0) * 31 + a.code.charCodeAt(0)) & 0x7fffffff
    const hb = ((hash >>> 0) * 31 + b.code.charCodeAt(0)) & 0x7fffffff
    return ha - hb
  })
  return shuffled.slice(0, count)
}

export const marketDistribution = {
  listed: {            // 上市
    limitUp: 37, monthHigh: 103, monthLow: 133, limitDown: 1,
    buckets: [
      { label: '>5%',    count: 29,  type: 'up' },
      { label: '3~5%',   count: 55,  type: 'up' },
      { label: '2~3%',   count: 41,  type: 'up' },
      { label: '1~2%',   count: 65,  type: 'up' },
      { label: '0~1%',   count: 89,  type: 'up' },
      { label: '0',      count: 63,  type: 'flat' },
      { label: '0~-1%',  count: 296, type: 'down' },
      { label: '-1~-2%', count: 229, type: 'down' },
      { label: '-2~-3%', count: 113, type: 'down' },
      { label: '-3~-5%', count: 63,  type: 'down' },
      { label: '<-5%',   count: 19,  type: 'down' },
    ],
    totalUp: 279, totalFlat: 63, totalDown: 720,
  },
  otc: {               // 上櫃
    limitUp: 22, monthHigh: 68, monthLow: 91, limitDown: 2,
    buckets: [
      { label: '>5%',    count: 18,  type: 'up' },
      { label: '3~5%',   count: 32,  type: 'up' },
      { label: '2~3%',   count: 28,  type: 'up' },
      { label: '1~2%',   count: 41,  type: 'up' },
      { label: '0~1%',   count: 56,  type: 'up' },
      { label: '0',      count: 38,  type: 'flat' },
      { label: '0~-1%',  count: 178, type: 'down' },
      { label: '-1~-2%', count: 152, type: 'down' },
      { label: '-2~-3%', count: 74,  type: 'down' },
      { label: '-3~-5%', count: 41,  type: 'down' },
      { label: '<-5%',   count: 12,  type: 'down' },
    ],
    totalUp: 175, totalFlat: 38, totalDown: 457,
  },
  top100: {            // 百大權值股
    limitUp: 5, monthHigh: 18, monthLow: 9, limitDown: 0,
    buckets: [
      { label: '>5%',    count: 4,  type: 'up' },
      { label: '3~5%',   count: 8,  type: 'up' },
      { label: '2~3%',   count: 7,  type: 'up' },
      { label: '1~2%',   count: 11, type: 'up' },
      { label: '0~1%',   count: 14, type: 'up' },
      { label: '0',      count: 5,  type: 'flat' },
      { label: '0~-1%',  count: 18, type: 'down' },
      { label: '-1~-2%', count: 15, type: 'down' },
      { label: '-2~-3%', count: 9,  type: 'down' },
      { label: '-3~-5%', count: 6,  type: 'down' },
      { label: '<-5%',   count: 3,  type: 'down' },
    ],
    totalUp: 44, totalFlat: 5, totalDown: 51,
  },
}

export const bottomNavItems = [
  { label: '總覽', key: 'overview' },
  { label: '選股', key: 'stock-pick' },
  { label: '下單匣', key: 'order' },
  { label: '自選', key: 'watchlist' },
  { label: '帳務', key: 'account' },
]

export const inventory = {
  totalValue: '*****',
  pnl: '***',
  hidden: true,
  taxLabel: '含息、含稅',
  cells: [
    { kind: 'combined', items: [
      { label: '今日\n委託', value: '*', unit: '筆' },
      { label: '今日\n成交', value: '*', unit: '筆' },
    ]},
    { label: '今日\n已實', value: '***' },
    { label: '近日\n交割', value: '***' },
    { label: '今當沖\n已實現', value: '***' },
  ],
}

export const shortcuts = [
  { key: 'fengstock', label: '豐存台股', icon: 'piggy' },
  { key: 'global',    label: '國際指數', icon: 'globe' },
  { key: 'lottery',   label: '股票抽籤', icon: 'note' },
  { key: 'smartord',  label: '智慧下單', icon: 'tap' },
  { key: 'news',      label: '投資早報', icon: 'mic' },
  { key: 'lend',      label: '借券專區', icon: 'handgive' },
  { key: 'loan',      label: '借貸專區', icon: 'handcoin' },
  { key: 'calendar',  label: '財經日曆', icon: 'cal' },
]

export const focusTabs = [
  { key: 'market', label: '市場焦點股' },
  { key: 'strong', label: '強勢族群' },
  { key: 'weak',   label: '弱勢族群' },
]

export const focusGroups = {
  market: [
    {
      name: '台積電供應鏈',
      stocks: [
        { name: '台積電',  code: '2330', status: '收盤', price: '2255',   change: '19.80', changePct: '+0.89', bidQty: 215, volume: '99500', up: true,  bidUp: true  },
        { name: '聯發科',  code: '2454', status: '收盤', price: '3700',   change: '180.0', changePct: '-4.64', bidQty: 8,   volume: '35900', up: false, bidUp: false },
        { name: '欣興',    code: '3037', status: '收盤', price: '875',    change: '14.00', changePct: '+1.63', bidQty: 25,  volume: '25800', up: true,  bidUp: false },
        { name: '華邦電',  code: '2344', status: '收盤', price: '121.5',  change: '4.00',  changePct: '+3.40', bidQty: 102, volume: '37600', up: true,  bidUp: true  },
        { name: '鴻海',    code: '2317', status: '收盤', price: '250.0',  change: '2.00',  changePct: '-0.79', bidQty: 50,  volume: '20200', up: false, bidUp: true  },
      ],
    },
    {
      name: '電子權值',
      stocks: [
        { name: '聯電',    code: '2303', status: '收盤', price: '104.5',  change: '9.50',  changePct: '+10.00', bidQty: 350, volume: '38300', up: true,  bidUp: true  },
        { name: '南亞科',  code: '2408', status: '收盤', price: '321.0',  change: '20.00', changePct: '+6.64',  bidQty: 18,  volume: '67200', up: true,  bidUp: false },
        { name: '群聯',    code: '8299', status: '收盤', price: '2725',   change: '55.00', changePct: '+2.06',  bidQty: 4,   volume: '40100', up: true,  bidUp: false },
        { name: '光寶科',  code: '2301', status: '收盤', price: '234.5',  change: '10.50', changePct: '+4.69',  bidQty: 30,  volume: '21700', up: true,  bidUp: true  },
      ],
    },
    {
      name: '金融權值',
      stocks: [
        { name: '富邦金',  code: '2881', status: '收盤', price: '88.5',   change: '0.40',  changePct: '+0.45', bidQty: 200, volume: '15300', up: true,  bidUp: true  },
        { name: '國泰金',  code: '2882', status: '收盤', price: '67.8',   change: '0.20',  changePct: '-0.29', bidQty: 80,  volume: '12100', up: false, bidUp: false },
        { name: '中信金',  code: '2891', status: '收盤', price: '42.5',   change: '0.15',  changePct: '+0.35', bidQty: 120, volume: '8500',  up: true,  bidUp: true  },
      ],
    },
  ],
  strong: [
    {
      name: '5G基礎建設',
      stocks: [
        { name: '台達電',  code: '2308', status: '收盤', price: '2195.00', change: '50.00', changePct: '-2.23', bidQty: 43, volume: '11931', up: false, bidUp: true  },
        { name: '波若威',  code: '3163', status: '收盤', price: '1065.00', change: '25.00', changePct: '+2.40', bidQty: 2,  volume: '484',   up: true,  bidUp: false },
        { name: '穩懋',    code: '3105', status: '收盤', price: '512.00',  change: '14.00', changePct: '-2.66', bidQty: 77, volume: '31109', up: false, bidUp: false },
        { name: '文曄',    code: '3036', status: '收盤', price: '275.50',  change: '11.00', changePct: '+4.16', bidQty: 12, volume: '42828', up: true,  bidUp: false },
        { name: '瑞昱',    code: '2379', status: '收盤', price: '555.00',  change: '29.00', changePct: '-4.97', bidQty: 16, volume: '6098',  up: false, bidUp: false },
      ],
    },
    {
      name: 'NBR乳膠',
      stocks: [
        { name: '台橡',    code: '2103', status: '收盤', price: '34.5',  change: '1.20', changePct: '+3.60', bidQty: 88,  volume: '5230',  up: true, bidUp: true  },
        { name: '南帝',    code: '2108', status: '收盤', price: '52.8',  change: '2.80', changePct: '+5.60', bidQty: 32,  volume: '8910',  up: true, bidUp: true  },
        { name: '亞東先進', code: '5340', status: '收盤', price: '17.3', change: '0.60', changePct: '+3.59', bidQty: 410, volume: '15670', up: true, bidUp: false },
      ],
    },
    {
      name: '雲端運算概念',
      stocks: [
        { name: '緯穎',    code: '6669', status: '收盤', price: '5790',  change: '450.00', changePct: '+8.43', bidQty: 3,   volume: '22500', up: true, bidUp: false },
        { name: '緯創',    code: '3231', status: '收盤', price: '112.0', change: '5.00',   changePct: '+4.67', bidQty: 110, volume: '46200', up: true, bidUp: true  },
        { name: '廣達',    code: '2382', status: '收盤', price: '298.5', change: '12.50',  changePct: '+4.37', bidQty: 60,  volume: '32400', up: true, bidUp: false },
        { name: '英業達',  code: '2356', status: '收盤', price: '52.4',  change: '2.20',   changePct: '+4.38', bidQty: 220, volume: '28100', up: true, bidUp: true  },
      ],
    },
  ],
  weak: [
    {
      name: '太陽能',
      stocks: [
        { name: '茂迪',    code: '6244', status: '收盤', price: '21.5',  change: '0.85', changePct: '-3.80', bidQty: 35,  volume: '4520',  up: false, bidUp: false },
        { name: '元晶',    code: '6443', status: '收盤', price: '12.8',  change: '0.60', changePct: '-4.48', bidQty: 88,  volume: '8910',  up: false, bidUp: false },
        { name: '中美晶',  code: '5483', status: '收盤', price: '155.0', change: '7.50', changePct: '-4.61', bidQty: 12,  volume: '6210',  up: false, bidUp: true  },
      ],
    },
    {
      name: '航運業',
      stocks: [
        { name: '長榮',    code: '2603', status: '收盤', price: '162.5', change: '5.00', changePct: '-2.99', bidQty: 95,  volume: '38500', up: false, bidUp: false },
        { name: '陽明',    code: '2609', status: '收盤', price: '58.4',  change: '2.10', changePct: '-3.47', bidQty: 280, volume: '52100', up: false, bidUp: false },
        { name: '萬海',    code: '2615', status: '收盤', price: '74.2',  change: '3.30', changePct: '-4.26', bidQty: 65,  volume: '19200', up: false, bidUp: true  },
      ],
    },
    {
      name: '面板雙虎',
      stocks: [
        { name: '友達',    code: '2409', status: '收盤', price: '17.45', change: '0.55', changePct: '-3.06', bidQty: 520, volume: '85400', up: false, bidUp: false },
        { name: '群創',    code: '3481', status: '收盤', price: '35.50', change: '1.50', changePct: '-4.05', bidQty: 320, volume: '67200', up: false, bidUp: true  },
      ],
    },
  ],
}
