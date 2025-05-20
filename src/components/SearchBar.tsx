import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { LocationData } from '../types/weather';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationSelect: (location: string) => void;
  locations: LocationData[];
  loading: boolean;
  onUseCurrentLocation: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onLocationSelect,
  locations,
  loading,
  onUseCurrentLocation
}) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
    if (value.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleLocationClick = (location: LocationData) => {
    const locationQuery = `${location.lat},${location.lon}`;
    onLocationSelect(locationQuery);
    setQuery(`${location.name}, ${location.country}`);
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchContainerRef}>
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-500">
          <Search size={18} />
        </div>
        <input
          type="text"
          className="pl-10 pr-10 py-2 w-full rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/70 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          placeholder="Search for a location..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setShowResults(true)}
        />
        {query && (
          <button
            className="absolute right-3 text-white/70 hover:text-white"
            onClick={clearSearch}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute z-10 mt-1 w-full bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border border-white/10 shadow-lg">
          <div className="p-2">
            <button
              className="flex items-center w-full px-3 py-2 rounded-md hover:bg-white/10 text-white transition"
              onClick={onUseCurrentLocation}
            >
              <MapPin size={18} className="mr-2" />
              <span>Use current location</span>
            </button>
            
            {loading && (
              <div className="p-3 text-center text-white/70">
                <div className="animate-pulse">Searching...</div>
              </div>
            )}
            
            {!loading && locations.length === 0 && query && (
              <div className="p-3 text-center text-white/70">
                No locations found
              </div>
            )}
            
            {!loading && locations.map((location, index) => (
              <button
                key={`${location.name}-${location.lat}-${index}`}
                className="flex items-center w-full px-3 py-2 rounded-md hover:bg-white/10 text-white transition"
                onClick={() => handleLocationClick(location)}
              >
                <span className="truncate">
                  {location.name}, {location.country}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;