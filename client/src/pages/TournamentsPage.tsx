import React from 'react';
import { Container, Typography, Grid2 as Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useCreateTournamentMutation, useGetTournamentsQuery } from '../generated/graphql';
import { useEvent } from '../contexts/EventContext';

const TournamentsPage: React.FC = () => {
  const { currentUser } = useUser();
  const { currentEvent } = useEvent();
  const isAdmin = currentUser && currentUser.isGlobalAdmin;

  const { loading, error, data, refetch } = useGetTournamentsQuery({
    variables: {
      publishedOnly: !isAdmin,
      eventId: currentEvent.id,
    },
  });
  const [createTournament] = useCreateTournamentMutation();
  const navigate = useNavigate();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!data) return <Typography color="error">Fehler beim Laden der Turniere</Typography>;
  if (!currentEvent) return <Typography color="error">Fehler beim Laden des Events</Typography>;

  const handleCreateTournament = async () => {
    try {
      const result = await createTournament({
        variables: { data: { name: 'Neues Turnier', eventId: currentEvent.id } },
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
        Turniere
      </Typography>
      <Grid container spacing={2}>
        {data.tournaments.map((tournament) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tournament.id}>
            <Card style={{ background: '#fb8c00' }}>
              <CardActionArea onClick={() => navigate(`/tournaments/${tournament.id}`)}>
                <CardContent sx={{ minHeight: 60 }}>
                  <Typography variant="h6">{tournament.name}</Typography>
                  <Typography variant="body2">{tournament.isPublished ? '' : 'unveröffentlicht'}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

        {/* Panel to add new tournament */}
        {currentUser && currentUser.isGlobalAdmin && (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card style={{ background: '#66bb6a' }}>
              <CardActionArea onClick={handleCreateTournament}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 60 }}>
                  <Typography variant="h3" color="white">
                    +
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TournamentsPage;
