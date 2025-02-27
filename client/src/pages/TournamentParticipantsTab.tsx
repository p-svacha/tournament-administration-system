import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetTournamentQuery } from '../generated/graphql';
import { useUser } from '../contexts/UserContext';
import ParticipantListItem from '../components/ParticipantListItem';
import AddParticipantForm from '../components/AddParticipantForm';

const TournamentParticipantsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);
  const { currentUser } = useUser();

  const { loading, error, data, refetch } = useGetTournamentQuery({
    variables: { id: tournamentId },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!data || !data.tournament) return <Typography color="error">Error: Turnier nicht vorhanden</Typography>;

  const tournament = data.tournament;

  const registeredUserIds = tournament.participants.map((p: any) => p.user.id);

  return (
    <Container>
      <Typography variant="h5">Teilnehmer</Typography>
      {tournament.participants.length > 0 ? (
        <List>
          {tournament.participants.map((p: any) => (
            <ParticipantListItem key={p.user.id} tournamentId={tournamentId} participant={p} onRemoved={refetch} />
          ))}
        </List>
      ) : (
        <Typography>Keine Teilnehmer registriert.</Typography>
      )}

      {currentUser && currentUser.isGlobalAdmin && (
        <AddParticipantForm tournamentId={tournamentId} registeredUserIds={registeredUserIds} onAdded={refetch} />
      )}
    </Container>
  );
};

export default TournamentParticipantsTab;
