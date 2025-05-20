import React from 'react';
import { TemperatureUnit } from '../types/weather';
import { getDayOfWeek } from '../utils/weatherHelpers';

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface ForecastCardProps {
  forecast: ForecastDay;
  unit: TemperatureUnit;
  isToday?: boolean;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit, isToday = false }) => {
  const maxTemp = unit === 'celsius' ? forecast.day.maxtemp_c : forecast.day.maxtemp_f;
  const minTemp = unit === 'celsius' ? forecast.day.mintemp_c : forecast.day.mintemp_f;
  const dayLabel = isToday ? 'Today' : getDayOfWeek(forecast.date);
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center transition-all hover:bg-white/20">
      <div className="text-white font-medium mb-2">{dayLabel}</div>
      <img 
        src={forecast.day.condition.icon} 
        alt={forecast.day.condition.text} 
        className="w-12 h-12 my-2"
      />
      <div className="flex space-x-2 mt-1">
        <span className="text-white font-medium">{Math.round(maxTemp)}°</span>
        <span className="text-white/70">{Math.round(minTemp)}°</span>
      </div>
    </div>
  );
};

export default ForecastCard;