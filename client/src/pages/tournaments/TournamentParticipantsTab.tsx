import { CircularProgress, Container, List, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import AddParticipantForm from '../../components/Participants/AddParticipantForm';
import TeamParticipantListItem from '../../components/Participants/TeamParticipantListItem';
import UserParticipantListItem from '../../components/Participants/UserParticipantListItem';
import { TeamFieldsFragment, useGetTournamentQuery, UserFieldsFragment } from '../../generated/graphql';
import { useTournamentAdminAccess } from '../../hooks/useTournamentAdminAccess';

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

  const isTeamTournament: boolean = data.tournament.numPlayersPerTeam > 1;
  const registeredUserIds: number[] = isTeamTournament ? [] : data.tournament.participants.map((p: any) => p.user.id);

  // Extract users/teams into separate arrays
  const users: UserFieldsFragment[] = data.tournament.participants.map((p) => p.user!);
  const teams: TeamFieldsFragment[] = data.tournament.participants.map((p) => p.team!);

  return (
    <Container>
      {/* Participant list */}
      <Typography variant="h5">Teilnehmer</Typography>

      {
        //Team tournament
        isTeamTournament ? (
          teams.length > 0 ? (
            <List>
              {teams.map((team: TeamFieldsFragment) => (
                <TeamParticipantListItem
                  key={team.id}
                  tournamentId={tournamentId}
                  team={team}
                  onRemoved={refetch}
                  hasAdminAccess={hasAdminAccess}
                />
              ))}
            </List>
          ) : (
            <Typography>Keine Teams registriert.</Typography>
          )
        ) : //Solo tournament
        data.tournament.participants.length > 0 ? (
          <List>
            {users.map((user: UserFieldsFragment) => (
              <UserParticipantListItem
                key={user.id}
                tournamentId={tournamentId}
                user={user}
                onRemoved={refetch}
                hasAdminAccess={hasAdminAccess}
              />
            ))}
          </List>
        ) : (
          <Typography>Keine Teilnehmer registriert.</Typography>
        )
      }

      {/* Form to manually add participants (admins only) */}
      {hasAdminAccess && (
        <AddParticipantForm
          tournamentId={tournamentId}
          isTeamTournament={isTeamTournament}
          registeredUserIds={registeredUserIds}
          onAdded={refetch}
        />
      )}
    </Container>
  );
};

export default TournamentParticipantsTab;
