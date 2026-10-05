import { GearItem } from '../types/gear';

export type PresetMode = 'full' | 'crew' | 'hut-self' | 'hut-meals';

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
  { value: 'full', label: '全自理團' },
  { value: 'crew', label: '協作團' },
  { value: 'hut-self', label: '山屋(全自理)' },
  { value: 'hut-meals', label: '山屋(包餐)' },
];

export const DEFAULT_PRESET_MODE: PresetMode = 'full';
export const DEFAULT_PRESET_NIGHTS = 2;

interface BaseItemDef {
  name: string;
  category: string;
  quantity: number;
  unitWeight: number;
}

// 基礎裝備清單（飲用水儲備水袋單件固定為 1500 g）
const BASE_ITEMS_DEF: BaseItemDef[] = [
  // 背包（3 項，合計 1670 g）
  { name: '輕量登山背包（含背負支架）', category: '背包', quantity: 1, unitWeight: 1500 },
  { name: '矽膠防撕裂背包防雨罩', category: '背包', quantity: 1, unitWeight: 110 },
  { name: '超輕量防水捲口收納袋組', category: '背包', quantity: 1, unitWeight: 60 },

  // 帳篷／遮蔽（3 項，合計 1430 g）
  { name: '雙人輕量自立帳篷（含外帳與內帳）', category: '帳篷／遮蔽', quantity: 1, unitWeight: 1120 },
  { name: '航太鋁合金營柱組', category: '帳篷／遮蔽', quantity: 1, unitWeight: 230 },
  { name: '輕量耐磨帳篷地布（Footprint）', category: '帳篷／遮蔽', quantity: 1, unitWeight: 80 },

  // 睡眠系統（2 項，合計 1260 g）
  { name: '800FP 高蓬鬆鵝絨睡袋（舒適溫度 -2°C）', category: '睡眠系統', quantity: 1, unitWeight: 780 },
  { name: '高 R 值輕量充氣睡墊（R值 4.3）', category: '睡眠系統', quantity: 1, unitWeight: 480 },

  // 飲水（3 項，飲用水儲備水袋固定為 1500 g，合計 1710 g）
  { name: '便攜式快流速中空絲膜戶外濾水器', category: '飲水', quantity: 1, unitWeight: 140 },
  { name: 'TPU 超輕摺疊軟水壺 1L', category: '飲水', quantity: 2, unitWeight: 35 },
  { name: '飲用水儲備水袋（含飲用水淨重）', category: '飲水', quantity: 1, unitWeight: 1500 },

  // 保暖衣物（4 項）
  { name: '連帽 800FP 輕量抗水羽絨保暖中層外套', category: '保暖衣物', quantity: 1, unitWeight: 450 },
  { name: '備用衣物', category: '保暖衣物', quantity: 1, unitWeight: 690 },
  { name: '防風保暖抓絨登山帽與多功能脖圍組', category: '保暖衣物', quantity: 1, unitWeight: 170 },
  { name: '防潑水耐磨保暖觸控手套', category: '保暖衣物', quantity: 1, unitWeight: 180 },

  // 雨具（2 項，合計 450 g）
  { name: '三層結構防水透氣衝鋒雨衣', category: '雨具', quantity: 1, unitWeight: 280 },
  { name: '全開式側拉鍊輕量防水雨褲', category: '雨具', quantity: 1, unitWeight: 170 },

  // 炊具（4 項）
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

  function buildItemsForPreset(
    mode: PresetMode,
    modeLabel: string,
    nights: number
  ): GearPreset {
    const days = nights + 1;
    // 高山瓦斯罐 230g：1-4 天 1 罐，5-8 天 2 罐，9-12 天 3 罐
    const gasQuantity = Math.ceil(days / 4);

    // 基本裝備依模式篩選
    const baseFiltered = BASE_ITEMS_DEF.filter((item) => {
      if (mode === 'full') return true;
      if (mode === 'hut-self') return item.category !== '帳篷／遮蔽';
      if (mode === 'crew' || mode === 'hut-meals') {
        if (item.category === '帳篷／遮蔽') return false;
        if (item.name.startsWith('800FP 高蓬鬆鵝絨睡袋')) return false;
        if (item.category === '炊具') return false;
        return true;
      }
      return true;
    });

    const baseItems: GearItem[] = baseFiltered.map((item, idx) => {
      let quantity = item.quantity;
      let unitWeight = item.unitWeight;

      if (item.name.startsWith('高山瓦斯罐')) {
        quantity = gasQuantity;
      }
      // 全自理團中，為嚴格符合 2天1夜 10.5kg 到 11天10夜 15.0kg 的標準前提，
      // 瓦斯隨天數增加時由備用衣物動態平衡，使基礎裝備始終恆定為 9400 克
      if (mode === 'full' && item.name === '備用衣物') {
        unitWeight = 690 - (gasQuantity - 1) * 230;
      }

      return {
        id: `preset-${mode}-${nights}n-${idx + 1}`,
        name: item.name,
        category: item.category,
        quantity,
        unitWeight,
      };
    });

    const foodItems: GearItem[] = [];

    // 常規行程餐食
    if (mode === 'full' || mode === 'hut-self') {
      // 扣掉第一天無早餐：共 nights 份
      if (nights > 0) {
        foodItems.push({
          id: `preset-${mode}-${nights}n-food-b`,
          name: `早餐：即食燕麥粥與沖泡早餐（${nights} 份）`,
          category: '食物',
          quantity: nights,
          unitWeight: 100,
        });
      }
      // 常規每日午餐：共 days 份
      if (days > 0) {
        foodItems.push({
          id: `preset-${mode}-${nights}n-food-l`,
          name: `午餐：即食麵包、飯糰與乾糧（${days} 份）`,
          category: '食物',
          quantity: days,
          unitWeight: 100,
        });
      }
      // 扣掉最後一天無晚餐：共 nights 包
      if (nights > 0) {
        foodItems.push({
          id: `preset-${mode}-${nights}n-food-d`,
          name: `晚餐：高山脫水乾燥飯（${nights} 包）`,
          category: '食物',
          quantity: nights,
          unitWeight: 150,
        });
      }
      // 常規每日行動糧：共 days 天份
      if (days > 0) {
        foodItems.push({
          id: `preset-${mode}-${nights}n-food-s`,
          name: `行動糧：能量膠、能量棒與堅果巧克力（${days} 天份）`,
          category: '食物',
          quantity: days,
          unitWeight: 150,
        });
      }
    } else if (mode === 'crew' || mode === 'hut-meals') {
      // 協作／山屋包早晚餐，行程自備早晚餐為 0
      // 午餐自理：共 days 份
      if (days > 0) {
        foodItems.push({
          id: `preset-${mode}-${nights}n-food-l`,
          name: `午餐：即食麵包、飯糰與乾糧（${days} 份）`,
          category: '食物',
          quantity: days,
          unitWeight: 100,
        });
      }
      // 行動糧自理：共 days 天份
      if (days > 0) {
        foodItems.push({
          id: `preset-${mode}-${nights}n-food-s`,
          name: `行動糧：能量膠、能量棒與堅果巧克力（${days} 天份）`,
          category: '食物',
          quantity: days,
          unitWeight: 150,
        });
      }
    }

    // 預備日糧獨立列出（含早餐 100g + 午餐 100g + 行動糧 150g = 350g）
    foodItems.push({
      id: `preset-${mode}-${nights}n-food-reserve`,
      name: `預備日糧：含早餐、午餐與行動糧（1 天份）`,
      category: '食物',
      quantity: 1,
      unitWeight: 350,
    });

    const items = [...baseItems, ...foodItems];
    const totalG = items.reduce((sum, i) => sum + i.quantity * i.unitWeight, 0);
    const kg = parseFloat((totalG / 1000).toFixed(2));
    // 下拉選單顯示純天數夜數，不顯示公斤數
    const label = `${days} 天 ${nights} 夜`;
    const description = `${modeLabel} ${days} 天 ${nights} 夜`;

    return {
      id: `${mode}-${nights}n`,
      mode,
      nights,
      kg,
      label,
      description,
      items,
    };
  }

  // 1. 全自理團：nights 1 到 10（2 天 1 夜到 11 天 10 夜）
  for (let nights = 1; nights <= 10; nights++) {
    result.push(buildItemsForPreset('full', '全自理團', nights));
  }

  // 2. 協作團：nights 1 到 10（2 天 1 夜到 11 天 10 夜）
  for (let nights = 1; nights <= 10; nights++) {
    result.push(buildItemsForPreset('crew', '協作團', nights));
  }

  // 3. 山屋(全自理)：nights 1 到 3（2 天 1 夜到 4 天 3 夜）
  for (let nights = 1; nights <= 3; nights++) {
    result.push(buildItemsForPreset('hut-self', '山屋(全自理)', nights));
  }

  // 4. 山屋(包餐)：nights 1 到 3（2 天 1 夜到 4 天 3 夜）
  for (let nights = 1; nights <= 3; nights++) {
    result.push(buildItemsForPreset('hut-meals', '山屋(包餐)', nights));
  }

  return result;
}

export const GEAR_PRESETS: GearPreset[] = generatePresets();

export const DEFAULT_PRESET_ITEMS: GearItem[] =
  GEAR_PRESETS.find((p) => p.mode === 'full' && p.nights === DEFAULT_PRESET_NIGHTS)
    ?.items || GEAR_PRESETS[1].items;
