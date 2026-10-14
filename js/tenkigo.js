/**
 * tenkigo.js — Kamus kata bahasa Jepang untuk menggambarkan cuaca.
 * Kata dipilih berdasarkan kondisi cuaca, bukan berdasarkan musim.
 */

const WEATHER_WORDS = {
  clear: [
    { kanji: '晴天', romaji: 'Seiten', meaning: 'A clear, bright sky' },
    { kanji: '青空', romaji: 'Aozora', meaning: 'A wide blue sky' },
    { kanji: '陽光', romaji: 'Yōkō', meaning: 'Sunlight across the sky' },
  ],
  rain: [
    { kanji: '雨音', romaji: 'Amaoto', meaning: 'The sound of falling rain' },
    { kanji: '小雨', romaji: 'Kosame', meaning: 'A soft, light rain' },
    { kanji: '雨粒', romaji: 'Amatsubu', meaning: 'Raindrops falling from the clouds' },
  ],
  cloudy: [
    { kanji: '曇天', romaji: 'Donten', meaning: 'A sky covered with clouds' },
    { kanji: '雲間', romaji: 'Kumoma', meaning: 'An opening between clouds' },
    { kanji: '薄雲', romaji: 'Usugumo', meaning: 'A thin veil of clouds' },
  ],
  snow: [
    { kanji: '粉雪', romaji: 'Konayuki', meaning: 'Fine, powdery snow' },
    { kanji: '雪片', romaji: 'Seppen', meaning: 'Snowflakes drifting through the air' },
    { kanji: '吹雪', romaji: 'Fubuki', meaning: 'Snow driven by strong winds' },
  ],
  thunder: [
    { kanji: '雷鳴', romaji: 'Raimei', meaning: 'Thunder rolling across the sky' },
    { kanji: '稲妻', romaji: 'Inazuma', meaning: 'A flash of lightning' },
    { kanji: '雷光', romaji: 'Raikō', meaning: 'Lightning illuminating the clouds' },
  ],
  mist: [
    { kanji: '霧', romaji: 'Kiri', meaning: 'Fog veiling the landscape' },
    { kanji: '朝靄', romaji: 'Asamoya', meaning: 'Haze floating in the morning air' },
    { kanji: '濃霧', romaji: 'Nōmu', meaning: 'A thick blanket of fog' },
  ],
};

function codeToWeather(code) {
  if (code >= 200 && code < 300) return 'thunder';
  if (code >= 300 && code < 600) return 'rain';
  if (code >= 600 && code < 700) return 'snow';
  if (code >= 700 && code < 800) return 'mist';
  if (code === 800) return 'clear';
  return 'cloudy';
}

export function getTenkigo(conditionCode) {
  const category = codeToWeather(conditionCode);
  const words = WEATHER_WORDS[category];
  const index = Math.floor(Math.random() * words.length);

  return words[index];
}