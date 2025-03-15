import { Container, List, Typography } from '@mui/material';
import AddUserParticipantForm from '../../../components/Participants/AddUserParticipantForm';
import UserParticipantListItem from '../../../components/Participants/UserParticipantListItem';
import { UserFieldsFragment } from '../../../generated/graphql';

interface SoloTournamentParticipantsTabProps {
  tournamentId: number;
  participants: UserFieldsFragment[];
  hasAdminAccess: boolean;
  refetchTournamentData: () => void;
}

const SoloTournamentParticipantsTab: React.FC<SoloTournamentParticipantsTabProps> = (
  props: SoloTournamentParticipantsTabProps,
) => {
  // Get list of registered user id's
  const registeredUserIds: number[] = props.participants.map((user: UserFieldsFragment) => user.id);

  return (
    <Container>
      {/* User list */}
      {props.participants.length > 0 ? (
        <List>
          {props.participants.map((user: UserFieldsFragment) => (
            <UserParticipantListItem
              key={user.id}
              tournamentId={props.tournamentId}
              user={user}
              onParticipantRemoved={props.refetchTournamentData}
              hasAdminAccess={props.hasAdminAccess}
            />
          ))}
        </List>
      ) : (
        <Typography>Keine Teilnehmer registriert.</Typography>
      )}
      {/* Form to manually add participants (admins only) */}
      {props.hasAdminAccess && (
        <AddUserParticipantForm
          tournamentId={props.tournamentId}
          registeredUserIds={registeredUserIds}
          onParticipantAdded={props.refetchTournamentData}
        />
      )}
    </Container>
  );
};

export default SoloTournamentParticipantsTab;
