import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Droplets, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { careSchedulePresets } from '../data/mockData';

export default function MyPlantsPage() {
  const navigate = useNavigate();
  const { plants, getSchedules, activity } = useApp();

  // Count plants that have care scheduled today (any schedule = "needs attention" simplification)
  const plantsNeedingCare = plants.filter(
    (p) => getSchedules(p.id).length > 0
  ).length;

  const recentActivityCount = activity.filter((a) =>
    a.timestamp.startsWith('Today')
  ).length;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <h1 className="text-lg font-bold text-gray-900">My Plants</h1>
        <button
          onClick={() => navigate('/profile/add-plant')}
          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-full"
        >
          <Plus size={14} strokeWidth={2.5} />
          Add Plant
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 px-4 py-3">
          <div className="bg-white rounded-xl px-3 py-2.5 text-center border border-gray-100">
            <div className="text-lg font-bold text-green-600">{plants.length}</div>
            <div className="text-[10px] text-gray-400 font-medium">Total Plants</div>
          </div>
          <div className="bg-white rounded-xl px-3 py-2.5 text-center border border-gray-100">
            <div className="text-lg font-bold text-amber-500">{plantsNeedingCare}</div>
            <div className="text-[10px] text-gray-400 font-medium">With Schedules</div>
          </div>
          <div className="bg-white rounded-xl px-3 py-2.5 text-center border border-gray-100">
            <div className="text-lg font-bold text-blue-500">{recentActivityCount}</div>
            <div className="text-[10px] text-gray-400 font-medium">Cared Today</div>
          </div>
        </div>

        {/* Plant grid */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-4">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              schedules={getSchedules(plant.id)}
              onClick={() => navigate(`/profile/plant/${plant.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlantCard({ plant, schedules, onClick }) {
  // Build a short summary of care types for this plant
  const careTypes = schedules.map((s) => {
    const preset = careSchedulePresets.find((p) => p.id === s.careType);
    return preset ? preset.emoji : null;
  }).filter(Boolean);

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden text-left transition-shadow hover:shadow-md"
    >
      {/* Plant image or emoji fallback */}
      {plant.image ? (
        <img
          src={plant.image}
          alt={plant.nickname}
          className="w-full h-28 object-cover"
        />
      ) : (
        <div className="w-full h-28 bg-green-50 flex items-center justify-center text-4xl">
          {plant.emoji}
        </div>
      )}

      <div className="px-3 py-2.5">
        <div className="text-sm font-bold text-gray-900 truncate">
          {plant.nickname}
        </div>
        <div className="text-[11px] text-gray-400 truncate">{plant.species}</div>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1.5">
          <MapPin size={10} className="text-gray-300" />
          <span className="text-[10px] text-gray-400">{plant.location}</span>
        </div>

        {/* Care indicators */}
        {careTypes.length > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            <Calendar size={10} className="text-green-400" />
            <span className="text-[10px] text-gray-400">
              {careTypes.join(' ')}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
