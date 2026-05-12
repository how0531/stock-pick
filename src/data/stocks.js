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
  {
    key: 'follow',
    label: '跟單策略',
    chips: ['00981加碼', '00403加碼', '00982加碼'],
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
  {
    key: 'swing_follow',
    label: '跟單策略',
    chips: ['投信大買'],
  },
]

const foreignTopStocks = [
  { name: '聯鈞',     code: '3450', price: '470.5', changePct: '+9.93', volume: '91.2',  status: '收盤', up: true,  limit: false, pe: '18.6', eps: '25.3',   foreignPct: '4.37', trustPct: '1.2' },
  { name: '強茂',     code: '2481', price: '115.5', changePct: '+5.96', volume: '71.2',  status: '收盤', up: true,  limit: false, pe: '14.2', eps: '8.13',   foreignPct: '4.37', trustPct: '2.4' },
  { name: '凌航',     code: '3135', price: '213.5', changePct: '+9.77', volume: '12.9',  status: '收盤', up: true,  limit: false, pe: '19.8', eps: '10.78',  foreignPct: '4.03', trustPct: '1.8' },
  { name: '昇貿',     code: '3305', price: '128.5', changePct: '+9.83', volume: '29.0',  status: '收盤', up: true,  limit: false, pe: '16.5', eps: '7.79',   foreignPct: '3.93', trustPct: '2.1' },
  { name: '新盛力',   code: '4931', price: '202.5', changePct: '+8.29', volume: '65.4',  status: '收盤', up: true,  limit: false, pe: '21.3', eps: '9.51',   foreignPct: '3.93', trustPct: '2.4' },
  { name: '正凌',     code: '8147', price: '183',   changePct: '+7.96', volume: '8.1',   status: '收盤', up: true,  limit: false, pe: '20.4', eps: '8.97',   foreignPct: '3.81', trustPct: '1.5' },
  { name: '譜瑞-KY',  code: '4966', price: '761',   changePct: '+3.54', volume: '122.8', status: '收盤', up: true,  limit: false, pe: '22.5', eps: '33.82',  foreignPct: '3.65', trustPct: '3.29' },
  { name: '康普',     code: '4739', price: '101',   changePct: '+5.76', volume: '15.2',  status: '收盤', up: true,  limit: false, pe: '15.8', eps: '6.39',   foreignPct: '3.22', trustPct: '1.7' },
  { name: '飛捷',     code: '6206', price: '140',   changePct: '+7.28', volume: '13.6',  status: '收盤', up: true,  limit: false, pe: '17.2', eps: '8.14',   foreignPct: '3.01', trustPct: '1.4' },
  { name: '沛亨',     code: '6291', price: '518',   changePct: '+9.86', volume: '11.3',  status: '收盤', up: true,  limit: false, pe: '19.6', eps: '26.43',  foreignPct: '3.01', trustPct: '2.0' },
]

