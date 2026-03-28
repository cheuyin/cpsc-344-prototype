import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import IPhoneFrame from './components/IPhoneFrame';
import BottomTabs from './components/BottomTabs';
import HomePage from './pages/HomePage';
import DiscussionPage from './pages/DiscussionPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import AddPlantPage from './pages/AddPlantPage';
import CareSchedulePage from './pages/CareSchedulePage';
import PlantProfilePage from './pages/PlantProfilePage';

function App() {
  return (
    <BrowserRouter basename="/cpsc-344-prototype">
      <AppProvider>
        <IPhoneFrame>
          <div className="flex-1 overflow-hidden flex flex-col">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
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
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
