import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTournamentCard from '../components/CreateTournamentCard';
import TournamentSection from '../components/TournamentSection';
import { useEvent } from '../contexts/EventContext';
import { useUser } from '../contexts/UserContext';
import {
  TournamentBasicFieldsFragment,
  useCreateTournamentMutation,
  useGetTournamentsQuery,
} from '../generated/graphql';
import { hasTournamentAdminAccess, isGlobalAdmin } from '../utils/permissions';

const TournamentsPage: React.FC = () => {
  const { currentUser } = useUser();
  const { currentEvent } = useEvent();
  const navigate = useNavigate();
  const [createTournament] = useCreateTournamentMutation();

  // Get data of all tournaments in selected event
  const { loading, error, data, refetch } = useGetTournamentsQuery({
    variables: {
      publishedOnly: false,
      eventId: currentEvent?.id,
    },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!data) return <Typography color="error">Fehler beim Laden der Turniere</Typography>;
  if (!currentEvent) return <Typography color="error">Fehler beim Laden des Events</Typography>;

  // Filter tournaments:
  // Show all published tournaments, and unpublished only if the current user has access.
  const filteredTournaments = data.tournaments.filter((tournament) => {
    return tournament.isPublished || hasTournamentAdminAccess(tournament, currentUser);
  });

  // Group tournaments by category. If category is missing or empty, use "Uncategorized".
  const groupedTournaments = filteredTournaments.reduce((acc, tournament) => {
    const category = tournament.category && tournament.category.trim() !== '' ? tournament.category : 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tournament);
    return acc;
  }, {} as Record<string, TournamentBasicFieldsFragment[]>);

  // Convert grouped object into an array of sections.
  const sections = Object.keys(groupedTournaments)
    .sort()
    .map((category) => ({
      category,
      tournaments: groupedTournaments[category],
    }));

  const handleCreateTournament = async () => {
    try {
      const result = await createTournament({
        variables: {
          data: {
            name: 'Neues Turnier',
            eventId: currentEvent.id,
            gameId: 1,
          },
        },
      });
      const newTournament = result.data?.createTournament;

      // Redirect to tournament admin page
      if (newTournament) {
        navigate(`/tournaments/${newTournament.id}/admin`);
        refetch();
      }
    } catch (err) {
      console.error('Fehler beim Erstellen eines neuen Turniers:', err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tournaments
      </Typography>

      {sections.map((section) => (
        <TournamentSection key={section.category} category={section.category} tournaments={section.tournaments} />
      ))}

      {isGlobalAdmin(currentUser) && <CreateTournamentCard onCreate={handleCreateTournament} />}

      <Box
        component="img"
        src={`${process.env.PUBLIC_URL}/game-logos/league_of_legends.png`}
        alt="League of Legends Logo"
      />
    </Container>
  );
};

export default TournamentsPage;
