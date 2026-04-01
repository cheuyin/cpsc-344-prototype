import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import appLogo from './assets/app-logo.png';
import IPhoneFrame from './components/IPhoneFrame';
import BottomTabs from './components/BottomTabs';
import HomePage from './pages/HomePage';
import DiscussionPage from './pages/DiscussionPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import MyPlantsPage from './pages/MyPlantsPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import AddPlantPage from './pages/AddPlantPage';
import CareSchedulePage from './pages/CareSchedulePage';
import PlantProfilePage from './pages/PlantProfilePage';

const teamMembers = ['Stanley Cheung', 'Brian Ng', 'Jung Soo Lee', 'Kaitlyn Shoemaker'];

function App() {
  return (
    <BrowserRouter basename="/cpsc-344-prototype">
      <AppProvider>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center justify-items-center min-h-screen w-full px-8 lg:px-16 xl:px-24 gap-8 lg:gap-16 xl:gap-24">
          {/* Left column — team info */}
          <div className="hidden lg:flex flex-col items-center text-center select-none">
            <img src={appLogo} alt="Plantagram" className="w-14 h-14 rounded-2xl mb-4 shadow-lg" />
            <h1 className="text-3xl font-bold text-white tracking-tight">Plantagram</h1>
            <p className="text-sm text-white/40 mt-1 mb-6 font-medium">CPSC 344 Prototype</p>
            <div className="w-10 h-px bg-white/15 mb-6" />
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-3">Team Diet Coke (T2D)</p>
            {teamMembers.map((name) => (
              <span key={name} className="text-sm text-white/60 leading-relaxed">{name}</span>
            ))}
          </div>

          {/* Middle column — phone */}
          <IPhoneFrame>
            <div className="flex-1 overflow-hidden flex flex-col">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/my-plants" element={<MyPlantsPage />} />
                <Route path="/discussion" element={<DiscussionPage />} />
                <Route path="/discussion/:threadId" element={<ThreadDetailPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/add-plant" element={<AddPlantPage />} />
                <Route path="/profile/plant/:plantId" element={<PlantProfilePage />} />
                <Route path="/profile/plant/:plantId/schedule" element={<CareSchedulePage />} />
              </Routes>
            </div>
            <BottomTabs />
          </IPhoneFrame>

          {/* Right column — feature guide */}
          <div className="hidden lg:flex flex-col items-center text-center select-none">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-4">Explore</p>
            {[
              ['🌿', 'Plant Feed', 'Browse community posts'],
              ['💬', 'Discussion Board', 'Ask and answer questions'],
              ['📋', 'Care Schedules', 'Track watering and more'],
              ['👤', 'Plant Profiles', 'Monitor each plant'],
            ].map(([emoji, title, desc]) => (
              <div key={title} className="mb-4 last:mb-0">
                <div className="text-lg mb-0.5">{emoji}</div>
                <p className="text-sm font-medium text-white/60">{title}</p>
                <p className="text-[11px] text-white/30">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
