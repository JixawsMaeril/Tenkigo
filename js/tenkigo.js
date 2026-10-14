/**
 * tenkigo.js — Tenkigo Dictionary & Season-Matching Engine
 *
 * Contains a curated dictionary of Japanese poetic weather words (季語 / kigo)
 * organised by season and weather condition. Exports getTenkigo() which maps
 * a month + OWM condition code to a single poetic entry.
 */

// ──────────────────────────────────────────────
//  TENKIGO DICTIONARY
// ──────────────────────────────────────────────

const DICT = {

  // ─── SPRING 春 (March, April, May) ───
  spring: {
    clear: [
      { kanji: '花日和', romaji: 'Hanabiyori', meaning: 'Perfect weather for cherry blossoms' },
      { kanji: '春光',   romaji: 'Shunkō',    meaning: 'Radiant spring light across the fields' },
      { kanji: '風光る', romaji: 'Kaze Hikaru', meaning: 'The wind itself seems to shine' },
    ],
    rain: [
      { kanji: '春雨',    romaji: 'Harusame',     meaning: 'Gentle, nourishing spring rain' },
      { kanji: '花の雨',  romaji: 'Hana no Ame',  meaning: 'Rain falling softly on the blossoms' },
      { kanji: '菜種梅雨', romaji: 'Natane Tsuyu', meaning: 'Drizzle during the rapeseed bloom' },
    ],
    cloudy: [
      { kanji: '朧',     romaji: 'Oboro',       meaning: 'A hazy, dreamlike spring sky' },
      { kanji: '花曇',   romaji: 'Hanagumori',  meaning: 'Overcast skies of blossom season' },
    ],
    snow: [
      { kanji: '淡雪',   romaji: 'Awayuki',     meaning: 'Faint, fleeting spring snow' },
      { kanji: '名残雪', romaji: 'Nagoriyuki',  meaning: 'The last lingering snow of the season' },
    ],
    thunder: [
      { kanji: '春雷', romaji: 'Shunrai', meaning: 'The first thunder announcing spring' },
    ],
    mist: [
      { kanji: '霞',     romaji: 'Kasumi',    meaning: 'Spring haze drifting over the fields' },
      { kanji: '朧月',   romaji: 'Oborozuki', meaning: 'The moon veiled in spring mist' },
    ],
  },

  // ─── SUMMER 夏 (June, July, August) ───
  summer: {
    clear: [
      { kanji: '炎天',  romaji: 'Enten',     meaning: 'A blazing, endless summer sky' },
      { kanji: '夏空',  romaji: 'Natsuzora', meaning: 'The vast, open summer sky' },
      { kanji: '青嵐',  romaji: 'Aoarashi',  meaning: 'A fresh green breeze through the leaves' },
    ],
    rain: [
      { kanji: '梅雨',    romaji: 'Tsuyu',     meaning: 'The long plum rain season' },
      { kanji: '夕立',    romaji: 'Yūdachi',   meaning: 'A sudden evening rain shower' },
      { kanji: '五月雨',  romaji: 'Samidare',  meaning: 'Endless early summer rains' },
    ],
    cloudy: [
      { kanji: '雲の峰', romaji: 'Kumo no Mine', meaning: 'Towering cloud peaks in the sky' },
      { kanji: '薄曇',   romaji: 'Usugumori',    meaning: 'A thin, gauzy veil of cloud' },
    ],
    snow: [
      { kanji: '万年雪', romaji: 'Mannenyuki', meaning: 'Eternal snow on distant peaks' },
    ],
    thunder: [
      { kanji: '雷',     romaji: 'Kaminari', meaning: 'The mighty voice of thunder' },
      { kanji: '稲妻',   romaji: 'Inazuma',  meaning: 'Lightning flash over the rice fields' },
    ],
    mist: [
      { kanji: '朝靄', romaji: 'Asamoya', meaning: 'Morning mist rising from the earth' },
    ],
  },

  // ─── AUTUMN 秋 (September, October, November) ───
  autumn: {
    clear: [
      { kanji: '秋晴',   romaji: 'Akibare',     meaning: 'A crystal-clear autumn sky' },
      { kanji: '天高し',  romaji: 'Ten Takashi',  meaning: 'The sky stretches endlessly high' },
      { kanji: '秋日和',  romaji: 'Akibiyori',   meaning: 'A fine, gentle autumn day' },
    ],
    rain: [
      { kanji: '秋雨', romaji: 'Akisame', meaning: 'Quiet, contemplative autumn rain' },
      { kanji: '秋霖', romaji: 'Shūrin',  meaning: 'Long, melancholy autumn drizzle' },
    ],
    cloudy: [
      { kanji: '鰯雲',  romaji: 'Iwashigumo', meaning: 'Mackerel clouds scattered across the sky' },
      { kanji: '秋曇',  romaji: 'Akigumori',  meaning: 'A soft grey autumn overcast' },
    ],
    snow: [
      { kanji: '初雪', romaji: 'Hatsuyuki', meaning: 'The very first snow of the year' },
    ],
    thunder: [
      { kanji: '秋雷', romaji: 'Shūrai', meaning: 'Distant thunder rolling through autumn' },
    ],
    mist: [
      { kanji: '霧',     romaji: 'Kiri',     meaning: 'Thick autumn fog in the valleys' },
      { kanji: '秋霧',   romaji: 'Akigiri',  meaning: 'Mist settling across the autumn hills' },
    ],
  },

  // ─── WINTER 冬 (December, January, February) ───
  winter: {
    clear: [
      { kanji: '冬晴',   romaji: 'Fuyubare',   meaning: 'A crisp, clear winter sky' },
      { kanji: '冬日和',  romaji: 'Fuyubiyori', meaning: 'A mild, peaceful winter day' },
      { kanji: '寒月',   romaji: 'Kangetsu',   meaning: 'The cold moon hanging low' },
    ],
    rain: [
      { kanji: '氷雨',     romaji: 'Hisame',        meaning: 'Cold, biting rain turning to ice' },
      { kanji: '冬の雨',   romaji: 'Fuyu no Ame',   meaning: 'A steady, cold winter rain' },
    ],
    cloudy: [
      { kanji: '冬曇',  romaji: 'Fuyugumori', meaning: 'Heavy grey winter overcast' },
      { kanji: '雪曇',  romaji: 'Yukigumori', meaning: 'Clouds heavy with coming snow' },
    ],
    snow: [
      { kanji: '粉雪',  romaji: 'Konayuki',     meaning: 'Powder snow falling softly' },
      { kanji: '吹雪',  romaji: 'Fubuki',       meaning: 'A fierce, swirling blizzard' },
      { kanji: '細雪',  romaji: 'Sasame Yuki',  meaning: 'Fine, delicate flakes of snow' },
    ],
    thunder: [
      { kanji: '鰤起こし', romaji: 'Buriokoshi', meaning: 'Winter thunder heralding the yellowtail' },
    ],
    mist: [
      { kanji: '冬霧', romaji: 'Fuyugiri', meaning: 'Cold, still fog of winter' },
    ],
  },
};

