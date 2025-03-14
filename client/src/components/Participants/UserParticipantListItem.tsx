import { Box, Button, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { useDeregisterUserParticipantMutation } from '../../generated/graphql';

export interface ParticipantProps {
  tournamentId: number;
  participant: {
    user: { id: number; name: string; seat: string; isGlobalAdmin: boolean };
    initialSeed: number;
    finalRank: number | null;
  };
  onRemoved?: () => void;
  hasAdminAccess: boolean;
}

const UserParticipantListItem: React.FC<ParticipantProps> = (props: ParticipantProps) => {
  const { currentUser } = useUser();
  const [deregisterParticipant] = useDeregisterUserParticipantMutation();

  const handleRemove = async () => {
    try {
      await deregisterParticipant({
        variables: {
          tournamentId: props.tournamentId,
          userId: props.participant.user.id,
        },
      });
      if (props.onRemoved) props.onRemoved();
    } catch (err) {
      console.error('Fehler beim Entfernen des Teilnehmers', err);
    }
  };

  return (
    <ListItem>
      <ListItemText
        primary={props.participant.user.name}
        secondary={`Sitzplatz: ${props.participant.user.seat} | Seed: ${props.participant.initialSeed} | Rang: ${
          props.participant.finalRank ?? '-'
        }`}
      />
      {props.hasAdminAccess && (
        <Box ml={2}>
          <Button variant="contained" color="error" onClick={handleRemove}>
            Entfernen
          </Button>
        </Box>
      )}
    </ListItem>
  );
};

export default UserParticipantListItem;
