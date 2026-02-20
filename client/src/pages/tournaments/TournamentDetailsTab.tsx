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
import PrizeCard from '../../components/PrizeCard';

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

  function displayTeamOrPlayer() {
    return isTeamTournament ? ' (Teams)' : ' (Spieler)';
  }

  function createData(key: string, value: any) {
    return { key, value };
  }

  const tournamentDetails = [
    createData('Kategorie', tournament.category),
    createData('Turnieradmins', tournament.admins.map((admin) => admin.user.name).join(', ')),
    createData('Anzahl Spieler pro Team', tournament.numPlayersPerTeam),
    createData('Maximale Anzahl Ersatzspieler', tournament.maxSubstitutes),
    createData('Minimale Anzahl Teilnehmer' + displayTeamOrPlayer(), tournament.minParticipants),
    createData('Maximale Anzahl Teilnehmer' + displayTeamOrPlayer(), tournament.maxParticipants),
    createData('Briefing', tournament.briefingTime ? new Date(tournament.briefingTime).toLocaleString() : '-'),
    createData('Registrierungsgruppe', tournament.registrationGroup ? tournament.registrationGroup : '-'),
  ];

  const prizes = [
    { title: '🥇 1. Platz:', value: tournament.prize1 ? tournament.prize1 : '-', color: '#F1E5AC' },
    { title: '🥈 2. Platz:', value: tournament.prize2 ? tournament.prize2 : '-', color: '#D8D8D8' },
    { title: '🥉 3. Platz:', value: tournament.prize3 ? tournament.prize3 : '-', color: '#DAAA5E' },
  ];

  return (
    <Container sx={{ width: '800px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', margin: '1em' }}>
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}${tournament.game.logoUrl}`}
          alt={tournament.game.name}
          width="300px"
        />
      </Box>
      <Typography variant="h4" align="center" margin="1em">
        {tournament.name}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableBody>
            {tournamentDetails.map((tournamentDetail, rowIndex) => (
              <TableRow key={tournamentDetail.key} sx={{ backgroundColor: rowIndex % 2 === 0 ? '#f0f0f0' : 'inherit' }}>
                <TableCell sx={{ width: '55%' }} component="th" scope="row">
                  {tournamentDetail.key}
                </TableCell>
                <TableCell sx={{ width: '45%' }} align="left">
                  {tournamentDetail.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {prizes.map((prize) => (
          <PrizeCard title={prize.title} value={prize.value} color={prize.color} />
        ))}
      </Box>
      <Box sx={{ mt: 2, margin: '1em', display: 'flex', justifyContent: 'center' }}>
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
      <Typography variant="h5" align="center" margin="2em 0 1em 0">
        Turnierregeln
      </Typography>
      <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-line' }} margin="1em 0.5em">
        {tournament.rules}
      </Typography>
    </Container>
  );
};

export default TournamentDetailsTab;