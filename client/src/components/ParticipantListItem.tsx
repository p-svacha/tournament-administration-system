import React from 'react';
import { ListItem, ListItemText, Button, Box } from '@mui/material';
import { useDeregisterParticipantMutation } from '../generated/graphql';
import { useUser } from '../contexts/UserContext';

export interface ParticipantProps {
  tournamentId: number;
  participant: {
    user: { id: number; name: string; seat: string; isGlobalAdmin: boolean };
    initialSeed: number;
    finalRank: number | null;
  };
  onRemoved?: () => void;
}

const ParticipantListItem: React.FC<ParticipantProps> = (props: ParticipantProps) => {
  const { currentUser } = useUser();
  const [deregisterParticipant] = useDeregisterParticipantMutation();

  const handleRemove = async () => {
    try {
      await deregisterParticipant({
        variables: {
          data: {
            tournamentId: props.tournamentId,
            userId: props.participant.user.id,
          },
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
      {currentUser && currentUser.isGlobalAdmin && (
        <Box ml={2}>
          <Button variant="contained" color="error" onClick={handleRemove}>
            Entfernen
          </Button>
        </Box>
      )}
    </ListItem>
  );
};

export default ParticipantListItem;
