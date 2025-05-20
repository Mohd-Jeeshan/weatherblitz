import React from 'react';
import { WeatherData, TemperatureUnit, WeatherCondition } from '../types/weather';
import { Droplets, Wind, Thermometer, Sun, CloudRain } from 'lucide-react';

interface CurrentWeatherProps {
  weather: WeatherData;
  unit: TemperatureUnit;
  getWeatherCondition: (code: number) => WeatherCondition;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ 
  weather, 
  unit,
  getWeatherCondition
}) => {
  const temp = unit === 'celsius' ? weather.current.temp_c : weather.current.temp_f;
  const feelsLike = unit === 'celsius' ? weather.current.feelslike_c : weather.current.feelslike_f;
  const windSpeed = unit === 'celsius' ? weather.current.wind_kph : weather.current.wind_mph;
  const windUnit = unit === 'celsius' ? 'km/h' : 'mph';
  
  return (
    <div className="text-white">
      <div className="flex flex-col items-center mb-6 md:flex-row md:items-center md:justify-center md:space-x-8">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <img 
            src={weather.current.condition.icon.replace('64x64', '128x128')} 
            alt={weather.current.condition.text}
            className="w-24 h-24 md:w-32 md:h-32"
          />
          <span className="text-xl mt-2 font-light">{weather.current.condition.text}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-6xl md:text-7xl font-thin">
            {Math.round(temp)}°
            <span className="text-2xl align-top">{unit === 'celsius' ? 'C' : 'F'}</span>
          </div>
          <div className="flex items-center mt-2 text-white/80">
            <Thermometer size={16} className="mr-1" />
            <span>Feels like {Math.round(feelsLike)}°</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center">
          <div className="text-white/80 mb-1 flex items-center">
            <Droplets size={16} className="mr-1" />
            <span>Humidity</span>
          </div>
          <div className="text-lg font-medium">{weather.current.humidity}%</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center">
          <div className="text-white/80 mb-1 flex items-center">
            <Wind size={16} className="mr-1" />
            <span>Wind</span>
          </div>
          <div className="text-lg font-medium">{Math.round(windSpeed)} {windUnit}</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center">
          <div className="text-white/80 mb-1 flex items-center">
            <Sun size={16} className="mr-1" />
            <span>UV Index</span>
          </div>
          <div className="text-lg font-medium">{weather.current.uv}</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center">
          <div className="text-white/80 mb-1 flex items-center">
            <CloudRain size={16} className="mr-1" />
            <span>Precipitation</span>
          </div>
          <div className="text-lg font-medium">
            {unit === 'celsius' ? weather.current.precip_mm + ' mm' : weather.current.precip_in + ' in'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;