const trustTopStocks = [
  { name: '譜瑞-KY',  code: '4966', price: '761',   changePct: '+3.54', volume: '122.8', status: '收盤', up: true,  limit: false, pe: '22.5', eps: '33.82',  foreignPct: '3.65', trustPct: '3.29' },
  { name: '緯穎',     code: '6669', price: '5790',  changePct: '+8.43', volume: '244',   status: '收盤', up: true,  limit: false, pe: '19.4', eps: '298.5',  foreignPct: '62.1', trustPct: '0.87' },
  { name: '文曄',     code: '3036', price: '275.5', changePct: '+4.16', volume: '119',   status: '收盤', up: true,  limit: false, pe: '13.2', eps: '20.87',  foreignPct: '38.4', trustPct: '0.73' },
  { name: '精測',     code: '6510', price: '3860',  changePct: '+1.85', volume: '40.2',  status: '收盤', up: true,  limit: false, pe: '28.4', eps: '135.92', foreignPct: '32.8', trustPct: '0.63' },
  { name: '華新科',   code: '2492', price: '188.5', changePct: '+9.91', volume: '77.9',  status: '收盤', up: true,  limit: true,  pe: '14.7', eps: '12.83',  foreignPct: '28.6', trustPct: '0.59' },
  { name: '高力',     code: '8996', price: '1055',  changePct: '0.00',  volume: '30.5',  status: '收盤', up: true,  limit: false, pe: '25.3', eps: '41.70',  foreignPct: '18.2', trustPct: '0.59' },
  { name: '南電',     code: '8046', price: '900',   changePct: '-0.88', volume: '141.4', status: '收盤', up: false, limit: false, pe: '21.7', eps: '41.47',  foreignPct: '45.8', trustPct: '0.56' },
  { name: '健策',     code: '3653', price: '3920',  changePct: '-2.37', volume: '138.1', status: '收盤', up: false, limit: false, pe: '24.1', eps: '162.66', foreignPct: '36.5', trustPct: '0.4' },
  { name: '群聯',     code: '8299', price: '2725',  changePct: '+2.06', volume: '424',   status: '收盤', up: true,  limit: false, pe: '22.8', eps: '119.5',  foreignPct: '55.1', trustPct: '0.35' },
  { name: '勤誠',     code: '8210', price: '1550',  changePct: '-0.32', volume: '76.8',  status: '收盤', up: false, limit: false, pe: '18.6', eps: '83.33',  foreignPct: '24.7', trustPct: '0.35' },
  { name: '祥碩',     code: '5269', price: '1525',  changePct: '+9.71', volume: '84.2',  status: '收盤', up: true,  limit: false, pe: '26.4', eps: '57.77',  foreignPct: '42.3', trustPct: '0.32' },
  { name: '創意',     code: '3443', price: '5570',  changePct: '-2.79', volume: '145.7', status: '收盤', up: false, limit: false, pe: '32.5', eps: '171.38', foreignPct: '38.9', trustPct: '0.32' },
]

const scoreStocks = [
  { name: '技嘉',    code: '2376', price: '321',  changePct: '-1.08', volume: '95.4', status: '收盤', up: false, limit: false, pe: '17.8', eps: '18.03', foreignPct: '32.5', trustPct: '3.6' },
  { name: '聯亞',    code: '3081', price: '3055', changePct: '+9.89', volume: '78.6', status: '收盤', up: true,  limit: false, pe: '24.6', eps: '124.18',foreignPct: '18.4', trustPct: '2.7' },
  { name: '中磊',    code: '5388', price: '88.2', changePct: '+1.03', volume: '24.5', status: '收盤', up: true,  limit: false, pe: '15.4', eps: '5.73',  foreignPct: '21.6', trustPct: '2.4' },
  { name: '信昌電',  code: '6173', price: '147',  changePct: '+9.70', volume: '32.7', status: '收盤', up: true,  limit: false, pe: '18.2', eps: '8.08',  foreignPct: '14.8', trustPct: '1.5' },
  { name: '元晶',    code: '6443', price: '41.5', changePct: '+0.24', volume: '12.8', status: '收盤', up: true,  limit: false, pe: '16.5', eps: '2.52',  foreignPct: '8.6',  trustPct: '0.9' },
  { name: '緯穎',    code: '6669', price: '5790', changePct: '+8.43', volume: '225',  status: '收盤', up: true,  limit: false, pe: '19.4', eps: '298.5', foreignPct: '62.1', trustPct: '10.3' },
  { name: '元太',    code: '8069', price: '195.5',changePct: '+9.83', volume: '124',  status: '收盤', up: true,  limit: false, pe: '21.5', eps: '9.10',  foreignPct: '52.8', trustPct: '3.2' },
]

const dayShortStocks = [
  { name: '華新科', code: '2492', price: '188.5', changePct: '+9.91', volume: '77.9', status: '收盤', up: true, limit: true,  pe: '14.7', eps: '12.83', foreignPct: '28.6', trustPct: '0.59' },
  { name: '智原',   code: '3035', price: '208.5', changePct: '+6.65', volume: '42.5', status: '收盤', up: true, limit: false, pe: '21.5', eps: '9.70',  foreignPct: '32.1', trustPct: '3.4' },
  { name: '達邁',   code: '3645', price: '107.5', changePct: '+6.44', volume: '18.6', status: '收盤', up: true, limit: false, pe: '17.4', eps: '6.18',  foreignPct: '15.2', trustPct: '1.7' },
]

