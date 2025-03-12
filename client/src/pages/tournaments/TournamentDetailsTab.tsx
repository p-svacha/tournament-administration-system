import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import {
  useDeregisterUserParticipantMutation,
  useGetTournamentQuery,
  useRegisterUserParticipantMutation,
} from '../../generated/graphql';

const TournamentDetailsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);
  const { currentUser } = useUser();

  const { loading, error, data, refetch } = useGetTournamentQuery({ variables: { id: tournamentId } });

  const [registerParticipant] = useRegisterUserParticipantMutation();
  const [deregisterParticipant] = useDeregisterUserParticipantMutation();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!data || !data.tournament) return <Typography color="error">Error: Turnier nicht vorhanden</Typography>;

  const tournament = data.tournament;
  const isTeamTournament: boolean = data.tournament.numPlayersPerTeam > 1;
  const isRegistered =
    currentUser && !isTeamTournament ? tournament?.participants?.some((p: any) => p.user.id === currentUser.id) : false;

  const handleRegister = async () => {
    if (!currentUser) return;
    await registerParticipant({
      variables: { tournamentId: tournamentId, userId: currentUser.id },
    });
    refetch();
  };

  const handleDeregister = async () => {
    if (!currentUser) return;
    await deregisterParticipant({
      variables: { tournamentId: tournamentId, userId: currentUser.id },
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
        {isTeamTournament ? (
          <Typography>Team-Registrierung noch nicht implementiert.</Typography>
        ) : (
          currentUser && (
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
          )
        )}
      </Box>
    </Container>
  );
};

export default TournamentDetailsTab;
