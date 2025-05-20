import { useState, useEffect, useCallback } from 'react';
import { WeatherData, LocationData } from '../types/weather';
import { getWeatherCondition } from '../utils/weatherHelpers';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const fetchWeather = useCallback(async (query: string) => {
    if (!API_KEY) {
      setError('Weather API key is not configured. Please check your environment variables.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=5&aqi=no&alerts=yes`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Unable to connect to the weather service. Please check your internet connection and try again.');
      } else {
        setError((err as Error).message);
      }
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchLocations = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setLocations([]);
      return;
    }

    if (!API_KEY) {
      console.error('Weather API key is not configured');
      setLocations([]);
      return;
    }
    
    try {
      setSearchLoading(true);
      setError(null);
      
      const response = await fetch(
        `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to search locations');
      }
      
      const data = await response.json();
      setLocations(data.map((item: any) => ({
        name: item.name,
        country: item.country,
        lat: item.lat,
        lon: item.lon
      })));
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Unable to connect to the location search service. Please check your internet connection and try again.');
      } else {
        setError((err as Error).message);
      }
      console.error('Error searching locations:', err);
      setLocations([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const getUserLocation = useCallback(() => {
    if (!API_KEY) {
      setError('Weather API key is not configured. Please check your environment variables.');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Unable to get your location. Please search for a city manually.');
          // Default to a major city if geolocation fails
          fetchWeather('London');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Please search for a city manually.');
      // Default to a major city if geolocation is not supported
      fetchWeather('London');
    }
  }, [fetchWeather]);

  const getWeatherConditionFromCode = useCallback((code: number) => {
    return getWeatherCondition(code);
  }, []);

  return {
    weather,
    loading,
    error,
    locations,
    searchLoading,
    fetchWeather,
    searchLocations,
    getUserLocation,
    getWeatherConditionFromCode
  };
};