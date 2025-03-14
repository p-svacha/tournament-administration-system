import { Box, Button, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useDeregisterTeamMutation } from '../../generated/graphql';

export interface TeamParticipantListItemProps {
  tournamentId: number;
  team: {
    id: number;
    name: string;
    members: {
      user: {
        id: number;
        name: string;
        seat: string;
      };
      isTeamCaptain: boolean;
    }[];
  };
  onRemoved?: () => void;
  hasAdminAccess: boolean;
}

const TeamParticipantListItem: React.FC<TeamParticipantListItemProps> = (props: TeamParticipantListItemProps) => {
  const [deregisterTeam] = useDeregisterTeamMutation();

  const handleRemove = async () => {
    try {
      await deregisterTeam({
        variables: {
          teamId: props.team.id,
        },
      });
      if (props.onRemoved) props.onRemoved();
    } catch (err) {
      console.error('Fehler beim Entfernen des Teams', err);
    }
  };

  // Ensure that the team captain appears first
  let sortedMembers = props.team.members;
  const captainIndex = props.team.members.findIndex((m) => m.isTeamCaptain);
  if (captainIndex !== -1) {
    const captainMember = props.team.members[captainIndex];
    const others = props.team.members.filter((_, i) => i !== captainIndex);
    sortedMembers = [captainMember, ...others];
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={<Typography variant="h6">{props.team.name}</Typography>}
        secondary={
          <Typography variant="body2" color="textSecondary">
            {sortedMembers.map((member, index) => {
              const displayString: string = `${member.user.name} (${member.user.seat})`;
              const memberDisplay = member.isTeamCaptain ? (
                <strong key={member.user.id}>{displayString}</strong> // Team captain in bold
              ) : (
                <span key={member.user.id}>{displayString}</span>
              );
              // Append a comma except after the last member.
              return (
                <React.Fragment key={member.user.id}>
                  {memberDisplay}
                  {index < sortedMembers.length - 1 && ', '}
                </React.Fragment>
              );
            })}
          </Typography>
        }
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

export default TeamParticipantListItem;
