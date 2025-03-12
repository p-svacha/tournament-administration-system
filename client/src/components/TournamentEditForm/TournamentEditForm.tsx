import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2 as Grid,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { isGlobalAdmin } from '../../utils/permissions';
import TournamentEditFormState from './TournamentEditFormState';

interface TournamentEditFormProps {
  formState: TournamentEditFormState;
  onFieldChange: (field: keyof TournamentEditFormState, value: string | number | boolean) => void;
  onSave: () => void;
  onDelete: () => void;
  categories: string[];
}

/**
 * Tournament editing form allowing to update tournament details.
 */
const TournamentEditForm: React.FC<TournamentEditFormProps> = (props: TournamentEditFormProps) => {
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
            value={props.formState.name}
            onChange={(e) => props.onFieldChange('name', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Autocomplete
            freeSolo
            options={props.categories}
            value={props.formState.category}
            onInputChange={(_, newValue) => props.onFieldChange('category', newValue)}
            renderInput={(params) => <TextField {...params} label="Kategorie" />}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Regeln"
            multiline
            minRows={3}
            value={props.formState.rules}
            onChange={(e) => props.onFieldChange('rules', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Preis (1. Platz)"
            value={props.formState.prize1}
            onChange={(e) => props.onFieldChange('prize1', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Preis (2. Platz)"
            value={props.formState.prize2}
            onChange={(e) => props.onFieldChange('prize2', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Preis (3. Platz)"
            value={props.formState.prize3}
            onChange={(e) => props.onFieldChange('prize3', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Spieler pro Team"
            type="number"
            value={props.formState.numPlayersPerTeam}
            onChange={(e) => props.onFieldChange('numPlayersPerTeam', Number(e.target.value))}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Min. Teilnehmer"
            type="number"
            value={props.formState.minParticipants}
            onChange={(e) => props.onFieldChange('minParticipants', Number(e.target.value))}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Max. Teilnehmer"
            type="number"
            value={props.formState.maxParticipants}
            onChange={(e) => props.onFieldChange('maxParticipants', Number(e.target.value))}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.formState.isPublished}
                onChange={(e) => props.onFieldChange('isPublished', e.target.checked)}
              />
            }
            label="Veröffentlicht"
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={props.onSave}>
          Speichern
        </Button>
        {isGlobalAdmin(currentUser) && (
          <Button variant="contained" color="error" onClick={props.onDelete}>
            Turnier löschen
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TournamentEditForm;