const follow982Stocks = [
  { name: '昇達科',  code: '3491', price: '1765', changePct: '-3.02', volume: '85.6', status: '收盤', up: false, limit: false, pe: '24.8', eps: '71.17', foreignPct: '32.4', trustPct: '4.2' },
  { name: '立隆電',  code: '2472', price: '223',  changePct: '-0.89', volume: '32.4', status: '收盤', up: false, limit: false, pe: '14.5', eps: '15.38', foreignPct: '18.6', trustPct: '2.4' },
]

const follow981Stocks = [
  { name: '緯穎',     code: '6669', price: '5790', changePct: '+8.43', volume: '225',  status: '收盤', up: true,  limit: false, pe: '19.4', eps: '298.5', foreignPct: '62.1', trustPct: '10.3' },
  { name: '台積電',   code: '2330', price: '2255', changePct: '+0.89', volume: '995',  status: '收盤', up: true,  limit: false, pe: '28.5', eps: '79.12', foreignPct: '72.3', trustPct: '3.8' },
  { name: '日月光投控',code: '3711', price: '555',  changePct: '+3.35', volume: '180',  status: '收盤', up: true,  limit: false, pe: '14.8', eps: '37.50', foreignPct: '48.2', trustPct: '5.4' },
  { name: '大立光',   code: '3008', price: '2795', changePct: '+9.82', volume: '215',  status: '收盤', up: true,  limit: false, pe: '23.8', eps: '117.4', foreignPct: '47.6', trustPct: '5.4' },
  { name: '華通',     code: '2313', price: '260',  changePct: '+7.44', volume: '237',  status: '收盤', up: true,  limit: false, pe: '13.5', eps: '19.26', foreignPct: '33.7', trustPct: '3.4' },
  { name: '欣興',     code: '3037', price: '875',  changePct: '+1.63', volume: '258',  status: '收盤', up: true,  limit: false, pe: '14.9', eps: '58.72', foreignPct: '45.6', trustPct: '9.2' },
  { name: '奇鋐',     code: '3017', price: '2520', changePct: '-1.37', volume: '156',  status: '收盤', up: false, limit: false, pe: '22.4', eps: '112.5', foreignPct: '38.5', trustPct: '4.6' },
]

const dayTradingStocks = [
  { name: '凱美',    code: '2375', price: '94.8',  changePct: '+3.61', volume: '54',   status: '收盤', up: true,  limit: false, pe: '15.6', eps: '6.07',  foreignPct: '22.8', trustPct: '3.1' },
  { name: '映泰',    code: '2399', price: '46.45', changePct: '+3.68', volume: '67',   status: '收盤', up: true,  limit: false, pe: '19.8', eps: '2.35',  foreignPct: '12.4', trustPct: '0.9' },
  { name: '立隆電',  code: '2472', price: '223',   changePct: '-0.89', volume: '32.4', status: '收盤', up: false, limit: false, pe: '14.5', eps: '15.38', foreignPct: '18.6', trustPct: '2.4' },
  { name: '晶豪科',  code: '3006', price: '220',   changePct: '-0.90', volume: '28.7', status: '收盤', up: false, limit: false, pe: '16.8', eps: '13.10', foreignPct: '15.2', trustPct: '1.7' },
  { name: '順達',    code: '3211', price: '402',   changePct: '-0.25', volume: '45.2', status: '收盤', up: false, limit: false, pe: '17.4', eps: '23.10', foreignPct: '21.5', trustPct: '2.8' },
  { name: '精材',    code: '3374', price: '255.5', changePct: '+2.61', volume: '48',   status: '收盤', up: true,  limit: false, pe: '18.2', eps: '14.04', foreignPct: '35.6', trustPct: '4.2' },
  { name: '新唐',    code: '4919', price: '181',   changePct: '-1.63', volume: '36.8', status: '收盤', up: false, limit: false, pe: '15.7', eps: '11.53', foreignPct: '24.3', trustPct: '2.6' },
  { name: '新盛力',  code: '4931', price: '202.5', changePct: '+8.29', volume: '65.4', status: '收盤', up: true,  limit: false, pe: '21.3', eps: '9.51',  foreignPct: '3.93', trustPct: '2.4' },
  { name: '鈺創',    code: '5351', price: '83.8',  changePct: '+4.62', volume: '44.8', status: '收盤', up: true,  limit: false, pe: '24.7', eps: '3.39',  foreignPct: '15.2', trustPct: '1.8' },
  { name: '台半',    code: '5425', price: '81.1',  changePct: '+1.00', volume: '35.7', status: '收盤', up: true,  limit: false, pe: '13.9', eps: '5.84',  foreignPct: '24.6', trustPct: '2.2' },
  { name: '康舒',    code: '6282', price: '56',    changePct: '+1.08', volume: '38',   status: '收盤', up: true,  limit: false, pe: '17.4', eps: '3.22',  foreignPct: '20.9', trustPct: '1.5' },
  { name: '啟碁',    code: '6285', price: '282',   changePct: '+8.88', volume: '186',  status: '收盤', up: true,  limit: false, pe: '16.4', eps: '17.20', foreignPct: '42.1', trustPct: '5.6' },
  { name: '統新',    code: '6426', price: '265.5', changePct: '+2.12', volume: '42',   status: '收盤', up: true,  limit: false, pe: '20.5', eps: '12.95', foreignPct: '28.3', trustPct: '2.7' },
  { name: '惠特',    code: '6706', price: '168.5', changePct: '0.00',  volume: '12.5', status: '收盤', up: true,  limit: false, pe: '22.8', eps: '7.39',  foreignPct: '14.6', trustPct: '1.4' },
]

