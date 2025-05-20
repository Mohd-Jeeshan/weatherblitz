export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_mph: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
    }>;
  };
}

export interface WeatherError {
  error: {
    code: number;
    message: string;
  };
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export type WeatherCondition = 
  | 'clear' 
  | 'partly-cloudy' 
  | 'cloudy' 
  | 'overcast'
  | 'mist'
  | 'rain'
  | 'snow'
  | 'sleet'
  | 'thunderstorm'
  | 'fog'
  | 'drizzle'
  | 'ice'
  | 'default';

export interface LocationData {
  name: string;
  country: string;
  lat: number;
  lon: number;
}