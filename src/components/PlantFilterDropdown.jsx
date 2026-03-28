import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { myPlants } from '../data/mockData';

export default function PlantFilterDropdown({ selectedPlant, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1.5 bg-green-50 border border-green-200 rounded-lg text-sm"
      >
        {selectedPlant ? (
          <>
            <span className="text-base">{selectedPlant.emoji}</span>
            <span className="text-green-700 font-medium text-xs max-w-[60px] truncate">
              {selectedPlant.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(null);
              }}
              className="ml-0.5 text-green-400 hover:text-green-600"
            >
              <X size={12} />
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-500 text-xs">Filter</span>
            <ChevronDown size={14} className="text-gray-400" />
          </>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
          <div className="px-3 py-2 text-[11px] text-gray-400 uppercase font-semibold tracking-wide border-b border-gray-50">
            Filter by plant
          </div>
          {myPlants.map((plant) => (
            <button
              key={plant.id}
              onClick={() => {
                onSelect(plant);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-green-50 transition-colors ${
                selectedPlant?.id === plant.id ? 'bg-green-50' : ''
              }`}
            >
              <span className="text-xl">{plant.emoji}</span>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-800">
                  {plant.name}
                </div>
                <div className="text-[11px] text-gray-400">
                  {plant.species}
                </div>
              </div>
              {selectedPlant?.id === plant.id && (
                <span className="ml-auto text-green-500 text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
