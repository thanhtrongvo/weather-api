'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="relative flex items-center transition-all duration-300 group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
        <div className="relative flex items-center w-full overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="w-full py-4 px-6 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 text-lg"
            aria-label="City name"
          />
          <button
            type="submit"
            className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-r-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            <SearchIcon className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={`h-5 w-5 ${className}`} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  );
}