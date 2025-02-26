import React from 'react';
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useUser } from '../contexts/UserContext';

const GET_TOURNAMENT_DETAILS = gql`
  query GetTournament($id: Int!) {
    tournament(id: $id) {
      id
      name
      rules
      briefing_time
      category
      prize_first
      prize_second
      prize_third
      num_players_per_team
      min_participants
      max_participants
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

const TournamentDetailsTab: React.FC = () => {
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
    <Container>
      <Typography variant="h5">Turnierdetails</Typography>
      <Typography>Name: {tournament.name}</Typography>
      <Typography>Kategorie: {tournament.category || '-'}</Typography>
      <Typography>Regeln: {tournament.rules || '-'}</Typography>
      <Typography>
        Briefing: {tournament.briefing_time ? new Date(tournament.briefing_time).toLocaleString() : '-'}
      </Typography>
      <Typography>
        Preise: 1. {tournament.prize_first || '-'}, 2. {tournament.prize_second || '-'}, 3. {tournament.prize_third || '-'}
      </Typography>
      <Typography>Anzahl Spieler pro Team: {tournament.num_players_per_team}</Typography>
      <Typography>
        Min./Max. Teilnehmer: {tournament.min_participants || '-'} / {tournament.max_participants || '-'}
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