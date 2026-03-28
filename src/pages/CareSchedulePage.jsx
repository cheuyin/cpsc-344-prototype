import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { careSchedulePresets } from '../data/mockData';
import { useApp } from '../context/AppContext';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const RECURRENCE_OPTIONS = [
  { label: 'Every day', value: 'daily' },
  { label: 'Every 3 days', value: 'every3' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Every 2 weeks', value: 'biweekly' },
  { label: 'Monthly', value: 'monthly' },
];

const TIME_OPTIONS = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM',
];

const COLOR_MAP = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700', dot: 'bg-cyan-500' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  red: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
};

export default function CareSchedulePage() {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const { plants, getSchedules, setPlantSchedules } = useApp();

  const plant = plants.find((p) => p.id === plantId);

  const schedules = getSchedules(plantId);

  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 26));
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    careType: 'care-water',
    recurrence: 'weekly',
    time: '9:00 AM',
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date(2026, 2, 26);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1));

  const scheduledDates = useMemo(() => {
    const dates = new Map();
    schedules.forEach((s) => {
      const preset = careSchedulePresets.find((p) => p.id === s.careType);
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        let show = false;
        if (s.recurrence === 'daily') show = true;
        else if (s.recurrence === 'every3') show = d % 3 === 1;
        else if (s.recurrence === 'weekly') show = date.getDay() === 1;
        else if (s.recurrence === 'biweekly') show = date.getDay() === 1 && (Math.ceil(d / 7) % 2 === 1);
        else if (s.recurrence === 'monthly') show = d === 1;

        if (show && preset) {
          const key = `${year}-${month}-${d}`;
          if (!dates.has(key)) dates.set(key, []);
          dates.get(key).push(preset);
        }
      }
    });
    return dates;
  }, [schedules, year, month, daysInMonth]);

  const selectedKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
  const selectedEvents = scheduledDates.get(selectedKey) || [];

  const handleAddSchedule = () => {
    const id = `s-${Date.now()}`;
    const updated = [
      ...schedules,
      { ...newSchedule, id, startDate: selectedDate.toISOString().split('T')[0] },
    ];
    setPlantSchedules(plantId, updated);
    setShowAddModal(false);
    setNewSchedule({ careType: 'care-water', recurrence: 'weekly', time: '9:00 AM' });
  };

  const handleRemoveSchedule = (id) => {
    setPlantSchedules(plantId, schedules.filter((s) => s.id !== id));
  };

  if (!plant) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400 text-sm">Plant not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <button
          onClick={() => navigate(`/profile/plant/${plantId}`)}
          className="text-green-600 -ml-1"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-lg">{plant.emoji}</span>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">
              {plant.nickname}'s Schedule
            </h1>
            <p className="text-[10px] text-gray-400">{plant.species}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Calendar */}
        <div className="bg-white px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={prevMonth} className="p-1 text-gray-400 hover:text-gray-600">
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-semibold text-gray-800">
              {MONTHS[month]} {year}
            </span>
            <button onClick={nextMonth} className="p-1 text-gray-400 hover:text-gray-600">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0 mb-1">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-11" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateKey = `${year}-${month}-${day}`;
              const events = scheduledDates.get(dateKey) || [];
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected =
                day === selectedDate.getDate() &&
                month === selectedDate.getMonth() &&
                year === selectedDate.getFullYear();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(year, month, day))}
                  className={`h-11 flex flex-col items-center justify-center rounded-xl transition-colors relative ${
                    isSelected
                      ? 'bg-green-500 text-white'
                      : isToday
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xs font-medium">{day}</span>
                  {events.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {events.slice(0, 3).map((ev, j) => (
                        <div
                          key={j}
                          className={`w-1 h-1 rounded-full ${
                            isSelected ? 'bg-white' : COLOR_MAP[ev.color]?.dot || 'bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected date events */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 text-green-600 text-xs font-semibold"
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          {selectedEvents.length > 0 ? (
            <div className="space-y-2">
              {selectedEvents.map((ev, i) => {
                const schedule = schedules.find((s) => s.careType === ev.id);
                const colors = COLOR_MAP[ev.color] || COLOR_MAP.blue;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl ${colors.bg}`}
                  >
                    <span className="text-lg">{ev.emoji}</span>
                    <div className="flex-1">
                      <div className={`text-xs font-semibold ${colors.text}`}>
                        {ev.label}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {schedule?.time || '9:00 AM'} ·{' '}
                        {RECURRENCE_OPTIONS.find((r) => r.value === schedule?.recurrence)?.label || 'Weekly'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-2xl mb-2">📅</div>
              <p className="text-xs text-gray-400">No care scheduled for this day</p>
            </div>
          )}
        </div>

        {/* Active schedules summary */}
        <div className="px-4 py-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Active Schedules
          </h3>
          {schedules.length > 0 ? (
            <div className="space-y-2">
              {schedules.map((s) => {
                const preset = careSchedulePresets.find((p) => p.id === s.careType);
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
                  >
                    <span className="text-base">{preset?.emoji}</span>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-gray-800">
                        {preset?.label}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {RECURRENCE_OPTIONS.find((r) => r.value === s.recurrence)?.label} at {s.time}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSchedule(s.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center py-4">
              No schedules yet. Tap "+ Add" to create one.
            </p>
          )}
        </div>

        <div className="h-4" />
      </div>

      {/* Add schedule modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 flex items-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative w-full bg-white rounded-t-3xl p-4 pb-6 max-h-[75%] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">
                New Care Schedule
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-600 mb-2 block">
                Care type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {careSchedulePresets.map((p) => {
                  const colors = COLOR_MAP[p.color] || COLOR_MAP.blue;
                  const selected = newSchedule.careType === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() =>
                        setNewSchedule((prev) => ({ ...prev, careType: p.id }))
                      }
                      className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 transition-all ${
                        selected
                          ? `${colors.bg} border-current ${colors.text}`
                          : 'bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{p.emoji}</span>
                      <span className="text-[10px] font-semibold">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-600 mb-2 block">
                Repeat
              </label>
              <div className="space-y-1.5">
                {RECURRENCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() =>
                      setNewSchedule((prev) => ({ ...prev, recurrence: opt.value }))
                    }
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors ${
                      newSchedule.recurrence === opt.value
                        ? 'bg-green-50 text-green-700 font-semibold'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {opt.label}
                    {newSchedule.recurrence === opt.value && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-gray-600 mb-2 block">
                Reminder time
              </label>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {TIME_OPTIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() =>
                      setNewSchedule((prev) => ({ ...prev, time: t }))
                    }
                    className={`shrink-0 px-3 py-2 rounded-xl text-[11px] font-medium transition-colors ${
                      newSchedule.time === t
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddSchedule}
              className="w-full py-3 bg-green-500 text-white rounded-2xl text-sm font-semibold hover:bg-green-600 active:bg-green-700 transition-colors"
            >
              Add Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
