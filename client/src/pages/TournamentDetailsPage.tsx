import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Container, Typography, Button, CircularProgress, Box, List, ListItem, ListItemText } from '@mui/material';
import { useUser } from '../contexts/UserContext';

const GET_TOURNAMENT_DETAILS = gql`
  query GetTournament($id: Int!) {
    tournament(id: $id) {
      id
      name
      participants {
        initialSeed
        finalRank
        user {
          id
          name
          seat
          isGlobalAdmin
        }
      }
    }
  }
`;

const REGISTER_PARTICIPANT = gql`
  mutation RegisterParticipant($data: RegisterTournamentParticipantInput!) {
    registerParticipant(data: $data) {
      tournament {
        id
      }
      user {
        id
      }
      initialSeed
      finalRank
    }
  }
`;

const DEREGISTER_PARTICIPANT = gql`
  mutation DeregisterParticipant($data: RegisterTournamentParticipantInput!) {
    deregisterParticipant(data: $data)
  }
`;

const TournamentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);
  const { currentUser } = useUser();

  const { loading, error, data, refetch } = useQuery(GET_TOURNAMENT_DETAILS, {
    variables: { id: tournamentId },
  });

  const [registerParticipant] = useMutation(REGISTER_PARTICIPANT);
  const [deregisterParticipant] = useMutation(DEREGISTER_PARTICIPANT);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const tournament = data.tournament;
  const isRegistered = currentUser
    ? tournament.participants.some((p: any) => p.user.id === currentUser.id)
    : false;

  const handleRegister = async () => {
    if (!currentUser) return;
    await registerParticipant({
      variables: { data: { tournamentId, userId: currentUser.id } },
    });
    refetch();
  };

  const handleDeregister = async () => {
    if (!currentUser) return;
    await deregisterParticipant({
      variables: { data: { tournamentId, userId: currentUser.id } },
    });
    refetch();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {tournament.name}
      </Typography>
      <Typography variant="body1">Turnier-ID: {tournament.id}</Typography>
      
      <Box sx={{ mt: 2 }}>
        {currentUser && (
          <>
            {isRegistered ? (
              <Button variant="contained" color="error" onClick={handleDeregister}>
                Abmelden
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleRegister}>
                Registrieren
              </Button>
            )}
          </>
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Teilnehmer:</Typography>
        {tournament.participants.length > 0 ? (
          <List>
            {tournament.participants.map((p: any) => (
              <ListItem key={p.user.id}>
                <ListItemText
                  primary={p.user.name}
                  secondary={`Seat: ${p.user.seat} | Seed: ${p.initialSeed} | Rank: ${p.finalRank ?? '-'}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">Keine Teilnehmer registriert.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default TournamentDetailsPage;