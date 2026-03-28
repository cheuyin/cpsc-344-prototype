import { MessageCircle, Eye } from 'lucide-react';

export default function ThreadCard({ thread, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100"
    >
      <div className="flex gap-3">
        <div className="flex-1 min-w-0">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {thread.plantTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-green-50 text-green-700 text-[11px] font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-[14px] font-semibold text-gray-900 leading-tight mb-1.5">
            {thread.title}
          </h3>

          {/* Description preview */}
          <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2 mb-2">
            {thread.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-[11px] text-gray-400">
            <span className="font-medium text-gray-600">{thread.poster.name}</span>
            <span>{thread.timestamp}</span>
            <span className="flex items-center gap-0.5">
              <MessageCircle size={11} /> {thread.answerCount}
            </span>
            <span className="flex items-center gap-0.5">
              <Eye size={11} /> {thread.views}
            </span>
          </div>
        </div>

        {/* Thumbnail */}
        {thread.media && (
          <img
            src={thread.media}
            alt=""
            className="w-16 h-16 rounded-lg object-cover shrink-0 mt-1"
          />
        )}
      </div>
    </button>
  );
}
