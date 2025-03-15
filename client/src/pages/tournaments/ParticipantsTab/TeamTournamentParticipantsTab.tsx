import { Container, List, Typography } from '@mui/material';
import TeamParticipantListItem from '../../../components/Participants/TeamParticipantListItem';
import { TeamFieldsFragment } from '../../../generated/graphql';

interface TeamTournamentParticipantsTabProps {
  tournamentId: number;
  participants: TeamFieldsFragment[];
  hasAdminAccess: boolean;
  refetchTournamentData: () => void;
  numPlayersPerTeam: number;
  maxSubstitutes: number;
}

const TeamTournamentParticipantsTab: React.FC<TeamTournamentParticipantsTabProps> = (
  props: TeamTournamentParticipantsTabProps,
) => {
  return (
    <Container>
      {/* Team list */}
      {props.participants.length > 0 ? (
        <List>
          {props.participants.map((team: TeamFieldsFragment) => (
            <TeamParticipantListItem
              key={team.id}
              tournamentId={props.tournamentId}
              team={team}
              onTeamRemoved={props.refetchTournamentData}
              hasAdminAccess={props.hasAdminAccess}
              numPlayersPerTeam={props.numPlayersPerTeam}
              maxSubstitutes={props.maxSubstitutes}
            />
          ))}
        </List>
      ) : (
        <Typography>Keine Teams registriert.</Typography>
      )}
    </Container>
  );
};

export default TeamTournamentParticipantsTab;
