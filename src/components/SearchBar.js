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
    <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
      <div className="flex items-center border rounded-lg overflow-hidden shadow-md">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="w-full py-3 px-4 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}