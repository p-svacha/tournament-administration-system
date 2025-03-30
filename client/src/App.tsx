import React from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import TournamentsPage from './pages/TournamentsPage';
import { useUser } from './contexts/UserContext';
import TournamentDetailsTab from './pages/tournaments/TournamentDetailsTab';
import TournamentDetailsTabs from './pages/tournaments/TournamentInfoPage';
import TournamentParticipantsTab from './pages/tournaments/TournamentParticipantsTab';
import TournamentAdminTabWrapper from './pages/tournaments/TournamentAdminTabWrapper';
import TournamentCreationPage from './pages/tournaments/TournamentCreationPage';

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
        {currentUser?.isGlobalAdmin && <Route path="/tournaments/create" element={<TournamentCreationPage />} />}
        <Route path="/tournaments/:id/*" element={<TournamentDetailsTabs />}>
          <Route index element={<Navigate to="details" replace />} />
          <Route path="details" element={<TournamentDetailsTab />} />
          <Route path="participants" element={<TournamentParticipantsTab />} />
          <Route path="admin" element={<TournamentAdminTabWrapper />} />
          <Route path="*" element={<RedirectToDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/tournaments" />} />
      </Routes>
    </div>
  );
};

export default App;