import { CheckCircle } from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Button, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { TeamFieldsFragment, useDeregisterTeamMutation } from '../../generated/graphql';

export interface TeamParticipantListItemProps {
  tournamentId: number;
  team: TeamFieldsFragment;
  onTeamRemoved?: () => void;
  hasAdminAccess: boolean;
  numPlayersPerTeam: number;
  maxSubstitutes: number;
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
      if (props.onTeamRemoved) props.onTeamRemoved();
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

  // Calculate team validity based on tournament rules.
  const memberCount = props.team.members.length;
  const minCount = props.numPlayersPerTeam;
  const maxCount = props.numPlayersPerTeam + props.maxSubstitutes;
  let validationText = '';
  if (memberCount < minCount) {
    validationText = `Zu wenige Spieler (${memberCount}/${minCount})`;
  } else if (memberCount > maxCount) {
    validationText = `Zu viele Spieler (${memberCount}/${maxCount})`;
  } else {
    validationText = 'Gültig';
  }
  const isValid = memberCount >= minCount && memberCount <= maxCount;

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={
          <>
            <Typography variant="h6" display="inline">
              {props.team.name}
            </Typography>
            <Box ml={1} display="inline-flex" alignItems="center">
              {isValid ? (
                <CheckCircle sx={{ color: 'green' }} fontSize="small" />
              ) : (
                <>
                  <ErrorIcon sx={{ color: 'red' }} fontSize="small" />
                  <Typography variant="caption" color="error" sx={{ ml: 0.5 }}>
                    {validationText}
                  </Typography>
                </>
              )}
            </Box>
          </>
        }
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
