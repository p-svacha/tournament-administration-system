import React from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client';
import { CircularProgress, Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const GET_TOURNAMENTS = gql`
  query GetTournaments {
    tournaments {
      id
      name
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TOURNAMENTS);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Fehler: {error.message}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Turniere
      </Typography>
      <List>
        {data.tournaments.map((tournament: { id: number; name: string }) => (
          <ListItem key={tournament.id}>
            <ListItemText primary={`${tournament.id}: ${tournament.name}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
