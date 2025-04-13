'use client';

import Image from 'next/image';
import { WEATHER_ICON_URL } from '../config/api';

export default function WeatherDisplay({ weatherData }) {
  if (!weatherData) return null;

  const temperature = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const iconUrl = `${WEATHER_ICON_URL}/${weatherData.weather[0].icon}@2x.png`;
  
  // Helper function to determine background color based on temperature
  const getTemperatureColor = (temp) => {
    if (temp < 0) return 'bg-blue-100 dark:bg-blue-900';
    if (temp < 10) return 'bg-blue-50 dark:bg-blue-800';
    if (temp < 20) return 'bg-green-50 dark:bg-green-900';
    if (temp < 30) return 'bg-yellow-50 dark:bg-yellow-900';
    return 'bg-orange-50 dark:bg-orange-900';
  };
  
  // Get background color class based on current temperature
  const bgColorClass = getTemperatureColor(temperature);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className={`rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 transition-all duration-500`}>
        {/* Header with location and temperature */}
        <div className={`p-6 ${bgColorClass} bg-opacity-30 dark:bg-opacity-50 transition-colors duration-500`}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div className="flex items-center">
              <div className="relative h-20 w-20 mr-2">
                <Image
                  src={iconUrl}
                  alt={weatherData.weather[0].description}
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-800 dark:text-white">{temperature}°</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{weatherData.units?.temperature || 'C'}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xl capitalize text-gray-700 dark:text-gray-200">
              {weatherData.weather[0].description}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Feels like {feelsLike}°{weatherData.units?.temperature || 'C'}
            </p>
          </div>
        </div>
        
        {/* Weather details grid */}
        <div className="p-6 grid grid-cols-2 gap-4">
          <WeatherDetailCard 
            icon={<HumidityIcon />}
            title="Humidity" 
            value={`${weatherData.main.humidity}%`} 
            description="How much moisture is in the air"
          />
          <WeatherDetailCard 
            icon={<WindIcon />}
            title="Wind Speed" 
            value={`${weatherData.wind.speed} ${weatherData.units?.wind || 'm/s'}`} 
            description="Current wind conditions"
          />
          <WeatherDetailCard 
            icon={<PressureIcon />}
            title="Pressure" 
            value={`${weatherData.main.pressure} hPa`} 
            description="Atmospheric pressure"
          />
          <WeatherDetailCard 
            icon={<ThermometerIcon />}
            title="Feels Like" 
            value={`${feelsLike}° ${weatherData.units?.temperature || 'C'}`} 
            description="What it feels like outside"
          />
        </div>
      </div>
    </div>
  );
}

function WeatherDetailCard({ icon, title, value, description }) {
  return (
    <div className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm rounded-lg p-4 shadow-md transition-transform hover:scale-105 hover:shadow-lg">
      <div className="flex items-start">
        <div className="mr-3 text-blue-500 dark:text-blue-400">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-200">{title}</h3>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white mt-1">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Weather icons
function HumidityIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14.5v.5a5 5 0 0 1-10 0v-.5a8 8 0 0 0 10 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10a5 5 0 0 1-4 0" />
    </svg>
  );
}

function WindIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1 1 11 8H3m16 8a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h1a2 2 0 0 1 2 2zm0 0V9.59a2 2 0 0 0-.59-1.42L17 7" />
    </svg>
  );
}

function PressureIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 0 0 2 2h6M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 8h6" />
    </svg>
  );
}

function ThermometerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </svg>
  );
}