const topGainersStocks = [
  { name: '聯電',     code: '2303', price: '104.5', changePct: '+10.00', volume: '400',  status: '收盤', up: true,  limit: true,  pe: '12.6', eps: '8.29',   foreignPct: '52.8', trustPct: '2.1' },
  { name: '眾達-KY',  code: '4977', price: '270.5', changePct: '+9.96',  volume: '62.5', status: '收盤', up: true,  limit: false, pe: '17.8', eps: '15.20',  foreignPct: '28.4', trustPct: '6.16' },
  { name: '聯鈞',     code: '3450', price: '470.5', changePct: '+9.93',  volume: '91.2', status: '收盤', up: true,  limit: false, pe: '18.6', eps: '25.30',  foreignPct: '4.37', trustPct: '4.55' },
  { name: '辛耘',     code: '3583', price: '210',   changePct: '+9.93',  volume: '45.6', status: '收盤', up: true,  limit: false, pe: '19.5', eps: '10.77',  foreignPct: '14.2', trustPct: '2.8' },
  { name: '旺矽',     code: '6223', price: '835',   changePct: '+9.93',  volume: '78.2', status: '收盤', up: true,  limit: false, pe: '22.4', eps: '37.28',  foreignPct: '36.8', trustPct: '4.3' },
  { name: '群創',     code: '3481', price: '35.50', changePct: '+9.91',  volume: '288',  status: '收盤', up: true,  limit: true,  pe: '8.5',  eps: '4.18',   foreignPct: '22.4', trustPct: '1.9' },
  { name: '華新科',   code: '2492', price: '188.5', changePct: '+9.91',  volume: '77.9', status: '收盤', up: true,  limit: true,  pe: '14.7', eps: '12.83',  foreignPct: '28.6', trustPct: '0.59' },
  { name: '萬潤',     code: '6187', price: '155',   changePct: '+9.91',  volume: '23.8', status: '收盤', up: true,  limit: false, pe: '17.6', eps: '8.81',   foreignPct: '9.4',  trustPct: '1.2' },
  { name: '尖點',     code: '8021', price: '128',   changePct: '+9.91',  volume: '18.4', status: '收盤', up: true,  limit: false, pe: '16.2', eps: '7.90',   foreignPct: '12.6', trustPct: '1.5' },
  { name: '聯亞',     code: '3081', price: '92.5',  changePct: '+9.89',  volume: '15.7', status: '收盤', up: true,  limit: false, pe: '18.4', eps: '5.03',   foreignPct: '8.7',  trustPct: '1.1' },
  { name: '元太',     code: '8069', price: '348',   changePct: '+9.83',  volume: '124',  status: '收盤', up: true,  limit: false, pe: '21.5', eps: '16.19',  foreignPct: '52.8', trustPct: '3.2' },
  { name: '大立光',   code: '3008', price: '2410',  changePct: '+9.82',  volume: '215',  status: '收盤', up: true,  limit: false, pe: '23.8', eps: '101.26', foreignPct: '47.6', trustPct: '5.4' },
  { name: '友達',     code: '2409', price: '17.45', changePct: '+9.81',  volume: '85.4', status: '收盤', up: true,  limit: false, pe: '12.3', eps: '1.42',   foreignPct: '18.2', trustPct: '1.3' },
  { name: '祥碩',     code: '5269', price: '1525',  changePct: '+9.71',  volume: '84.2', status: '收盤', up: true,  limit: false, pe: '26.4', eps: '57.77',  foreignPct: '42.3', trustPct: '0.32' },
]

