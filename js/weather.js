/**
 * weather.js — OpenWeatherMap API wrapper
 * Fetches current weather by coordinates or city name.
 * Returns a normalised object: { temp, conditionCode, conditionMain, cityName }
 */

const API_KEY = 'db9f324fb788ecb797562bee26b14b5c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetch weather by geographic coordinates.
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<{temp:number, conditionCode:number, conditionMain:string, cityName:string}>}
 */
export async function fetchWeather(lat, lon) {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  return normalise(await res.json());
}

/**
 * Fetch weather by city name.
 * @param {string} city
 * @returns {Promise<{temp:number, conditionCode:number, conditionMain:string, cityName:string}>}
 */
export async function fetchWeatherByCity(city) {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`City not found: ${city}`);
  return normalise(await res.json());
}

/**
 * Normalise raw API response into a clean object.
 */
function normalise(data) {
  return {
    temp: Math.round(data.main.temp),
    conditionCode: data.weather[0].id,
    conditionMain: data.weather[0].main,
    cityName: data.name,
    countryName: data.sys?.country || '',

    // Waktu lokal kota berdasarkan data API
    latitude: data.coord.lat,
    longitude: data.coord.lon,
    localMonth: new Date(
      (data.dt + data.timezone) * 1000
    ).getUTCMonth() + 1,
  };
}
