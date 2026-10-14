# Tenkigo — 天気語

Tenkigo is a minimal weather web app that pairs current weather conditions with Japanese weather vocabulary. It also displays a local climate or season label based on the selected city's location and climate data.

The name combines **Tenki** (weather) and **Go** (language).

## Features

- View the current temperature and weather for your location or a searched city.
- See a Japanese weather-related word with its kanji, romaji, and English meaning.
- Display a local climate or season label for the selected location.
- Change the page's color theme based on current weather conditions.
- Copy the displayed kanji by clicking or focusing on it and pressing Enter.
- Search for cities around the world.

## Climate and Season Labels

Tenkigo adapts the label to the selected location. Temperate locations can display the familiar four seasons, while tropical locations can display labels such as wet season, dry season, transition, or year-round tropical rainfall.

Climate labels are estimates based on historical monthly temperature and rainfall data. They are intended as a general guide and may not match every local meteorological definition.

## Data Sources

- **Current weather:** [OpenWeatherMap](https://openweathermap.org/)
- **Historical climate data:** [Open-Meteo Archive API](https://open-meteo.com/en/docs/historical-weather-api)

## Getting Started

Tenkigo is a client-side web app built with HTML, CSS, and vanilla JavaScript. It does not require a build step.

1. Clone or download this repository.
2. Create an OpenWeatherMap API key.
3. Open `js/weather.js` and set the key in the `API_KEY` constant:

   ```js
   const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
