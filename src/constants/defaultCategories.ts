import { GearItem } from '../types/gear';

export const DEFAULT_CATEGORIES: string[] = [
  '背包',
  '睡眠系統',
  '帳篷／遮蔽',
  '炊具',
  '食物',
  '飲水',
  '衣物',
  '雨具',
  '保暖',
  '登山鞋',
  '導航與電子設備',
  '照明',
  '急救與安全',
  '個人用品',
  '其他',
];

export const SAMPLE_GEAR_ITEMS: GearItem[] = [
  // 帳篷／遮蔽（3 項，合計 1430 g，最重類別）
  {
    id: 'sample-1',
    name: '雙人輕量自立帳篷（含外帳與內帳）',
    category: '帳篷／遮蔽',
    quantity: 1,
    unitWeight: 1120,
  },
  {
    id: 'sample-2',
    name: '航太鋁合金營柱組',
    category: '帳篷／遮蔽',
    quantity: 1,
    unitWeight: 230,
  },
  {
    id: 'sample-3',
    name: '輕量耐磨帳篷地布（Footprint）',
    category: '帳篷／遮蔽',
    quantity: 1,
    unitWeight: 80,
  },

  // 睡眠系統（3 項，合計 1380 g）
  {
    id: 'sample-4',
    name: '800FP 高蓬鬆鵝絨睡袋（舒適溫度 -2°C）',
    category: '睡眠系統',
    quantity: 1,
    unitWeight: 780,
  },
  {
    id: 'sample-5',
    name: '高 R 值輕量充氣睡墊（R值 4.3）',
    category: '睡眠系統',
    quantity: 1,
    unitWeight: 480,
  },
  {
    id: 'sample-6',
    name: '超輕充氣人體工學登山枕',
    category: '睡眠系統',
    quantity: 1,
    unitWeight: 120,
  },

  // 食物（4 項，合計 1400 g）
  {
    id: 'sample-7',
    name: '高山脫水乾燥飯（主餐 4 包）',
    category: '食物',
    quantity: 4,
    unitWeight: 110,
  },
  {
    id: 'sample-8',
    name: '高熱量能量棒與堅果燕麥袋',
    category: '食物',
    quantity: 1,
    unitWeight: 460,
  },
  {
    id: 'sample-9',
    name: '即溶研磨黑咖啡與電解質沖泡粉組',
    category: '食物',
    quantity: 1,
    unitWeight: 150,
  },
  {
    id: 'sample-10',
    name: '行進糧特級肉乾與能量巧克力量販包',
    category: '食物',
    quantity: 1,
    unitWeight: 350,
  },

  // 飲水（3 項，合計 1400 g）
  {
    id: 'sample-11',
    name: '便攜式快流速中空絲膜戶外濾水器',
    category: '飲水',
    quantity: 1,
    unitWeight: 140,
  },
  {
    id: 'sample-12',
    name: 'TPU 超輕摺疊軟水壺 1L',
    category: '飲水',
    quantity: 2,
    unitWeight: 35,
  },
  {
    id: 'sample-13',
    name: '飲用水儲備水袋 1.5L（含飲用水淨重）',
    category: '飲水',
    quantity: 1,
    unitWeight: 1190,
  },

  // 背包（3 項，合計 1350 g）
  {
    id: 'sample-14',
    name: '輕量登山背包 50L（含超輕金屬背負支架）',
    category: '背包',
    quantity: 1,
    unitWeight: 1150,
  },
  {
    id: 'sample-15',
    name: '矽膠防撕裂背包防雨罩',
    category: '背包',
    quantity: 1,
    unitWeight: 110,
  },
  {
    id: 'sample-16',
    name: '超輕量防水捲口收納袋組',
    category: '背包',
    quantity: 1,
    unitWeight: 90,
  },

  // 登山鞋（2 項，合計 980 g）
  {
    id: 'sample-17',
    name: '中筒 GORE-TEX 防水透氣登山健行鞋（一雙）',
    category: '登山鞋',
    quantity: 1,
    unitWeight: 920,
  },
  {
    id: 'sample-18',
    name: '超輕防砂石透氣短綁腿',
    category: '登山鞋',
    quantity: 1,
    unitWeight: 60,
  },

  // 衣物（3 項，合計 950 g）
  {
    id: 'sample-19',
    name: '美麗諾羊毛抗臭長袖排汗底層衣',
    category: '衣物',
    quantity: 1,
    unitWeight: 220,
  },
  {
    id: 'sample-20',
    name: '四面彈性耐磨快乾登山長褲',
    category: '衣物',
    quantity: 1,
    unitWeight: 340,
  },
  {
    id: 'sample-21',
    name: '備用羊毛登山襪與排汗內著組',
    category: '衣物',
    quantity: 1,
    unitWeight: 390,
  },

  // 保暖（3 項，合計 850 g）
  {
    id: 'sample-22',
    name: '連帽 800FP 輕量抗水羽絨保暖中層外套',
    category: '保暖',
    quantity: 1,
    unitWeight: 450,
  },
  {
    id: 'sample-23',
    name: '防風保暖抓絨登山帽與多功能脖圍組',
    category: '保暖',
    quantity: 1,
    unitWeight: 220,
  },
  {
    id: 'sample-24',
    name: '防潑水耐磨保暖觸控手套',
    category: '保暖',
    quantity: 1,
    unitWeight: 180,
  },

  // 炊具（4 項，合計 650 g）
  {
    id: 'sample-25',
    name: '鈦合金附蓋個人鍋 900ml',
    category: '炊具',
    quantity: 1,
    unitWeight: 125,
  },
  {
    id: 'sample-26',
    name: '微型鈦合金攻頂瓦斯爐頭',
    category: '炊具',
    quantity: 1,
    unitWeight: 75,
  },
  {
    id: 'sample-27',
    name: '高山瓦斯罐 230g（含罐重與瓦斯）',
    category: '炊具',
    quantity: 1,
    unitWeight: 410,
  },
  {
    id: 'sample-28',
    name: '長柄超輕鈦合金湯匙',
    category: '炊具',
    quantity: 1,
    unitWeight: 40,
  },

  // 導航與電子設備（4 項，合計 460 g）
  {
    id: 'sample-29',
    name: '10000mAh 輕量防撞戶外行動電源',
    category: '導航與電子設備',
    quantity: 1,
    unitWeight: 195,
  },
  {
    id: 'sample-30',
    name: '衛星通訊雙向 SOS 緊急發射求救器',
    category: '導航與電子設備',
    quantity: 1,
    unitWeight: 115,
  },
  {
    id: 'sample-31',
    name: '登山 GPS 氣壓高度手錶與傳輸充電線',
    category: '導航與電子設備',
    quantity: 1,
    unitWeight: 85,
  },
  {
    id: 'sample-32',
    name: '智慧型手機掛繩與防水防震保護組',
    category: '導航與電子設備',
    quantity: 1,
    unitWeight: 65,
  },

  // 雨具（2 項，合計 450 g）
  {
    id: 'sample-33',
    name: '三層結構防水透氣衝鋒雨衣',
    category: '雨具',
    quantity: 1,
    unitWeight: 280,
  },
  {
    id: 'sample-34',
    name: '全開式側拉鍊輕量防水雨褲',
    category: '雨具',
    quantity: 1,
    unitWeight: 170,
  },

  // 急救與安全（3 項，合計 270 g）
  {
    id: 'sample-35',
    name: '戶外防水急救包（含彈性繃帶、消毒敷料與必備常備藥品）',
    category: '急救與安全',
    quantity: 1,
    unitWeight: 160,
  },
  {
    id: 'sample-36',
    name: '超輕防風反射緊急救生鋁箔毯',
    category: '急救與安全',
    quantity: 1,
    unitWeight: 60,
  },
  {
    id: 'sample-37',
    name: '求生高音雙管哨與防水密封打火組',
    category: '急救與安全',
    quantity: 1,
    unitWeight: 50,
  },

  // 照明（2 項，合計 180 g）
  {
    id: 'sample-38',
    name: 'Type-C 充電式廣角登山頭燈（含彈性頭帶）',
    category: '照明',
    quantity: 1,
    unitWeight: 85,
  },
  {
    id: 'sample-39',
    name: '備用防水超輕迷你緊急照明營燈',
    category: '照明',
    quantity: 1,
    unitWeight: 95,
  },

  // 個人用品（1 項，合計 150 g）
  {
    id: 'sample-40',
    name: '友善環境防曬乳、天然防蚊膏與可分解潔膚紙巾組',
    category: '個人用品',
    quantity: 1,
    unitWeight: 150,
  },

  // 其他（1 項，合計 100 g）
  {
    id: 'sample-41',
    name: '防水地圖袋、入山入園證件與抗候修補膠帶組',
    category: '其他',
    quantity: 1,
    unitWeight: 100,
  },
];
