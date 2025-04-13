import Weather from '../components/Weather';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-yellow-300 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-blue-300 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-purple-300 blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="w-full max-w-4xl z-10 p-8 flex flex-col items-center">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-bold mb-3 text-blue-800 dark:text-blue-300 tracking-tight">
            Weather<span className="text-blue-500">Forecast</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Real-time weather conditions for any city in the world
          </p>
        </header>
        
        <main className="w-full backdrop-blur-sm bg-white/30 dark:bg-gray-800/40 rounded-2xl shadow-xl p-6">
          <Weather />
        </main>
        
        <footer className="mt-auto pt-10 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Weather data provided by Open-Meteo API • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
