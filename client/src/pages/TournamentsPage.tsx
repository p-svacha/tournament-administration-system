import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Container, Typography, Grid2 as Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const GET_TOURNAMENTS = gql`
  query GetTournaments {
    tournaments {
      id
      name
    }
  }
`;

const CREATE_TOURNAMENT = gql`
  mutation CreateTournament($data: CreateTournamentInput!) {
    createTournament(data: $data) {
      id
      name
    }
  }
`;

const TournamentsPage: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_TOURNAMENTS);
  const [createTournament] = useMutation(CREATE_TOURNAMENT);
  const navigate = useNavigate();
  const { currentUser } = useUser();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const handleCreateTournament = async () => {
    try {
      const result = await createTournament({
        variables: { data: { name: 'Neues Turnier' } },
      });
      const newTournament = result.data.createTournament;
      // Nach erfolgreicher Erstellung direkt auf die Admin-Seite navigieren
      navigate(`/tournaments/${newTournament.id}/admin`);
      refetch();
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
        {data.tournaments.map((tournament: { id: number; name: string }) => (
          <Grid size={{xs: 12, sm: 6, md: 4}} key={tournament.id}>
            <Card style={{background: '#fb8c00'}}>
              <CardActionArea onClick={() => navigate(`/tournaments/${tournament.id}`)}>
                <CardContent>
                  <Typography variant="h6">{tournament.name}</Typography>
                  <Typography variant="body2">ID: {tournament.id}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

        {/* Plus-Kachel für Admins */}
        {currentUser && currentUser.isGlobalAdmin && (
          <Grid size={{ xs: 12, sm: 6, md: 4}}>
            <Card style={{ background: '#66bb6a' }}>
              <CardActionArea onClick={handleCreateTournament}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
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