const topLosersStocks = [
  { name: '華勝-KY',     code: '6962', price: '125',   changePct: '-6.40', volume: '12.5', status: '收盤', up: false, limit: false, pe: '18.7', eps: '6.68',  foreignPct: '11.4', trustPct: '1.2' },
  { name: '統領',        code: '2910', price: '48.5',  changePct: '-2.24', volume: '3.8',  status: '收盤', up: false, limit: false, pe: '15.6', eps: '3.11',  foreignPct: '5.8',  trustPct: '0.7' },
  { name: '智邦',        code: '2345', price: '618',   changePct: '-2.51', volume: '156',  status: '收盤', up: false, limit: false, pe: '24.8', eps: '24.92', foreignPct: '38.6', trustPct: '4.7' },
  { name: '漢唐',        code: '2404', price: '785',   changePct: '-3.12', volume: '92.4', status: '收盤', up: false, limit: false, pe: '21.5', eps: '36.51', foreignPct: '32.4', trustPct: '3.8' },
  { name: '至上',        code: '8112', price: '52.3',  changePct: '-5.76', volume: '8.6',  status: '收盤', up: false, limit: false, pe: '14.2', eps: '3.68',  foreignPct: '8.4',  trustPct: '0.9' },
  { name: '華固',        code: '2548', price: '108',   changePct: '-4.63', volume: '14.2', status: '收盤', up: false, limit: false, pe: '13.5', eps: '8.00',  foreignPct: '12.8', trustPct: '1.6' },
  { name: '岱宇',        code: '1598', price: '74.5',  changePct: '-6.42', volume: '6.5',  status: '收盤', up: false, limit: false, pe: '16.8', eps: '4.43',  foreignPct: '7.2',  trustPct: '0.8' },
  { name: '凱基金',      code: '2883', price: '22.8',  changePct: '-5.26', volume: '78.4', status: '收盤', up: false, limit: false, pe: '11.5', eps: '1.98',  foreignPct: '32.4', trustPct: '2.6' },
  { name: '海德威',      code: '8101', price: '38.2',  changePct: '-4.05', volume: '4.2',  status: '收盤', up: false, limit: false, pe: '17.4', eps: '2.20',  foreignPct: '6.5',  trustPct: '0.6' },
  { name: '全宇生技-KY', code: '4148', price: '184',   changePct: '-2.47', volume: '12.8', status: '收盤', up: false, limit: false, pe: '22.6', eps: '8.14',  foreignPct: '14.5', trustPct: '1.4' },
  { name: '愛派司',      code: '6952', price: '95.5',  changePct: '-2.27', volume: '7.2',  status: '收盤', up: false, limit: false, pe: '19.3', eps: '4.95',  foreignPct: '9.8',  trustPct: '1.1' },
  { name: '喬鼎',        code: '3057', price: '32.6',  changePct: '-5.76', volume: '5.4',  status: '收盤', up: false, limit: false, pe: '15.8', eps: '2.06',  foreignPct: '6.1',  trustPct: '0.7' },
  { name: '太普高',      code: '3284', price: '67.4',  changePct: '-4.30', volume: '9.3',  status: '收盤', up: false, limit: false, pe: '16.4', eps: '4.11',  foreignPct: '8.5',  trustPct: '0.9' },
  { name: '南帝',        code: '2108', price: '52.8',  changePct: '-5.29', volume: '15.6', status: '收盤', up: false, limit: false, pe: '14.6', eps: '3.62',  foreignPct: '11.2', trustPct: '1.3' },
]

