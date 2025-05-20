import { WeatherCondition } from '../types/weather';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const getDayOfWeek = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
};

export const getFormattedTime = () => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date());
};

export const getBackgroundGradient = (condition: WeatherCondition, isDay: boolean = true) => {
  if (!isDay) {
    return 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900';
  }

  switch (condition) {
    case 'clear':
      return 'bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500';
    case 'partly-cloudy':
      return 'bg-gradient-to-br from-blue-400 via-sky-300 to-indigo-400';
    case 'cloudy':
    case 'overcast':
      return 'bg-gradient-to-br from-slate-500 via-slate-400 to-slate-600';
    case 'rain':
    case 'drizzle':
      return 'bg-gradient-to-br from-slate-700 via-blue-600 to-slate-800';
    case 'thunderstorm':
      return 'bg-gradient-to-br from-slate-900 via-purple-800 to-slate-800';
    case 'snow':
    case 'sleet':
    case 'ice':
      return 'bg-gradient-to-br from-blue-200 via-slate-100 to-blue-300';
    case 'fog':
    case 'mist':
      return 'bg-gradient-to-br from-gray-400 via-slate-300 to-gray-500';
    default:
      return 'bg-gradient-to-br from-blue-600 via-indigo-500 to-blue-700';
  }
};

export const getWeatherCondition = (code: number): WeatherCondition => {
  // WeatherAPI.com condition codes
  // Clear/Sunny
  if (code === 1000) return 'clear';
  
  // Partly cloudy
  if (code === 1003) return 'partly-cloudy';
  
  // Cloudy / Overcast
  if ([1006, 1009].includes(code)) return 'cloudy';
  
  // Mist / Fog
  if ([1030, 1135, 1147].includes(code)) return 'fog';
  
  // Rain / Drizzle
  if ([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code)) 
    return 'rain';
  
  // Snow
  if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) 
    return 'snow';
  
  // Sleet
  if ([1069, 1204, 1207, 1249, 1252].includes(code)) 
    return 'sleet';
  
  // Thunderstorm
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) 
    return 'thunderstorm';
  
  // Ice
  if ([1072, 1237].includes(code)) 
    return 'ice';
  
  return 'default';
};