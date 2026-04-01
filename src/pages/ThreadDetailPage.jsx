import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  MessageCircle,
  Eye,
  Share2,
  Bookmark,
} from 'lucide-react';
import { threads, followingThreads } from '../data/mockData';

export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();

  const allThreads = [...threads, ...followingThreads];
  const thread = allThreads.find((t) => t.id === threadId);

  if (!thread) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Thread not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <button
          onClick={() => navigate('/discussion')}
          className="text-green-600 -ml-1"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-sm font-semibold text-gray-800 truncate flex-1">
          Thread
        </h1>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-gray-600">
            <Bookmark size={18} />
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Original post */}
        <div className="bg-white px-4 py-4 border-b border-gray-100">
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

          <h2 className="text-[17px] font-bold text-gray-900 leading-snug mb-2">
            {thread.title}
          </h2>

          <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
            {thread.description}
          </p>

          {/* Thread image */}
          {thread.media && (
            <img
              src={thread.media}
              alt=""
              className="w-full rounded-lg object-cover max-h-64 mb-3"
            />
          )}

          {/* Poster info + meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700">
                {thread.poster.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-700">
                  {thread.poster.name}
                </div>
                <div className="text-[10px] text-gray-400">
                  {thread.timestamp}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-gray-400">
              <span className="flex items-center gap-0.5">
                <MessageCircle size={11} /> {thread.answerCount}
              </span>
              <span className="flex items-center gap-0.5">
                <Eye size={11} /> {thread.views}
              </span>
            </div>
          </div>
        </div>

        {/* Answers header */}
        <div className="px-4 py-2.5 bg-gray-50">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {thread.answers.length} Answer{thread.answers.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Answers – sorted by upvotes descending */}
        {[...thread.answers]
          .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
          .map((answer) => (
            <AnswerCard key={answer.id} answer={answer} />
          ))}

        {/* Bottom spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
}

function AnswerCard({ answer }) {
  const [votes, setVotes] = useState({
    up: answer.upvotes,
    down: answer.downvotes,
    userVote: null, // 'up' | 'down' | null
  });

  const handleVote = (direction) => {
    setVotes((prev) => {
      if (prev.userVote === direction) {
        // Un-vote
        return {
          ...prev,
          up: direction === 'up' ? prev.up - 1 : prev.up,
          down: direction === 'down' ? prev.down - 1 : prev.down,
          userVote: null,
        };
      }
      // New vote or switch
      const wasUp = prev.userVote === 'up';
      const wasDown = prev.userVote === 'down';
      return {
        up:
          direction === 'up'
            ? prev.up + 1
            : wasUp
            ? prev.up - 1
            : prev.up,
        down:
          direction === 'down'
            ? prev.down + 1
            : wasDown
            ? prev.down - 1
            : prev.down,
        userVote: direction,
      };
    });
  };

  return (
    <div
      className={`bg-white px-4 py-3.5 border-b border-gray-100 ${
        answer.endorsed ? 'border-l-3 border-l-green-500' : ''
      }`}
    >
      {/* Endorsed badge */}
      {answer.endorsed && (
        <div className="flex items-center gap-1 mb-2">
          <CheckCircle size={13} className="text-green-500" />
          <span className="text-[11px] font-semibold text-green-600">
            Endorsed{answer.endorsedBy ? ` by ${answer.endorsedBy}` : ''}
          </span>
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
          {answer.author.name.charAt(0)}
        </div>
        <span className="text-xs font-semibold text-gray-700">
          {answer.author.name}
        </span>
        <span className="text-[10px] text-gray-400">{answer.timestamp}</span>
      </div>

      {/* Answer text */}
      <p className="text-[13px] text-gray-700 leading-relaxed mb-3">
        {answer.text}
      </p>

      {/* Vote controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleVote('up')}
          className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
            votes.userVote === 'up'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          <ChevronUp size={14} />
          {votes.up}
        </button>
        <button
          onClick={() => handleVote('down')}
          className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
            votes.userVote === 'down'
              ? 'bg-red-100 text-red-600'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          <ChevronDown size={14} />
          {votes.down}
        </button>
      </div>
    </div>
  );
}
