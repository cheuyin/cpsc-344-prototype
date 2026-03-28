import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Settings, ChevronRight, Heart, MessageCircle, Grid3X3 } from 'lucide-react';
import { currentUser, activityLog, feedPosts } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { plants } = useApp();
  const [plantSearch, setPlantSearch] = useState('');
  const [activeTab, setActiveTab] = useState('posts');

  const filteredPlants = plants.filter(
    (p) =>
      p.name.toLowerCase().includes(plantSearch.toLowerCase()) ||
      p.nickname.toLowerCase().includes(plantSearch.toLowerCase()) ||
      p.species.toLowerCase().includes(plantSearch.toLowerCase())
  );

  // Simulate user's recent posts (reuse some feed posts as "mine")
  const myRecentPosts = feedPosts.slice(0, 6).map((p, i) => ({
    id: `my-${i}`,
    emoji: plants[i % plants.length]?.emoji || '🌱',
    likes: Math.floor(Math.random() * 200) + 20,
    comments: Math.floor(Math.random() * 30) + 2,
  }));

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="bg-white px-4 pt-2 pb-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate('/home')}
              className="text-green-600 -ml-1"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-base font-bold text-gray-900">{currentUser.username}</h1>
            <button className="text-gray-400 hover:text-gray-600">
              <Settings size={20} />
            </button>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700 shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1 flex justify-around text-center">
              <div>
                <div className="text-base font-bold text-gray-900">{currentUser.postsCount}</div>
                <div className="text-[10px] text-gray-500">Posts</div>
              </div>
              <div>
                <div className="text-base font-bold text-gray-900">{currentUser.followersCount}</div>
                <div className="text-[10px] text-gray-500">Followers</div>
              </div>
              <div>
                <div className="text-base font-bold text-gray-900">52</div>
                <div className="text-[10px] text-gray-500">Following</div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h2 className="text-sm font-bold text-gray-900">{currentUser.name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{currentUser.bio}</p>
          </div>

          <button className="w-full py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* My Plants section */}
        <div className="mt-[1px] bg-white px-4 py-3">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-sm font-semibold text-gray-800">
              My Plants ({plants.length})
            </h3>
            <button
              onClick={() => navigate('/profile/add-plant')}
              className="flex items-center gap-1 px-2.5 py-1 bg-green-500 text-white text-xs font-semibold rounded-full hover:bg-green-600 transition-colors"
            >
              <Plus size={13} />
              Add Plant
            </button>
          </div>

          {/* Plant search */}
          <div className="relative mb-3">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search your plants..."
              value={plantSearch}
              onChange={(e) => setPlantSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Horizontal plant list */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {filteredPlants.map((plant) => (
              <button
                key={plant.id}
                onClick={() => navigate(`/profile/plant/${plant.id}`)}
                className="shrink-0 w-[100px] bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-green-200 transition-colors text-center"
              >
                <div className="text-2xl mb-1">{plant.emoji}</div>
                <div className="text-xs font-semibold text-gray-800 truncate">
                  {plant.nickname}
                </div>
                <div className="text-[10px] text-gray-400 truncate">
                  {plant.species}
                </div>
              </button>
            ))}
            {filteredPlants.length === 0 && (
              <p className="text-xs text-gray-400 py-4 text-center w-full">
                No plants match your search
              </p>
            )}
          </div>
        </div>

        {/* Posts / Activity tabs */}
        <div className="mt-[1px] bg-white">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors relative ${
                activeTab === 'posts' ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              <Grid3X3 size={14} />
              Posts
              {activeTab === 'posts' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors relative ${
                activeTab === 'activity' ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              Activity
              {activeTab === 'activity' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 rounded-full" />
              )}
            </button>
          </div>

          {activeTab === 'posts' ? (
            <div className="grid grid-cols-3 gap-[1px] bg-gray-100">
              {myRecentPosts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center relative group"
                >
                  <div className="text-3xl">{post.emoji}</div>
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex items-center gap-3 text-white text-xs font-semibold">
                      <span className="flex items-center gap-1">
                        <Heart size={13} fill="white" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={13} fill="white" /> {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-2">
              {activityLog.map((entry) => {
                const plant = plants.find((p) => p.id === entry.plantId);
                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-base shrink-0">
                      {entry.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-800">
                        <span className="font-semibold">{entry.action}</span>
                        {' — '}
                        <span className="text-gray-500">
                          {plant?.nickname || plant?.name || 'Plant'}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {entry.timestamp}
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 shrink-0" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