const turnoverStocks = [
  { name: '新盛力',  code: '4931', price: '202.5', changePct: '+8.29', volume: '64.0', status: '收盤', up: true,  limit: false, pe: '21.3', eps: '9.51',  foreignPct: '3.93', trustPct: '2.4' },
  { name: '眾達-KY', code: '4977', price: '270.5', changePct: '+9.96', volume: '59.1', status: '收盤', up: true,  limit: false, pe: '17.8', eps: '15.20', foreignPct: '28.4', trustPct: '6.16' },
  { name: '奇鈦科',  code: '3357', price: '52.6',  changePct: '+5.95', volume: '14.8', status: '收盤', up: true,  limit: false, pe: '18.4', eps: '2.86', foreignPct: '6.8',  trustPct: '0.7' },
  { name: '統新',    code: '6426', price: '265.5', changePct: '+2.12', volume: '22.7', status: '收盤', up: true,  limit: false, pe: '20.5', eps: '12.95',foreignPct: '28.3', trustPct: '2.7' },
  { name: '中釉',    code: '1809', price: '38.2',  changePct: '+2.02', volume: '14.3', status: '收盤', up: true,  limit: false, pe: '16.5', eps: '2.32', foreignPct: '4.2',  trustPct: '0.5' },
  { name: '譜瑞-KY', code: '4966', price: '761',   changePct: '+3.54', volume: '119',  status: '收盤', up: true,  limit: false, pe: '22.5', eps: '33.82',foreignPct: '3.65', trustPct: '3.29' },
  { name: '廣穎',    code: '4973', price: '186',   changePct: '+9.59', volume: '14.8', status: '收盤', up: true,  limit: false, pe: '19.6', eps: '9.49', foreignPct: '12.4', trustPct: '1.6' },
  { name: '今展科',  code: '6432', price: '45.7',  changePct: '-2.67', volume: '3.17', status: '收盤', up: false, limit: false, pe: '17.8', eps: '2.57', foreignPct: '5.6',  trustPct: '0.6' },
  { name: '易發',    code: '8019', price: '128',   changePct: '+1.14', volume: '7.59', status: '收盤', up: true,  limit: false, pe: '15.4', eps: '8.31', foreignPct: '7.8',  trustPct: '0.9' },
  { name: '台半',    code: '5425', price: '81.1',  changePct: '+1.00', volume: '35.7', status: '收盤', up: true,  limit: false, pe: '13.9', eps: '5.84', foreignPct: '24.6', trustPct: '2.2' },
  { name: '鈺創',    code: '5351', price: '83.8',  changePct: '+4.62', volume: '44.8', status: '收盤', up: true,  limit: false, pe: '24.7', eps: '3.39', foreignPct: '15.2', trustPct: '1.8' },
  { name: '強茂',    code: '2481', price: '115.5', changePct: '+5.96', volume: '70.3', status: '收盤', up: true,  limit: false, pe: '14.2', eps: '8.13', foreignPct: '4.37', trustPct: '2.4' },
  { name: '昇貿',    code: '3305', price: '128.5', changePct: '+9.83', volume: '28.0', status: '收盤', up: true,  limit: false, pe: '16.5', eps: '7.79', foreignPct: '3.93', trustPct: '2.1' },
  { name: '智原',    code: '3035', price: '425',   changePct: '+6.65', volume: '78.8', status: '收盤', up: true,  limit: false, pe: '21.5', eps: '19.77',foreignPct: '32.1', trustPct: '3.4' },
]

const priceBreakoutStocks = [
  { name: '聯電',   code: '2303', price: '104.5', changePct: '+10.00', volume: '400',  status: '收盤', up: true, limit: true,  pe: '12.6', eps: '8.29',   foreignPct: '52.8', trustPct: '2.1' },
  { name: '上詮',   code: '3363', price: '920',   changePct: '+7.85',  volume: '51.6', status: '收盤', up: true, limit: false, pe: '24.3', eps: '37.85',  foreignPct: '8.4',  trustPct: '1.6' },
  { name: '昶昕',   code: '8438', price: '103.5', changePct: '+4.86',  volume: '3.5',  status: '收盤', up: true, limit: false, pe: '18.7', eps: '5.53',   foreignPct: '5.2',  trustPct: '0.8' },
]

