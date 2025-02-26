import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Typography, Grid2 as Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GET_TOURNAMENTS = gql`
  query GetTournaments {
    tournaments {
      id
      name
    }
  }
`;

const TournamentsPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TOURNAMENTS);
  const navigate = useNavigate();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

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
      </Grid>
    </Container>
  );
};

export default TournamentsPage;