import { GearItem } from '../types/gear';

export type PresetMode = 'tent' | 'hut-self' | 'hut-meals';

export interface GearPreset {
  id: string;
  mode: PresetMode;
  nights: number;
  kg: number;
  label: string;
  description: string;
  items: GearItem[];
}

export const PRESET_MODES: { value: PresetMode; label: string }[] = [
  { value: 'tent', label: '帳篷縱走' },
  { value: 'hut-self', label: '山屋（自炊）' },
  { value: 'hut-meals', label: '山屋（包餐）' },
];

export const DEFAULT_PRESET_MODE: PresetMode = 'tent';
export const DEFAULT_PRESET_NIGHTS = 2;

interface BaseItemDef {
  name: string;
  category: string;
  quantity: number;
  unitWeight: number;
}

// 34 項固定基本裝備（含飲水），合計剛好 9500 g
const BASE_ITEMS_DEF: BaseItemDef[] = [
  // 背包（3 項，合計 1220 g）
  { name: '輕量登山背包 50L（含背負支架）', category: '背包', quantity: 1, unitWeight: 1050 },
  { name: '矽膠防撕裂背包防雨罩', category: '背包', quantity: 1, unitWeight: 110 },
  { name: '超輕量防水捲口收納袋組', category: '背包', quantity: 1, unitWeight: 60 },

  // 帳篷／遮蔽（3 項，合計 1430 g）
  { name: '雙人輕量自立帳篷（含外帳與內帳）', category: '帳篷／遮蔽', quantity: 1, unitWeight: 1120 },
  { name: '航太鋁合金營柱組', category: '帳篷／遮蔽', quantity: 1, unitWeight: 230 },
  { name: '輕量耐磨帳篷地布（Footprint）', category: '帳篷／遮蔽', quantity: 1, unitWeight: 80 },

  // 睡眠系統（2 項，合計 1260 g）
  { name: '800FP 高蓬鬆鵝絨睡袋（舒適溫度 -2°C）', category: '睡眠系統', quantity: 1, unitWeight: 780 },
  { name: '高 R 值輕量充氣睡墊（R值 4.3）', category: '睡眠系統', quantity: 1, unitWeight: 480 },

  // 飲水（3 項，合計 1220 g）
  { name: '便攜式快流速中空絲膜戶外濾水器', category: '飲水', quantity: 1, unitWeight: 140 },
  { name: 'TPU 超輕摺疊軟水壺 1L', category: '飲水', quantity: 2, unitWeight: 35 },
  { name: '飲用水儲備水袋 1L（含飲用水淨重）', category: '飲水', quantity: 1, unitWeight: 1010 },

  // 登山鞋（1 項，合計 920 g）
  { name: '中筒 GORE-TEX 防水透氣登山健行鞋（一雙）', category: '登山鞋', quantity: 1, unitWeight: 920 },

  // 衣物（3 項，合計 810 g）
  { name: '美麗諾羊毛抗臭長袖排汗底層衣', category: '衣物', quantity: 1, unitWeight: 220 },
  { name: '四面彈性耐磨快乾登山長褲', category: '衣物', quantity: 1, unitWeight: 340 },
  { name: '備用羊毛登山襪與排汗內著組', category: '衣物', quantity: 1, unitWeight: 250 },

  // 雨具（2 項，合計 450 g）
  { name: '三層結構防水透氣衝鋒雨衣', category: '雨具', quantity: 1, unitWeight: 280 },
  { name: '全開式側拉鍊輕量防水雨褲', category: '雨具', quantity: 1, unitWeight: 170 },

  // 保暖（3 項，合計 800 g）
  { name: '連帽 800FP 輕量抗水羽絨保暖中層外套', category: '保暖', quantity: 1, unitWeight: 450 },
  { name: '防風保暖抓絨登山帽與多功能脖圍組', category: '保暖', quantity: 1, unitWeight: 170 },
  { name: '防潑水耐磨保暖觸控手套', category: '保暖', quantity: 1, unitWeight: 180 },

  // 炊具（4 項，合計 470 g）
  { name: '鈦合金附蓋個人鍋 900ml', category: '炊具', quantity: 1, unitWeight: 125 },
  { name: '微型鈦合金攻頂瓦斯爐頭', category: '炊具', quantity: 1, unitWeight: 75 },
  { name: '高山瓦斯罐 230g（含罐重與瓦斯）', category: '炊具', quantity: 1, unitWeight: 230 },
  { name: '長柄超輕鈦合金湯匙', category: '炊具', quantity: 1, unitWeight: 40 },

  // 導航與電子設備（4 項，合計 375 g）
  { name: '10000mAh 輕量防撞戶外行動電源', category: '導航與電子設備', quantity: 1, unitWeight: 110 },
  { name: '衛星通訊雙向 SOS 緊急發射求救器', category: '導航與電子設備', quantity: 1, unitWeight: 115 },
  { name: '登山 GPS 氣壓高度手錶與傳輸充電線', category: '導航與電子設備', quantity: 1, unitWeight: 85 },
  { name: '智慧型手機掛繩與防水防震保護組', category: '導航與電子設備', quantity: 1, unitWeight: 65 },

  // 急救與安全（3 項，合計 270 g）
  { name: '戶外防水急救包（含彈性繃帶、消毒敷料與必備常備藥品）', category: '急救與安全', quantity: 1, unitWeight: 160 },
  { name: '超輕防風反射緊急救生鋁箔毯', category: '急救與安全', quantity: 1, unitWeight: 60 },
  { name: '求生高音雙管哨與防水密封打火組', category: '急救與安全', quantity: 1, unitWeight: 50 },

  // 照明（1 項，合計 85 g）
  { name: 'Type-C 充電式廣角登山頭燈（含彈性頭帶）', category: '照明', quantity: 1, unitWeight: 85 },

  // 個人用品（1 項，合計 130 g）
  { name: '友善環境防曬乳、天然防蚊膏與可分解潔膚紙巾組', category: '個人用品', quantity: 1, unitWeight: 130 },

  // 其他（1 項，合計 60 g）
  { name: '防水地圖袋、入山入園證件與抗候修補膠帶組', category: '其他', quantity: 1, unitWeight: 60 },
];

