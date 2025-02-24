import React, { useState } from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client';
import { CircularProgress, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import Header from './components/Header';
import { useUser } from './contexts/UserContext';

const GET_TOURNAMENTS = gql`
  query GetTournaments {
    tournaments {
      id
      name
    }
  }
`;

const App: React.FC = () => {
  const { currentUserId } = useUser();
  const { loading, error, data } = useQuery(GET_TOURNAMENTS);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Fehler: {error.message}</Typography>;

  return (
    <div>
      <Header />
      <Container sx={{ mt: 4 }}>
        {currentUserId ? (
          <Typography variant="h5">
            Angemeldet als User-ID: {currentUserId}
          </Typography>
        ) : (
          <Typography variant="h5">
            Bitte wähle einen User aus dem Dropdown.
          </Typography>
        )}
      </Container>
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
    </div>
  );
};

export default App;
