import React from 'react';
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import {
  useDeregisterParticipantMutation,
  useGetTournamentQuery,
  useRegisterParticipantMutation,
} from '../../generated/graphql';

const TournamentDetailsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);
  const { currentUser } = useUser();

  const { loading, error, data, refetch } = useGetTournamentQuery({ variables: { id: tournamentId } });

  const [registerParticipant] = useRegisterParticipantMutation();
  const [deregisterParticipant] = useDeregisterParticipantMutation();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!data || !data.tournament) return <Typography color="error">Error: Turnier nicht vorhanden</Typography>;

  const tournament = data.tournament;
  const isRegistered = currentUser ? tournament?.participants?.some((p: any) => p.user.id === currentUser.id) : false;

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
    <Container>
      <Typography variant="h5">Turnierdetails</Typography>
      <Typography>Name: {tournament.name}</Typography>
      <Typography>Kategorie: {tournament.category || '-'}</Typography>
      <Typography>Regeln: {tournament.rules || '-'}</Typography>
      <Typography>
        Briefing: {tournament.briefingTime ? new Date(tournament.briefingTime).toLocaleString() : '-'}
      </Typography>
      <Typography>
        Preise: 1. {tournament.prize1 || '-'}, 2. {tournament.prize2 || '-'}, 3. {tournament.prize3 || '-'}
      </Typography>
      <Typography>Anzahl Spieler pro Team: {tournament.numPlayersPerTeam}</Typography>
      <Typography>
        Min./Max. Teilnehmer: {tournament.minParticipants || '-'} / {tournament.maxParticipants || '-'}
      </Typography>
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
    </Container>
  );
};

export default TournamentDetailsTab;
