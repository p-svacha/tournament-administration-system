import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import TournamentsPage from './pages/TournamentsPage';
import AdminPage from './pages/AdminPage';
import { Container, Typography } from '@mui/material';
import { useUser } from './contexts/UserContext';
import TournamentDetailsPage from './pages/TournamentDetailsPage';

const App: React.FC = () => {
  const { currentUser } = useUser();

  return (
    <div>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/tournaments" element={<TournamentsPage />} />
        <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
        
        {currentUser && currentUser.isGlobalAdmin && (
          <Route path="/admin" element={<AdminPage />} />
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/tournaments" />} />
      </Routes>
    </div>
  );
};

export default App;