const momentumStocks = [
  { name: '蔚華科', code: '3055', price: '110',   changePct: '+10.00', volume: '24',   status: '收盤', up: true, limit: true,  pe: '15.8', eps: '6.96',   foreignPct: '11.2', trustPct: '1.4' },
  { name: '勤凱',   code: '4760', price: '301',   changePct: '+7.69',  volume: '18.5', status: '收盤', up: true, limit: false, pe: '20.4', eps: '14.75',  foreignPct: '9.6',  trustPct: '1.1' },
  { name: '眾達-KY',code: '4977', price: '270.5', changePct: '+9.96',  volume: '62.5', status: '收盤', up: true, limit: false, pe: '17.8', eps: '15.20',  foreignPct: '28.4', trustPct: '6.16' },
  { name: '鈺鎧',   code: '5228', price: '45.85', changePct: '+9.95',  volume: '8.3',  status: '收盤', up: true, limit: false, pe: '16.2', eps: '2.83',   foreignPct: '7.8',  trustPct: '0.6' },
  { name: '霖宏',   code: '5464', price: '63.3',  changePct: '+9.90',  volume: '12.4', status: '收盤', up: true, limit: false, pe: '18.5', eps: '3.42',   foreignPct: '6.4',  trustPct: '0.9' },
  { name: '振樺電', code: '8114', price: '239.5', changePct: '+9.86',  volume: '15.7', status: '收盤', up: true, limit: false, pe: '19.3', eps: '12.41',  foreignPct: '14.7', trustPct: '1.8' },
]

const mainForceStocks = [
  { name: '眾達-KY', code: '4977', price: '270.5', changePct: '+9.96', volume: '62.5', status: '收盤', up: true,  limit: false, pe: '17.8', eps: '15.20',  foreignPct: '28.4', trustPct: '6.16' },
  { name: '昇貿',    code: '3305', price: '128.5', changePct: '+9.83', volume: '29.0', status: '收盤', up: true,  limit: false, pe: '16.5', eps: '7.79',   foreignPct: '3.93', trustPct: '5.80' },
  { name: '新盛力',  code: '4931', price: '202.5', changePct: '+8.29', volume: '65.4', status: '收盤', up: true,  limit: false, pe: '21.3', eps: '9.51',   foreignPct: '3.93', trustPct: '4.77' },
  { name: '聯鈞',    code: '3450', price: '470.5', changePct: '+9.93', volume: '91.2', status: '收盤', up: true,  limit: false, pe: '18.6', eps: '25.30',  foreignPct: '4.37', trustPct: '4.55' },
  { name: '凌航',    code: '3135', price: '213.5', changePct: '+9.77', volume: '12.9', status: '收盤', up: true,  limit: false, pe: '19.8', eps: '10.78',  foreignPct: '4.03', trustPct: '4.31' },
  { name: '譜瑞-KY', code: '4966', price: '761',   changePct: '+3.54', volume: '122.8',status: '收盤', up: true,  limit: false, pe: '22.5', eps: '33.82',  foreignPct: '3.65', trustPct: '4.30' },
  { name: '光頡',    code: '3624', price: '66.3',  changePct: '+5.24', volume: '9.6',  status: '收盤', up: true,  limit: false, pe: '14.2', eps: '4.67',   foreignPct: '12.5', trustPct: '3.68' },
  { name: '沛亨',    code: '6291', price: '518',   changePct: '+9.86', volume: '11.3', status: '收盤', up: true,  limit: false, pe: '19.6', eps: '26.43',  foreignPct: '3.01', trustPct: '3.47' },
  { name: '崇越電',  code: '3388', price: '121',   changePct: '+10.00',volume: '2.9',  status: '收盤', up: true,  limit: true,  pe: '15.4', eps: '7.86',   foreignPct: '8.7',  trustPct: '2.92' },
  { name: '和椿',    code: '6215', price: '126',   changePct: '+5.44', volume: '11.5', status: '收盤', up: true,  limit: false, pe: '16.8', eps: '7.50',   foreignPct: '10.3', trustPct: '2.78' },
]

