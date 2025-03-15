import { CircularProgress, Container, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { TeamFieldsFragment, useGetTournamentQuery, UserFieldsFragment } from '../../../generated/graphql';
import { useTournamentAdminAccess } from '../../../hooks/useTournamentAdminAccess';
import SoloTournamentParticipantsTab from './SoloTournamentParticipantsTab';
import TeamTournamentParticipantsTab from './TeamTournamentParticipantsTab';

const TournamentParticipantsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);
  const { hasAdminAccess } = useTournamentAdminAccess(tournamentId);
  const { loading, error, data, refetch } = useGetTournamentQuery({
    variables: { id: tournamentId },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!data || !data.tournament) return <Typography color="error">Error: Turnier nicht vorhanden</Typography>;

  // Extract users/teams into separate arrays
  const isTeamTournament: boolean = data.tournament.numPlayersPerTeam > 1;
  const users: UserFieldsFragment[] = data.tournament.participants.map((p) => p.user!);
  const teams: TeamFieldsFragment[] = data.tournament.participants.map((p) => p.team!);

  // This page acts as a wrapper and either renders SoloTournamentParticipantsTab or TeamTournamentParticipantsTab, depending if the tournament is solo or team-based
  return (
    <Container>
      <Typography variant="h5">Teilnehmer</Typography>
      {isTeamTournament ? (
        <TeamTournamentParticipantsTab
          tournamentId={tournamentId}
          participants={teams}
          hasAdminAccess={hasAdminAccess}
          refetchTournamentData={refetch}
          numPlayersPerTeam={data.tournament.numPlayersPerTeam}
          maxSubstitutes={data.tournament.maxSubstitutes}
        />
      ) : (
        <SoloTournamentParticipantsTab
          tournamentId={tournamentId}
          participants={users}
          hasAdminAccess={hasAdminAccess}
          refetchTournamentData={refetch}
        />
      )}
    </Container>
  );
};

export default TournamentParticipantsTab;
