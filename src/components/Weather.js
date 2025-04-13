'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import { OPEN_METEO_API_URL, OPEN_METEO_GEO_URL, WMO_CODES } from '../config/api';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearch, setLastSearch] = useState('');

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setLastSearch(city);

    try {
      // Step 1: Get the location coordinates using the geocoding API
      const geoResponse = await fetch(
        `${OPEN_METEO_GEO_URL}?name=${encodeURIComponent(city)}&count=1`
      );
      
      if (!geoResponse.ok) {
        throw new Error(`Geocoding API error: ${geoResponse.status}`);
      }
      
      const geoData = await geoResponse.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${city}" not found`);
      }
      
      const location = geoData.results[0];
      
      // Step 2: Fetch weather data using the coordinates
      const weatherResponse = await fetch(
        `${OPEN_METEO_API_URL}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m&timezone=auto`
      );
      
      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }
      
      const weatherRawData = await weatherResponse.json();
      
      // Step 3: Format the data to match our WeatherDisplay component
      const weatherCode = weatherRawData.current.weather_code;
      const weatherInfo = WMO_CODES[weatherCode] || { description: 'Unknown', icon: '02d' };
      
      const formattedData = {
        name: location.name,
        sys: { country: location.country },
        main: {
          temp: weatherRawData.current.temperature_2m,
          feels_like: weatherRawData.current.apparent_temperature,
          humidity: weatherRawData.current.relative_humidity_2m,
          pressure: weatherRawData.current.surface_pressure
        },
        wind: {
          speed: weatherRawData.current.wind_speed_10m
        },
        weather: [{
          description: weatherInfo.description,
          icon: weatherInfo.icon
        }],
        units: {
          temperature: weatherRawData.current_units.temperature_2m,
          wind: weatherRawData.current_units.wind_speed_10m
        }
      };
      
      setWeatherData(formattedData);
      toast.success(`Weather information for ${location.name} loaded successfully!`);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      const errorMessage = err.message || 'Failed to fetch weather data. Please check the city name and try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <SearchBar onSearch={handleSearch} />
      
      {loading && (
        <div className="animate-fadeIn w-full flex flex-col items-center justify-center p-8">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
            <div className="animate-ping absolute inset-0 rounded-full bg-blue-400 opacity-20"></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading weather for {lastSearch}...
          </p>
        </div>
      )}
      
      {error && !loading && (
        <div className="animate-fadeIn w-full">
          <div className="bg-red-100 dark:bg-red-900/30 backdrop-blur-sm border border-red-400 dark:border-red-500 text-red-700 dark:text-red-300 px-6 py-5 rounded-lg mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
          <div className="text-center">
            <button 
              onClick={() => setError(null)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )}
      
      {weatherData && !loading && (
        <div className="animate-fadeIn w-full">
          <WeatherDisplay weatherData={weatherData} />
        </div>
      )}
      
      {!weatherData && !loading && !error && (
        <div className="text-center mt-16 mb-8">
          <div className="mb-6 opacity-80">
            <CloudIcon className="w-20 h-20 mx-auto text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Search for your city
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Enter a city name above to see the current weather
          </p>
        </div>
      )}
    </div>
  );
}

function CloudIcon({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
      />
    </svg>
  );
}