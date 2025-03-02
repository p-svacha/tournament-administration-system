import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import TournamentAdminTab from './TournamentAdminTab';
import { useTournamentAdminAccess } from '../../hooks/useTournamentAdminAccess';
import { CircularProgress } from '@mui/material';

/**
 * Wrapper containing the TournamentAdminTab. Depending on user rights, it either shows the tab or redirects back to the details page.
 */
const TournamentAdminTabWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);
  const { loading, hasAdminAccess } = useTournamentAdminAccess(tournamentId);

  // Show loading spinner while user rights are being checked.
  if (loading) {
    return <CircularProgress />;
  }

  // Redirect to details if the user doesn't have admin access.
  if (!hasAdminAccess) {
    return <Navigate to={`/tournaments/${tournamentId}/details`} replace />;
  }

  // Show admin tab if user has the necessary rights
  return <TournamentAdminTab />;
};

export default TournamentAdminTabWrapper;
