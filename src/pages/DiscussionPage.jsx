import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import PlantFilterDropdown from '../components/PlantFilterDropdown';
import ThreadCard from '../components/ThreadCard';
import { threads, followingThreads } from '../data/mockData';

export default function DiscussionPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-plants');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlant, setSelectedPlant] = useState(null);

  const filteredThreads = useMemo(() => {
    let source = activeTab === 'my-plants' ? threads : followingThreads;

    // Filter by selected plant
    if (selectedPlant) {
      source = source.filter((t) =>
        t.relatedPlantIds.includes(selectedPlant.id)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      source = source.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.plantTags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return source;
  }, [activeTab, selectedPlant, searchQuery]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-2 pb-0">
        <h1 className="text-xl font-bold text-gray-900 mb-3">Discussion</h1>

        {/* Search bar + plant filter */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <PlantFilterDropdown
            selectedPlant={selectedPlant}
            onSelect={setSelectedPlant}
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('my-plants')}
            className={`flex-1 pb-2.5 text-sm font-semibold transition-colors relative ${
              activeTab === 'my-plants'
                ? 'text-green-600'
                : 'text-gray-400'
            }`}
          >
            My Plants
            {activeTab === 'my-plants' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`flex-1 pb-2.5 text-sm font-semibold transition-colors relative ${
              activeTab === 'following'
                ? 'text-green-600'
                : 'text-gray-400'
            }`}
          >
            Following
            {activeTab === 'following' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              onClick={() => navigate(`/discussion/${thread.id}`)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm text-gray-500 font-medium">
              No threads found
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search or plant filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
