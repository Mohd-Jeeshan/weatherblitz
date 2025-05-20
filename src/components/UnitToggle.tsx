import React from 'react';
import { TemperatureUnit } from '../types/weather';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onChange }) => {
  return (
    <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-xl p-1">
      <button
        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
          unit === 'celsius'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white'
        }`}
        onClick={() => onChange('celsius')}
      >
        °C
      </button>
      <button
        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
          unit === 'fahrenheit'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white'
        }`}
        onClick={() => onChange('fahrenheit')}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;