import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Grid3X3, Settings, Heart, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PlantProfilePage() {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const { plants, getPlantPosts } = useApp();

  const plant = plants.find((p) => p.id === plantId);

  if (!plant) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400 text-sm">Plant not found</p>
      </div>
    );
  }

  const posts = getPlantPosts(plantId);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 shrink-0">
        <button
          onClick={() => navigate('/profile')}
          className="text-green-600 -ml-1"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-sm font-semibold text-gray-800 flex-1">
          @{plant.nickname.toLowerCase().replace(/\s/g, '')}
        </h1>
        <button className="text-gray-400 hover:text-gray-600">
          <Settings size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Profile info */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-4 mb-3">
            {plant.image ? (
              <img src={plant.image} alt={plant.name} className="w-18 h-18 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-18 h-18 rounded-full bg-green-100 flex items-center justify-center text-4xl shrink-0">
                {plant.emoji}
              </div>
            )}
            <div className="flex-1 flex justify-around text-center">
              <div>
                <div className="text-base font-bold text-gray-900">
                  {posts.length}
                </div>
                <div className="text-[10px] text-gray-500">Posts</div>
              </div>
              <div>
                <div className="text-base font-bold text-gray-900">
                  {plant.id === 'plant-1' ? '124' : plant.id === 'plant-2' ? '87' : '45'}
                </div>
                <div className="text-[10px] text-gray-500">Followers</div>
              </div>
              <div>
                <div className="text-base font-bold text-gray-900">
                  {plant.id === 'plant-1' ? '12' : '8'}
                </div>
                <div className="text-[10px] text-gray-500">Following</div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h2 className="text-sm font-bold text-gray-900">{plant.nickname}</h2>
            <p className="text-xs text-gray-400">{plant.species}</p>
            <p className="text-xs text-gray-600 mt-1">
              {plant.location ? `${plant.location} · ` : ''}Owned by Sarah Chen
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/profile/plant/${plantId}/schedule`)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-500 text-white text-xs font-semibold rounded-xl hover:bg-green-600 transition-colors"
            >
              <Calendar size={14} />
              Modify Schedule
            </button>
            <button className="flex-1 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-200 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Posts grid */}
        <div className="border-t border-gray-100">
          <div className="flex items-center justify-center py-2 border-b border-gray-100">
            <Grid3X3 size={16} className="text-gray-800" />
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-[1px] bg-gray-100">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center relative group"
                >
                  <div className="text-3xl">{plant.emoji}</div>
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
            <div className="flex flex-col items-center justify-center py-12 text-center px-8">
              <div className="text-4xl mb-3">📸</div>
              <p className="text-sm font-medium text-gray-500">No posts yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Share your plant's journey with the community
              </p>
            </div>
          )}
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
