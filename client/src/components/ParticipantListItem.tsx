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
  onRemoved?: () => void; // Callback, um z. B. die Liste zu aktualisieren
}

const ParticipantListItem: React.FC<ParticipantProps> = ({ tournamentId, participant, onRemoved }) => {
  const { currentUser } = useUser();
  const [deregisterParticipant] = useDeregisterParticipantMutation();

  const handleRemove = async () => {
    try {
      await deregisterParticipant({
        variables: {
          data: { tournamentId, userId: participant.user.id },
        },
      });
      if (onRemoved) onRemoved();
    } catch (err) {
      console.error('Fehler beim Entfernen des Teilnehmers', err);
    }
  };

  return (
    <ListItem>
      <ListItemText
        primary={participant.user.name}
        secondary={`Seat: ${participant.user.seat} | Seed: ${participant.initialSeed} | Rank: ${participant.finalRank ?? '-'}`}
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
