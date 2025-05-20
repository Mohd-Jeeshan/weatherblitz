import React from 'react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import ForecastCard from './ForecastCard';

interface WeatherForecastProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ weather, unit }) => {
  return (
    <div className="mt-8">
      <h2 className="text-white text-xl font-medium mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {weather.forecast.forecastday.map((day, index) => (
          <ForecastCard 
            key={day.date} 
            forecast={day} 
            unit={unit} 
            isToday={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;