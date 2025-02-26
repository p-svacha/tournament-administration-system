import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import TournamentsPage from './pages/TournamentsPage';
import { useUser } from './contexts/UserContext';
import TournamentAdminTab from './pages/TournamentAdminTab';
import TournamentDetailsTab from './pages/TournamentDetailsTab';
import TournamentDetailsTabs from './pages/TournamentInfoPage';
import TournamentParticipantsTab from './pages/TournamentParticipantsTab';

const RedirectToDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={`/tournaments/${id}/details`} replace />;
};

const App: React.FC = () => {
  const { currentUser } = useUser();

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/tournaments" element={<TournamentsPage />} />
        <Route path="/tournaments/:id/*" element={<TournamentDetailsTabs />}>
          <Route index element={<Navigate to="details" replace />} />
          <Route path="details" element={<TournamentDetailsTab />} />
          <Route path="participants" element={<TournamentParticipantsTab />} />
          {currentUser && currentUser.isGlobalAdmin && (
            <Route path="admin" element={<TournamentAdminTab />} />
          )}
          <Route path="*" element={<RedirectToDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/tournaments" />} />
      </Routes>
    </div>
  );
};

export default App;