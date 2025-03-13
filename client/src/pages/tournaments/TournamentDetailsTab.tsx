import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
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

  function createData(key: string, value: any) {
    return { key, value };
  }

  const tournamentDetails = [
    createData('Kategorie', tournament.category),
    createData('Anzahl Spieler pro Team', tournament.numPlayersPerTeam),
    createData('Minimale Anzahl Teilnehmer', tournament.minParticipants),
    createData('Maximale Anzahl Teilnehmer', tournament.maxParticipants),
    createData('Briefing', tournament.briefingTime ? new Date(tournament.briefingTime).toLocaleString() : '-'),
    createData('Preis für den 1. Platz', tournament.prize1 ? tournament.prize1 : '-'),
    createData('Preis für den 2. Platz', tournament.prize2 ? tournament.prize2 : '-'),
    createData('Preis für den 3. Platz', tournament.prize3 ? tournament.prize3 : '-'),
  ];

  return (
    <Container>
      <Typography variant="h5">{tournament.name}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableBody>
            {tournamentDetails.map((tournamentDetail) => (
              <TableRow key={tournamentDetail.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {tournamentDetail.key}
                </TableCell>
                <TableCell align="left">{tournamentDetail.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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