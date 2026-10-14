/**
 * ui.js — DOM Rendering, Theme Switching, Copy-to-Clipboard
 *
 * All direct DOM manipulation lives here.
 * Other modules call these functions; they never touch the DOM themselves.
 */

// ──────────────────────────────────────────────
//  DOM REFERENCES (cached once)
// ──────────────────────────────────────────────

const $ = (id) => document.getElementById(id);

const els = {
  body:       () => document.body,
  postcard:   () => $('postcard'),
  kanjiChar:  () => $('kanji-char'),
  kanjiArea:  () => $('kanji-display'),
  romaji:     () => $('romaji'),
  meaning:    () => $('meaning'),
  cityName:   () => $('city-name'),
  temperature:() => $('temperature'),
  seasonLabel:() => $('season-label'),
  toast:      () => $('copy-toast'),
  errorMsg:   () => $('error-msg'),
  overlay:    () => $('loading-overlay'),
  countryName:() => $('country-name'),
};

// ──────────────────────────────────────────────
//  THEME: map condition code → data-theme value
// ──────────────────────────────────────────────

function getTheme(code) {
  if (code >= 200 && code < 300) return 'thunder';
  if (code >= 300 && code < 400) return 'rain';
  if (code >= 500 && code < 600) return 'rain';
  if (code >= 600 && code < 700) return 'snow';
  if (code >= 700 && code < 800) return 'mist';
  if (code === 800)              return 'clear';
  if (code > 800)                return 'cloudy';
  return 'clear';
}

// ──────────────────────────────────────────────
//  PUBLIC API
// ──────────────────────────────────────────────

/** Render the Tenkigo postcard content. */
export function renderPostcard(tenkigo) {
  els.kanjiChar().textContent   = tenkigo.kanji;
  els.romaji().textContent      = tenkigo.romaji;
  els.meaning().textContent     = tenkigo.meaning;
  els.seasonLabel().textContent = tenkigo.seasonLabel || '';
}

/** Render the weather strip (city + temperature). */
export function renderWeather(weather) {
  els.cityName().textContent    = weather.cityName;
  els.temperature().textContent = `${weather.temp}°`;
}

/** Apply the weather theme to the body background. */
export function applyTheme(conditionCode, month, latitude) {
  const theme = getTheme(conditionCode);

  // Balik musim kalender untuk kota di belahan bumi selatan
  const seasonMonth = latitude < 0
    ? ((month + 5) % 12) + 1
    : month;

  const season = seasonMonth >= 3 && seasonMonth <= 5 ? 'spring'
    : seasonMonth >= 6 && seasonMonth <= 8 ? 'summer'
    : seasonMonth >= 9 && seasonMonth <= 11 ? 'autumn'
    : 'winter';

  els.body().dataset.theme = theme;
  els.body().dataset.season = season;
}

/** Fade the postcard in. */
export function showPostcard() {
  els.postcard().classList.add('visible');
}

/** Fade the postcard out and return a promise that resolves after the transition. */
export function hidePostcard() {
  els.postcard().classList.remove('visible');
  return new Promise((resolve) => setTimeout(resolve, 500));
}

/** Hide the loading overlay with a fade. */
export function hideLoading() {
  els.overlay().classList.add('hidden');
}

/** Show the loading overlay. */
export function showLoading() {
  els.overlay().classList.remove('hidden');
}

/** Flash a brief error message near the top of the page. */
export function showError(message) {
  const el = els.errorMsg();
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

// ──────────────────────────────────────────────
//  COPY-TO-CLIPBOARD HANDLER
// ──────────────────────────────────────────────

/** Attach click & keyboard listeners for copy interaction. */
export function setupCopyHandler() {
  const kanjiArea = els.kanjiArea();
  const toast = els.toast();

  const doCopy = async () => {
    const text = els.kanjiChar().textContent;
    if (!text || text === '—') return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for non-HTTPS or older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    // Show toast
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  };

  kanjiArea.addEventListener('click', doCopy);
  kanjiArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      doCopy();
    }
  });
}
