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

  function buildItemsForPreset(
    mode: PresetMode,
    modeLabel: string,
    nights: number
  ): GearPreset {
    const days = nights + 1;

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
      if (item.name.startsWith('高山瓦斯罐')) {
        quantity = Math.ceil(days / 4);
      }
      return {
        id: `preset-${mode}-${nights}n-${idx + 1}`,
        name: item.name,
        category: item.category,
        quantity,
        unitWeight: item.unitWeight,
      };
    });

    const foodItems: GearItem[] = [];
    let bPortions = 0;
    let lPortions = 0;
    let dPortions = 0;

    if (mode === 'full') {
      bPortions = days;
      lPortions = days;
      dPortions = days;
    } else if (mode === 'crew') {
      bPortions = days - nights;
      lPortions = days;
      dPortions = days - nights;
    } else if (mode === 'hut-self') {
      bPortions = nights;
      lPortions = days;
      dPortions = nights;
    } else if (mode === 'hut-meals') {
      bPortions = 0;
      lPortions = days;
      dPortions = 0;
    }

    if (bPortions > 0) {
      foodItems.push({
        id: `preset-${mode}-${nights}n-food-b`,
        name: `早餐：即食燕麥粥與沖泡早餐（${bPortions} 份）`,
        category: '食物',
        quantity: bPortions,
        unitWeight: 150,
      });
    }
    if (lPortions > 0) {
      foodItems.push({
        id: `preset-${mode}-${nights}n-food-l`,
        name: `午餐：行進糧、能量棒與堅果肉乾（${lPortions} 份）`,
        category: '食物',
        quantity: lPortions,
        unitWeight: 150,
      });
    }
    if (dPortions > 0) {
      foodItems.push({
        id: `preset-${mode}-${nights}n-food-d`,
        name: `晚餐：高山脫水乾燥飯（${dPortions} 包）`,
        category: '食物',
        quantity: dPortions,
        unitWeight: 200,
      });
    }

    const items = [...baseItems, ...foodItems];
    const totalG = items.reduce((sum, i) => sum + i.quantity * i.unitWeight, 0);
    const kg = parseFloat((totalG / 1000).toFixed(2));
    const isMultipleOf500 = totalG % 500 === 0;
    const kgDisplay = isMultipleOf500 ? `${kg} 公斤` : `約 ${kg} 公斤`;
    const label = `${days} 天 ${nights} 夜｜${kgDisplay}`;
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
