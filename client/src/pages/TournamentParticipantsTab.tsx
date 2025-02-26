import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetTournamentQuery } from '../generated/graphql';

const TournamentParticipantsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);

  const { loading, error, data } = useGetTournamentQuery({
    variables: { id: tournamentId },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!data || !data.tournament) return <Typography color="error">Error: Turnier nicht vorhanden</Typography>;

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