function generatePresets(): GearPreset[] {
  const result: GearPreset[] = [];

  // 1. 帳篷縱走：1 到 10 夜（2 天 1 夜 到 11 天 10 夜）
  for (let nights = 1; nights <= 10; nights++) {
    const days = nights + 1;
    const baseItems: GearItem[] = BASE_ITEMS_DEF.map((item, idx) => ({
      id: `preset-tent-${nights}n-${idx + 1}`,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unitWeight: item.unitWeight,
    }));

    const foodItems: GearItem[] = [
      {
        id: `preset-tent-${nights}n-food-b`,
        name: `早餐：即食燕麥粥與沖泡早餐（${days} 份）`,
        category: '食物',
        quantity: days,
        unitWeight: 150,
      },
      {
        id: `preset-tent-${nights}n-food-l`,
        name: `午餐：行進糧、能量棒與堅果肉乾（${days} 份）`,
        category: '食物',
        quantity: days,
        unitWeight: 150,
      },
      {
        id: `preset-tent-${nights}n-food-d`,
        name: `晚餐：高山脫水乾燥飯（${days} 包）`,
        category: '食物',
        quantity: days,
        unitWeight: 200,
      },
    ];

    const items = [...baseItems, ...foodItems];
    const totalG = items.reduce((sum, item) => sum + item.quantity * item.unitWeight, 0);
    const kg = parseFloat((totalG / 1000).toFixed(2));
    const label = `${days} 天 ${nights} 夜｜${kg} 公斤`;
    const description = `帳篷縱走 ${days} 天 ${nights} 夜`;

    result.push({
      id: `tent-${nights}n`,
      mode: 'tent',
      nights,
      kg,
      label,
      description,
      items,
    });
  }

  // 2. 山屋（自炊）：1 到 3 夜（2 天 1 夜 到 4 天 3 夜）
  for (let nights = 1; nights <= 3; nights++) {
    const days = nights + 1;
    const baseItems: GearItem[] = BASE_ITEMS_DEF
      .filter((item) => item.category !== '帳篷／遮蔽')
      .map((item, idx) => ({
        id: `preset-hut-self-${nights}n-${idx + 1}`,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unitWeight: item.unitWeight,
      }));

    const foodItems: GearItem[] = [
      {
        id: `preset-hut-self-${nights}n-food-b`,
        name: `早餐：即食燕麥粥與沖泡早餐（${nights} 份）`,
        category: '食物',
        quantity: nights,
        unitWeight: 150,
      },
      {
        id: `preset-hut-self-${nights}n-food-l`,
        name: `午餐：行進糧、能量棒與堅果肉乾（${days} 份）`,
        category: '食物',
        quantity: days,
        unitWeight: 150,
      },
      {
        id: `preset-hut-self-${nights}n-food-d`,
        name: `晚餐：高山脫水乾燥飯（${nights} 包）`,
        category: '食物',
        quantity: nights,
        unitWeight: 200,
      },
    ];

    const items = [...baseItems, ...foodItems];
    const totalG = items.reduce((sum, item) => sum + item.quantity * item.unitWeight, 0);
    const kg = parseFloat((totalG / 1000).toFixed(2));
    const label = `${days} 天 ${nights} 夜｜約 ${kg} 公斤`;
    const description = `山屋（自炊） ${days} 天 ${nights} 夜`;

    result.push({
      id: `hut-self-${nights}n`,
      mode: 'hut-self',
      nights,
      kg,
      label,
      description,
      items,
    });
  }

  // 3. 山屋（包餐）：1 到 3 夜（2 天 1 夜 到 4 天 3 夜）
  for (let nights = 1; nights <= 3; nights++) {
    const days = nights + 1;
    const baseItems: GearItem[] = BASE_ITEMS_DEF
      .filter(
        (item) =>
          item.category !== '帳篷／遮蔽' &&
          !item.name.startsWith('800FP 高蓬鬆鵝絨睡袋')
      )
      .map((item, idx) => ({
        id: `preset-hut-meals-${nights}n-${idx + 1}`,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unitWeight: item.unitWeight,
      }));

    const foodItems: GearItem[] = [
      {
        id: `preset-hut-meals-${nights}n-food-l`,
        name: `午餐：行進糧、能量棒與堅果肉乾（${days} 份）`,
        category: '食物',
        quantity: days,
        unitWeight: 150,
      },
    ];

    const items = [...baseItems, ...foodItems];
    const totalG = items.reduce((sum, item) => sum + item.quantity * item.unitWeight, 0);
    const kg = parseFloat((totalG / 1000).toFixed(2));
    const label = `${days} 天 ${nights} 夜｜約 ${kg} 公斤`;
    const description = `山屋（包餐） ${days} 天 ${nights} 夜`;

    result.push({
      id: `hut-meals-${nights}n`,
      mode: 'hut-meals',
      nights,
      kg,
      label,
      description,
      items,
    });
  }

  return result;
}

export const GEAR_PRESETS: GearPreset[] = generatePresets();

export const DEFAULT_PRESET_ITEMS: GearItem[] =
  GEAR_PRESETS.find((p) => p.mode === 'tent' && p.nights === DEFAULT_PRESET_NIGHTS)
    ?.items || GEAR_PRESETS[1].items;
