import { createContext, useContext, useState, useCallback } from 'react';
import { myPlants as initialPlants, activityLog as initialActivity, plantPosts as initialPlantPosts } from '../data/mockData';

const AppContext = createContext();

// Default schedules for initial plants
const INITIAL_SCHEDULES = {
  'plant-1': [
    { id: 's1', careType: 'care-water', recurrence: 'weekly', time: '9:00 AM', startDate: '2026-03-01' },
    { id: 's2', careType: 'care-fertilize', recurrence: 'monthly', time: '9:00 AM', startDate: '2026-03-01' },
  ],
  'plant-2': [
    { id: 's3', careType: 'care-water', recurrence: 'weekly', time: '9:00 AM', startDate: '2026-03-01' },
    { id: 's4', careType: 'care-mist', recurrence: 'every3', time: '7:00 AM', startDate: '2026-03-01' },
  ],
  'plant-3': [
    { id: 's5', careType: 'care-water', recurrence: 'biweekly', time: '9:00 AM', startDate: '2026-03-01' },
  ],
  'plant-4': [
    { id: 's6', careType: 'care-water', recurrence: 'biweekly', time: '9:00 AM', startDate: '2026-03-01' },
  ],
};

export function AppProvider({ children }) {
  const [plants, setPlants] = useState(initialPlants);
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const [activity, setActivity] = useState(initialActivity);
  const [plantPostsMap, setPlantPostsMap] = useState(initialPlantPosts);

  const addPlant = useCallback((plantData) => {
    const id = `plant-${Date.now()}`;
    const newPlant = {
      id,
      name: plantData.nickname,
      species: plantData.species,
      emoji: plantData.emoji,
      image: null,
      nickname: plantData.nickname,
      acquiredDate: plantData.acquiredDate || new Date().toISOString().split('T')[0],
      location: plantData.location || '',
    };
    setPlants((prev) => [...prev, newPlant]);
    setSchedules((prev) => ({ ...prev, [id]: [] }));
    setPlantPostsMap((prev) => ({ ...prev, [id]: [] }));
    return id;
  }, []);

  const getSchedules = useCallback(
    (plantId) => schedules[plantId] || [],
    [schedules]
  );

  const setPlantSchedules = useCallback((plantId, newSchedules) => {
    setSchedules((prev) => ({ ...prev, [plantId]: newSchedules }));
  }, []);

  const getPlantPosts = useCallback(
    (plantId) => plantPostsMap[plantId] || [],
    [plantPostsMap]
  );

  return (
    <AppContext.Provider
      value={{
        plants,
        activity,
        addPlant,
        getSchedules,
        setPlantSchedules,
        getPlantPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
