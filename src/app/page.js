import Weather from '../components/Weather';

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Weather App</h1>
        <p className="text-gray-600 dark:text-gray-400">Check the current weather in any city</p>
      </header>
      
      <main className="w-full max-w-2xl">
        <Weather />
      </main>
      
      <footer className="mt-auto pt-8 text-center text-sm text-gray-500">
        <p>Weather data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
}