const shortPickStocks = [
  { name: '啟碁',    code: '6285', price: '282',    changePct: '+8.88', volume: '186', status: '收盤', up: true, limit: false, pe: '16.4', eps: '17.2',  foreignPct: '42.1', trustPct: '5.6' },
  { name: '新盛力',  code: '4931', price: '202.5',  changePct: '+8.29', volume: '142', status: '收盤', up: true, limit: false, pe: '21.3', eps: '9.51',  foreignPct: '18.7', trustPct: '2.4' },
  { name: '鈺創',    code: '5351', price: '83.8',   changePct: '+4.62', volume: '98',  status: '收盤', up: true, limit: false, pe: '24.7', eps: '3.39',  foreignPct: '15.2', trustPct: '1.8' },
  { name: '映泰',    code: '2399', price: '46.45',  changePct: '+3.68', volume: '67',  status: '收盤', up: true, limit: false, pe: '19.8', eps: '2.35',  foreignPct: '12.4', trustPct: '0.9' },
  { name: '凱美',    code: '2375', price: '94.8',   changePct: '+3.61', volume: '54',  status: '收盤', up: true, limit: false, pe: '15.6', eps: '6.07',  foreignPct: '22.8', trustPct: '3.1' },
  { name: '精材',    code: '3374', price: '255.5',  changePct: '+2.61', volume: '48',  status: '收盤', up: true, limit: false, pe: '18.2', eps: '14.04', foreignPct: '35.6', trustPct: '4.2' },
  { name: '統新',    code: '6426', price: '265.5',  changePct: '+2.12', volume: '42',  status: '收盤', up: true, limit: false, pe: '20.5', eps: '12.95', foreignPct: '28.3', trustPct: '2.7' },
  { name: '康舒',    code: '6282', price: '56',     changePct: '+1.08', volume: '38',  status: '收盤', up: true, limit: false, pe: '17.4', eps: '3.22',  foreignPct: '20.9', trustPct: '1.5' },
  { name: '台半',    code: '5425', price: '81.1',   changePct: '+1.00', volume: '35',  status: '收盤', up: true, limit: false, pe: '13.9', eps: '5.84',  foreignPct: '24.6', trustPct: '2.2' },
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
    '短多精選': shortPickStocks,
    '成值排行': sortBy(baseStocks, 'volume'),
    '量能排行': sortBy(baseStocks, 'volume'),
    '周轉排行': turnoverStocks,
    '漲幅排行': topGainersStocks,
    '跌幅排行': topLosersStocks,
    '瞬間量':   sortBy(baseStocks, 'volume').slice(0, 10),
    '量放大股': sortBy(baseStocks, 'volume').slice(3, 13),
  },
  chip_rank: {
    '外資排行': foreignTopStocks,
    '投信排行': trustTopStocks,
    '主力排行': mainForceStocks,
    '當沖排行': dayTradingStocks,
  },
  strategy: {
    '當沖空': dayShortStocks,
    '分數選股': scoreStocks,
    '動能排行': momentumStocks,
  },
  fundamental: {
    '營收創高': [baseStocks[0], baseStocks[2], baseStocks[11], baseStocks[8], baseStocks[4], baseStocks[12]],
    '合約負債': [baseStocks[0], baseStocks[5], baseStocks[7], baseStocks[2], baseStocks[11], baseStocks[9]],
    'ROE排行': [baseStocks[0], baseStocks[11], baseStocks[2], baseStocks[5], baseStocks[7], baseStocks[8]],
  },
  technical: {
    '多頭奔放': [baseStocks[1], baseStocks[3], baseStocks[6], baseStocks[10], baseStocks[4], baseStocks[9]],
    '股價創高': priceBreakoutStocks,
    '急跌抄底': [baseStocks[5], baseStocks[7], baseStocks[13], baseStocks[14], baseStocks[5], baseStocks[13]],
  },
  swing_strategy: {
    '法人目標價': [baseStocks[0], baseStocks[2], baseStocks[5], baseStocks[7], baseStocks[11], baseStocks[8]],
    '即將法說會': [baseStocks[0], baseStocks[5], baseStocks[14], baseStocks[7], baseStocks[2], baseStocks[12]],
  },
  follow: {
    '00981加碼': follow981Stocks,
    '00403加碼': [baseStocks[0], baseStocks[2], baseStocks[5], baseStocks[7], baseStocks[8], baseStocks[14]],
    '00982加碼': follow982Stocks,
  },
  swing_follow: {
    '投信大買': [baseStocks[1], baseStocks[3], baseStocks[9], baseStocks[6], baseStocks[11], baseStocks[12]],
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
