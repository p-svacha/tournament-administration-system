import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

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

const TournamentParticipantsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);

  const { loading, error, data } = useQuery(GET_TOURNAMENT_DETAILS, {
    variables: { id: tournamentId },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const tournament = data.tournament;

  return (
    <Container>
      <Typography variant="h5">Teilnehmer</Typography>
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
        <Typography>Keine Teilnehmer registriert.</Typography>
      )}
    </Container>
  );
};

export default TournamentParticipantsTab;