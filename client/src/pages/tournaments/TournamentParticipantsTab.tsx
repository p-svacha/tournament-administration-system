import React from 'react';
import { Container, Typography, List, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetTournamentQuery } from '../../generated/graphql';
import ParticipantListItem from '../../components/ParticipantListItem';
import AddParticipantForm from '../../components/AddParticipantForm';
import { useTournamentAdminAccess } from '../../hooks/useTournamentAdminAccess';

const TournamentParticipantsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);
  const { hasAdminAccess } = useTournamentAdminAccess(Number(id));
  const { loading, error, data, refetch } = useGetTournamentQuery({
    variables: { id: tournamentId },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!data || !data.tournament) return <Typography color="error">Error: Turnier nicht vorhanden</Typography>;

  const registeredUserIds = data.tournament.participants.map((p: any) => p.user.id);

  return (
    <Container>
      {/* Participant list*/}
      <Typography variant="h5">Teilnehmer</Typography>
      {data.tournament.participants.length > 0 ? (
        <List>
          {data.tournament.participants.map((p: any) => (
            <ParticipantListItem key={p.user.id} tournamentId={tournamentId} participant={p} onRemoved={refetch} />
          ))}
        </List>
      ) : (
        <Typography>Keine Teilnehmer registriert.</Typography>
      )}

      {/* Form to manually add participants (admins only)*/}
      {hasAdminAccess && (
        <AddParticipantForm tournamentId={tournamentId} registeredUserIds={registeredUserIds} onAdded={refetch} />
      )}
    </Container>
  );
};

export default TournamentParticipantsTab;
