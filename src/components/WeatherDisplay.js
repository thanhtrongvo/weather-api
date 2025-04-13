'use client';

import Image from 'next/image';
import { WEATHER_ICON_URL } from '../config/api';

export default function WeatherDisplay({ weatherData }) {
  if (!weatherData) return null;

  // Temperature should already be in Celsius from Open-Meteo
  const temperature = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const iconUrl = `${WEATHER_ICON_URL}/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {weatherData.name}, {weatherData.sys.country}
        </h2>
      </div>

      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="relative h-16 w-16">
          <Image
            src={iconUrl}
            alt={weatherData.weather[0].description}
            fill
            className="object-contain"
          />
        </div>
        <div className="text-4xl font-bold">{temperature}°{weatherData.units?.temperature || 'C'}</div>
      </div>

      <div className="text-center mb-4">
        <p className="text-lg capitalize">{weatherData.weather[0].description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-300">Feels Like</p>
          <p className="font-semibold">{feelsLike}°{weatherData.units?.temperature || 'C'}</p>
        </div>
        <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-300">Humidity</p>
          <p className="font-semibold">{weatherData.main.humidity}%</p>
        </div>
        <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-300">Wind Speed</p>
          <p className="font-semibold">{weatherData.wind.speed} {weatherData.units?.wind || 'm/s'}</p>
        </div>
        <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-300">Pressure</p>
          <p className="font-semibold">{weatherData.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}