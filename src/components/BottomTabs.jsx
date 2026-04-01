import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Leaf, MessageSquare, MessagesSquare } from 'lucide-react';

const tabs = [
  { path: '/home', label: 'Home', icon: Home },
  { path: '/my-plants', label: 'My Plants', icon: Leaf },
  { path: '/discussion', label: 'Discussion', icon: MessageSquare },
  { path: '/messages', label: 'Messages', icon: MessagesSquare },
];

export default function BottomTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex justify-around items-center bg-white border-t border-gray-200 px-2 pt-2 pb-1 shrink-0">
      {tabs.map((tab) => {
        const active = isActive(tab.path);
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors ${
              active ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
