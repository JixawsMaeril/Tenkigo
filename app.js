/**
 * app.js — Tenkigo Weather Board · Entry Point
 *
 * Orchestrates:
 *  1. Geolocation → weather fetch (or fallback to Tokyo)
 *  2. Tenkigo matching via month + condition code
 *  3. UI rendering: postcard, theme, weather strip
 *  4. City search interaction
 */

import { fetchWeather, fetchWeatherByCity } from './js/weather.js';
import { getTenkigo } from './js/tenkigo.js';
import {
  renderPostcard,
  renderWeather,
  applyTheme,
  showPostcard,
  hidePostcard,
  hideLoading,
  setupCopyHandler,
  showError,
} from './js/ui.js';

// ──────────────────────────────────────────────
//  INIT
// ──────────────────────────────────────────────

async function init() {
  setupCopyHandler();
  setupSearch();

  // Try geolocation, fall back to Tokyo
  if ('geolocation' in navigator) {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 8000,
          maximumAge: 300000, // cache for 5 min
        });
      });
      const weather = await fetchWeather(pos.coords.latitude, pos.coords.longitude);
      present(weather);
    } catch (geoErr) {
      console.warn('Geolocation unavailable:', geoErr.message);
      await fallbackToDefault();
    }
  } else {
    await fallbackToDefault();
  }
}

async function fallbackToDefault() {
  try {
    const weather = await fetchWeatherByCity('Tokyo');
    present(weather);
  } catch {
    presentError('Could not reach the weather service');
  }
}

// ──────────────────────────────────────────────
//  PRESENT DATA
// ──────────────────────────────────────────────

function present(weather) {
  const month = weather.localMonth;
  const tenkigo = getTenkigo(month, weather.conditionCode);

  applyTheme(weather.conditionCode, month, weather.latitude);
  renderPostcard(tenkigo);
  renderWeather(weather);
  hideLoading();
  showPostcard();
}

function presentError(message) {
  hideLoading();
  renderPostcard({
    kanji: '風',
    romaji: 'Kaze',
    meaning: message,
    seasonLabel: '',
  });
  renderWeather({ cityName: '—', temp: '—' });
  showPostcard();
}

// ──────────────────────────────────────────────
//  CITY SEARCH
// ──────────────────────────────────────────────

function setupSearch() {
  const form  = document.getElementById('search-form');
  const input = document.getElementById('city-input');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city) return;

    try {
      // Fade out, fetch, fade in
      await hidePostcard();
      const weather = await fetchWeatherByCity(city);
      present(weather);
      input.value = '';
      input.blur();
    } catch {
      showPostcard(); // restore the card if it was hidden
      showError('City not found — please try again');
    }
  });
}

// ──────────────────────────────────────────────
//  GO
// ──────────────────────────────────────────────
init();
