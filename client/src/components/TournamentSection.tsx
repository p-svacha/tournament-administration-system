import React from 'react';
import { Typography, Grid2 as Grid } from '@mui/material';
import { TournamentBasicFieldsFragment, TournamentModel } from '../generated/graphql';
import TournamentCard from './TournamentCard';

interface TournamentSectionProps {
  category: string;
  tournaments: TournamentBasicFieldsFragment[];
}

const TournamentSection: React.FC<TournamentSectionProps> = (props: TournamentSectionProps) => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {props.category}
      </Typography>
      <Grid container spacing={2}>
        {props.tournaments.map((tournament) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tournament.id}>
            <TournamentCard tournament={tournament} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TournamentSection;
