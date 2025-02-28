import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TournamentBasicFieldsFragment, TournamentModel } from '../generated/graphql';

interface TournamentCardProps {
  tournament: TournamentBasicFieldsFragment;
}

const TournamentCard: React.FC<TournamentCardProps> = (props: TournamentCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tournaments/${props.tournament.id}`);
  };

  return (
    <Card style={{ background: '#fb8c00' }}>
      <CardActionArea onClick={handleClick}>
        <CardContent sx={{ minHeight: 60 }}>
          <Typography variant="h6">{props.tournament.name}</Typography>
          <Typography variant="body2">{props.tournament.isPublished ? '' : 'unpublished'}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TournamentCard;
