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

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

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
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {weatherData && !loading && <WeatherDisplay weatherData={weatherData} />}
      
      {!weatherData && !loading && !error && (
        <div className="text-center text-gray-500 mt-8">
          <p>Enter a city name to see the current weather</p>
        </div>
      )}
    </div>
  );
}