import React from 'react';
import { Typography, TextField, Button, Box, Grid2 as Grid, FormControlLabel, Checkbox } from '@mui/material';
import { useUser } from '../contexts/UserContext';
import { isGlobalAdmin } from '../utils/permissions';

/**
 * Renders the tournament editing form allowing to update tournament details.
 */
export interface FormState {
  name: string;
  category?: string;
  rules?: string;
  prize1?: string;
  prize2?: string;
  prize3?: string;
  numPlayersPerTeam: number;
  minParticipants?: number;
  maxParticipants?: number;
  isPublished: boolean;
}

interface TournamentEditFormProps {
  formState: FormState;
  onFieldChange: (field: keyof FormState, value: string | number | boolean) => void;
  onSave: () => void;
  onDelete: () => void;
}

const TournamentEditForm: React.FC<TournamentEditFormProps> = ({ formState, onFieldChange, onSave, onDelete }) => {
  const { currentUser } = useUser();

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Turnier bearbeiten
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Name"
            value={formState.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Kategorie"
            value={formState.category}
            onChange={(e) => onFieldChange('category', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Regeln"
            multiline
            minRows={3}
            value={formState.rules}
            onChange={(e) => onFieldChange('rules', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Preis (1. Platz)"
            value={formState.prize1}
            onChange={(e) => onFieldChange('prize1', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Preis (2. Platz)"
            value={formState.prize2}
            onChange={(e) => onFieldChange('prize2', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Preis (3. Platz)"
            value={formState.prize3}
            onChange={(e) => onFieldChange('prize3', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Spieler pro Team"
            type="number"
            value={formState.numPlayersPerTeam}
            onChange={(e) => onFieldChange('numPlayersPerTeam', Number(e.target.value))}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Min. Teilnehmer"
            type="number"
            value={formState.minParticipants}
            onChange={(e) => onFieldChange('minParticipants', Number(e.target.value))}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Max. Teilnehmer"
            type="number"
            value={formState.maxParticipants}
            onChange={(e) => onFieldChange('maxParticipants', Number(e.target.value))}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formState.isPublished}
                onChange={(e) => onFieldChange('isPublished', e.target.checked)}
              />
            }
            label="Veröffentlicht"
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={onSave}>
          Speichern
        </Button>
        {isGlobalAdmin(currentUser) && (
          <Button variant="contained" color="error" onClick={onDelete}>
            Turnier löschen
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TournamentEditForm;