// ──────────────────────────────────────────────
//  SEASON LABELS (for UI display)
// ──────────────────────────────────────────────

const SEASON_LABELS = {
  spring: '春 · Spring',
  summer: '夏 · Summer',
  autumn: '秋 · Autumn',
  winter: '冬 · Winter',
};

// ──────────────────────────────────────────────
//  HELPER: month → season
// ──────────────────────────────────────────────

function monthToSeason(month) {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter'; // 12, 1, 2
}

// ──────────────────────────────────────────────
//  HELPER: OWM condition code → weather category
// ──────────────────────────────────────────────

function codeToCondition(code) {
  if (code >= 200 && code < 300) return 'thunder';
  if (code >= 300 && code < 400) return 'rain';    // drizzle → rain
  if (code >= 500 && code < 600) return 'rain';
  if (code >= 600 && code < 700) return 'snow';
  if (code >= 700 && code < 800) return 'mist';    // atmosphere group
  if (code === 800)              return 'clear';
  if (code > 800)                return 'cloudy';
  return 'clear'; // fallback
}

// ──────────────────────────────────────────────
//  EXPORT: getTenkigo(month, conditionCode)
// ──────────────────────────────────────────────

/**
 * Returns a Tenkigo entry matching the given month and weather condition.
 *
 * @param {number} month — 1–12
 * @param {number} conditionCode — OpenWeatherMap condition ID
 * @returns {{ kanji: string, romaji: string, meaning: string, season: string, seasonLabel: string }}
 */
export function getTenkigo(month, conditionCode) {
  const season = monthToSeason(month);
  const condition = codeToCondition(conditionCode);
  const entries = DICT[season]?.[condition];

  let entry;
  if (entries && entries.length > 0) {
    // Pick a random entry for variety
    entry = entries[Math.floor(Math.random() * entries.length)];
  } else {
    // Fallback: try the season's 'clear' entries, then a universal default
    const fallbackEntries = DICT[season]?.clear;
    entry = fallbackEntries && fallbackEntries.length > 0
      ? fallbackEntries[0]
      : { kanji: '風', romaji: 'Kaze', meaning: 'The ever-present wind' };
  }

  return {
    ...entry,
    season,
    seasonLabel: SEASON_LABELS[season],
  };
}
