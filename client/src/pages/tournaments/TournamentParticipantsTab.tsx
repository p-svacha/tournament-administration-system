import { CircularProgress, Container, List, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import AddParticipantForm from '../../components/Participants/AddParticipantForm';
import TeamParticipantListItem from '../../components/Participants/TeamParticipantListItem';
import UserParticipantListItem from '../../components/Participants/UserParticipantListItem';
import { useGetTournamentQuery } from '../../generated/graphql';
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

  // For team tournaments, extract unique teams from the participants list
  const teams = isTeamTournament
    ? Array.from(
        new Map(data.tournament.participants.filter((p: any) => p.team).map((p: any) => [p.team.id, p.team])).values(),
      )
    : [];

  return (
    <Container>
      {/* Participant list */}
      <Typography variant="h5">Teilnehmer</Typography>

      {
        //Team tournament
        isTeamTournament ? (
          teams.length > 0 ? (
            <List>
              {teams.map((team: any) => (
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
            {data.tournament.participants.map((p: any) => (
              <UserParticipantListItem
                key={p.user.id}
                tournamentId={tournamentId}
                participant={p}
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
