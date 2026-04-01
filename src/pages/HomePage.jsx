import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import appLogo from '../assets/app-logo.png';
import { feedPosts, currentUser } from '../data/mockData';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-1 pb-2 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <img src={appLogo} alt="Plantagram" className="w-7 h-7 rounded-lg" />
          <h1 className="text-lg font-bold text-gray-900">Plantagram</h1>
        </div>
        {/* Profile avatar */}
        <button
          onClick={() => navigate('/profile')}
          className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-green-300 transition-all"
        >
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-green-100 flex items-center justify-center text-sm font-bold text-green-700">
              {currentUser.name.charAt(0)}
            </div>
          )}
        </button>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Stories-style plant accounts row */}
        <div className="flex gap-3 px-4 py-3 overflow-x-auto no-scrollbar border-b border-gray-100">
          {feedPosts
            .reduce((acc, p) => {
              if (!acc.find((x) => x.plantAccount === p.plantAccount)) {
                acc.push(p);
              }
              return acc;
            }, [])
            .map((post, i) => (
              <div key={i} className="flex flex-col items-center shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white p-[2px]">
                    {post.plantAvatar ? (
                      <img src={post.plantAvatar} alt={post.plantAccount} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center text-lg">
                        {post.plantEmoji}
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 mt-1 max-w-[56px] truncate">
                  {post.plantAccount}
                </span>
              </div>
            ))}
        </div>

        {/* Posts */}
        {feedPosts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}

        <div className="h-4" />
      </div>
    </div>
  );
}

function FeedPost({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="border-b border-gray-100">
      {/* Post header */}
      <div className="flex items-center gap-2.5 px-4 py-2.5">
        {post.plantAvatar ? (
          <img src={post.plantAvatar} alt={post.plantAccount} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">
            {post.plantEmoji}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-gray-900">
              {post.plantAccount}
            </span>
            <span className="text-[10px] text-gray-400">
              · {post.ownerName}'s plant
            </span>
          </div>
        </div>
        <button className="text-gray-400">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Post image */}
      {post.image ? (
        <img
          src={post.image}
          alt={post.imageCaption}
          className="w-full aspect-square object-cover"
        />
      ) : (
        <div className="w-full aspect-square bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">{post.plantEmoji}</div>
            <div className="text-xs text-green-600 font-medium px-4">{post.imageCaption}</div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <button onClick={handleLike}>
            <Heart
              size={22}
              className={liked ? 'fill-red-500 text-red-500' : 'text-gray-800'}
              strokeWidth={liked ? 0 : 1.5}
            />
          </button>
          <button>
            <MessageCircle size={22} className="text-gray-800" strokeWidth={1.5} />
          </button>
          <button>
            <Send size={20} className="text-gray-800" strokeWidth={1.5} />
          </button>
        </div>
        <button onClick={() => setSaved(!saved)}>
          <Bookmark
            size={22}
            className={saved ? 'fill-gray-800 text-gray-800' : 'text-gray-800'}
            strokeWidth={saved ? 0 : 1.5}
          />
        </button>
      </div>

      {/* Likes & caption */}
      <div className="px-4 pb-3">
        <div className="text-xs font-semibold text-gray-900 mb-1">
          {likes.toLocaleString()} likes
        </div>
        <div className="text-xs text-gray-800">
          <span className="font-semibold">{post.plantAccount}</span>{' '}
          {post.caption}
        </div>
        {post.commentCount > 0 && (
          <button className="text-[11px] text-gray-400 mt-1">
            View all {post.commentCount} comments
          </button>
        )}
        <div className="text-[10px] text-gray-300 mt-1 uppercase">
          {post.timestamp}
        </div>
      </div>
    </div>
  );
}
