const CACHE_PREFIX = 'tenkigo-climate-v1:';

const FOUR_SEASONS = {
  spring: '春 · Spring',
  summer: '夏 · Summer',
  autumn: '秋 · Autumn',
  winter: '冬 · Winter',
};

function getHemisphereSeason(month, latitude) {
  // Balik bulan musim untuk belahan bumi selatan
  const adjustedMonth = latitude < 0
    ? ((month + 5) % 12) + 1
    : month;

  if (adjustedMonth >= 3 && adjustedMonth <= 5) {
    return { key: 'spring', label: FOUR_SEASONS.spring };
  }
  if (adjustedMonth >= 6 && adjustedMonth <= 8) {
    return { key: 'summer', label: FOUR_SEASONS.summer };
  }
  if (adjustedMonth >= 9 && adjustedMonth <= 11) {
    return { key: 'autumn', label: FOUR_SEASONS.autumn };
  }

  return { key: 'winter', label: FOUR_SEASONS.winter };
}

function classifyClimate(month, latitude, normals) {
  const annualRain = normals.reduce((sum, item) => sum + item.rain, 0);
  const current = normals[month - 1];

  // Perkiraan sederhana untuk wilayah yang sangat kering
  if (annualRain < 250) {
    return { key: 'arid', label: 'Iklim Kering · Dry Climate' };
  }

  const tropical = normals.every((item) => item.temp >= 18);

  if (tropical) {
    // Tidak ada bulan kering yang jelas
    if (normals.every((item) => item.rain >= 60)) {
      return {
        key: 'equatorial',
        label: 'Tropis · Hujan Sepanjang Tahun',
      };
    }

    // Ambang hujan bulanan ini hanya perkiraan untuk musim lokal
    if (current.rain >= 60) {
      return { key: 'wet', label: 'Musim Basah · Wet Season' };
    }
    if (current.rain >= 40) {
      return { key: 'transition', label: 'Peralihan · Transition' };
    }

    return { key: 'dry', label: 'Musim Kering · Dry Season' };
  }

  return getHemisphereSeason(month, latitude);
}

async function fetchMonthlyNormals(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    start_date: '1991-01-01',
    end_date: '2020-12-31',
    daily: 'temperature_2m_mean,precipitation_sum',
    timezone: 'auto',
  });

  const response = await fetch(
    `https://archive-api.open-meteo.com/v1/archive?${params}`
  );

  if (!response.ok) {
    throw new Error(`Climate data request failed: ${response.status}`);
  }

  const data = await response.json();
  const months = Array.from({ length: 12 }, () => ({
    tempTotal: 0,
    rainTotal: 0,
    days: 0,
  }));

  for (let i = 0; i < data.daily.time.length; i += 1) {
    const month = Number(data.daily.time[i].slice(5, 7)) - 1;
    const temp = data.daily.temperature_2m_mean[i];
    const rain = data.daily.precipitation_sum[i];

    if (!Number.isFinite(temp) || !Number.isFinite(rain)) continue;

    months[month].tempTotal += temp;
    months[month].rainTotal += rain;
    months[month].days += 1;
  }

  return months.map((item) => ({
    temp: item.days ? item.tempTotal / item.days : 0,
    // 1991–2020 mencakup 30 tahun
    rain: item.rainTotal / 30,
  }));
}

export async function getLocalSeason(month, latitude, longitude) {
  const cacheKey = `${CACHE_PREFIX}${latitude.toFixed(1)},${longitude.toFixed(1)}`;

  try {
    const cached = sessionStorage.getItem(cacheKey);
    const normals = cached
      ? JSON.parse(cached)
      : await fetchMonthlyNormals(latitude, longitude);

    if (!cached) {
      sessionStorage.setItem(cacheKey, JSON.stringify(normals));
    }

    return classifyClimate(month, latitude, normals);
  } catch (error) {
    console.warn('Local climate unavailable; using hemisphere season:', error);
    return getHemisphereSeason(month, latitude);
  }
}