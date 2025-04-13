// API configuration for Open-Meteo
export const OPEN_METEO_API_URL = 'https://api.open-meteo.com/v1/forecast';
export const OPEN_METEO_GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
export const WMO_CODES = {
  0: { description: 'Clear sky', icon: '01d' },
  1: { description: 'Mainly clear', icon: '02d' },
  2: { description: 'Partly cloudy', icon: '03d' },
  3: { description: 'Overcast', icon: '04d' },
  45: { description: 'Fog', icon: '50d' },
  48: { description: 'Depositing rime fog', icon: '50d' },
  51: { description: 'Light drizzle', icon: '09d' },
  53: { description: 'Moderate drizzle', icon: '09d' },
  55: { description: 'Dense drizzle', icon: '09d' },
  56: { description: 'Light freezing drizzle', icon: '09d' },
  57: { description: 'Dense freezing drizzle', icon: '09d' },
  61: { description: 'Slight rain', icon: '10d' },
  63: { description: 'Moderate rain', icon: '10d' },
  65: { description: 'Heavy rain', icon: '10d' },
  66: { description: 'Light freezing rain', icon: '13d' },
  67: { description: 'Heavy freezing rain', icon: '13d' },
  71: { description: 'Slight snow fall', icon: '13d' },
  73: { description: 'Moderate snow fall', icon: '13d' },
  75: { description: 'Heavy snow fall', icon: '13d' },
  77: { description: 'Snow grains', icon: '13d' },
  80: { description: 'Slight rain showers', icon: '10d' },
  81: { description: 'Moderate rain showers', icon: '10d' },
  82: { description: 'Violent rain showers', icon: '10d' },
  85: { description: 'Slight snow showers', icon: '13d' },
  86: { description: 'Heavy snow showers', icon: '13d' },
  95: { description: 'Thunderstorm', icon: '11d' },
  96: { description: 'Thunderstorm with slight hail', icon: '11d' },
  99: { description: 'Thunderstorm with heavy hail', icon: '11d' },
};

export const WEATHER_ICON_URL = 'https://openweathermap.org/img/wn';