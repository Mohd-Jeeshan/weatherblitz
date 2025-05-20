import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import UnitToggle from './UnitToggle';
import { useWeather } from '../hooks/useWeather';
import { TemperatureUnit } from '../types/weather';
import { getBackgroundGradient, getFormattedTime } from '../utils/weatherHelpers';
import { MapPin, Clock, AlertCircle, Cloud } from 'lucide-react';

const WeatherApp: React.FC = () => {
  const { 
    weather, 
    loading, 
    error, 
    locations,
    searchLoading,
    fetchWeather,
    searchLocations,
    getUserLocation,
    getWeatherConditionFromCode
  } = useWeather();
  
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [time, setTime] = useState(getFormattedTime());
  
  useEffect(() => {
    getUserLocation();
    
    const timer = setInterval(() => {
      setTime(getFormattedTime());
    }, 60000);
    
    return () => clearInterval(timer);
  }, [getUserLocation]);
  
  const handleSearch = (query: string) => {
    searchLocations(query);
  };
  
  const handleLocationSelect = (location: string) => {
    fetchWeather(location);
  };
  
  const handleUnitChange = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
  };
  
  const weatherCondition = weather 
    ? getWeatherConditionFromCode(weather.current.condition.code)
    : 'default';
  
  const backgroundClass = getBackgroundGradient(weatherCondition);
  
  return (
    <div className={`min-h-screen ${backgroundClass} transition-colors duration-1000 ease-in-out`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col items-center">
          <div className="w-full flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Cloud className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">SkyScope</h1>
            </div>
            <SearchBar
              onSearch={handleSearch}
              onLocationSelect={handleLocationSelect}
              locations={locations}
              loading={searchLoading}
              onUseCurrentLocation={getUserLocation}
            />
          </div>
          
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-500/20 backdrop-blur-md text-white p-4 rounded-lg w-full max-w-md flex items-start">
              <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && weather && (
            <>
              <div className="flex items-center justify-between w-full mb-6">
                <div className="flex items-center text-white">
                  <MapPin size={20} className="mr-2" />
                  <h2 className="text-2xl font-medium">
                    {weather.location.name}, {weather.location.country}
                  </h2>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-white/90">
                    <Clock size={16} className="mr-1" />
                    <span>{time}</span>
                  </div>
                  <UnitToggle unit={unit} onChange={handleUnitChange} />
                </div>
              </div>
              
              <div className="w-full mb-8 animate-fadeIn">
                <CurrentWeather 
                  weather={weather} 
                  unit={unit}
                  getWeatherCondition={getWeatherConditionFromCode}
                />
              </div>
              
              <div className="w-full animate-fadeIn">
                <WeatherForecast weather={weather} unit={unit} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;