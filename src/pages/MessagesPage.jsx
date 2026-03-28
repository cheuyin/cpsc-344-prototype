export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      name: 'Dr. PlantCare',
      lastMessage: 'Happy to help! Let me know how it goes.',
      time: '2h ago',
      unread: false,
    },
    {
      id: 2,
      name: 'Monica Gardens',
      lastMessage: 'The terracotta pot trick worked great for me!',
      time: '5h ago',
      unread: true,
    },
    {
      id: 3,
      name: 'PlantDad42',
      lastMessage: 'Thanks for the soil mix recipe 🌱',
      time: '1d ago',
      unread: false,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white px-4 pt-2 pb-3">
        <h1 className="text-xl font-bold text-gray-900">Messages</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {conversations.map((convo) => (
          <div
            key={convo.id}
            className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-sm font-bold text-green-700 shrink-0">
              {convo.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-gray-800">
                  {convo.name}
                </span>
                <span className="text-[10px] text-gray-400 shrink-0">
                  {convo.time}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {convo.lastMessage}
              </p>
            </div>
            {convo.unread && (
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
