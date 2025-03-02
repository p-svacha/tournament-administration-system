import React from 'react';
import { Typography, Grid2 as Grid, Card, CardActionArea, CardContent } from '@mui/material';

interface CreateTournamentCardProps {
  onCreate: () => void;
}

/**
 * A card component to create a new tournament.
 * When clicked, it calls the provided `onCreate` callback to trigger the tournament creation process.
 */
const CreateTournamentCard: React.FC<CreateTournamentCardProps> = ({ onCreate }) => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Create New
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card style={{ background: '#66bb6a' }}>
            <CardActionArea onClick={onCreate}>
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 60,
                }}
              >
                <Typography variant="h3" color="white">
                  +
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateTournamentCard;
