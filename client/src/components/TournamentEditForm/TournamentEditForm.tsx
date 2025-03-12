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
import TournamentEditFormState from './TournamentEditFormState';

interface TournamentEditFormProps {
  formState: TournamentEditFormState;
  onFieldChange: (field: keyof TournamentEditFormState, value: string | number | boolean) => void;
  onSave: () => void;
  categories: string[];
  disableTeamToggle: boolean;
}

/**
 * Tournament editing form allowing to update tournament details.
 */
const TournamentEditForm: React.FC<TournamentEditFormProps> = (props: TournamentEditFormProps) => {
  const isTeamTournament = props.formState.numPlayersPerTeam > 1;

  const handleTeamToggle = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      // Switching to team tournament
      props.onFieldChange('numPlayersPerTeam', 2);
      props.onFieldChange('maxSubstitutes', props.formState.maxSubstitutes || 0);
    } else {
      // Switching to solo tournament
      props.onFieldChange('numPlayersPerTeam', 1);
      props.onFieldChange('maxSubstitutes', 0);
    }
  };

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
        <Grid size={{ xs: 12 }}>
          {/* Checkbox to toggle between solo and team tournament */}
          <Box display="flex" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox checked={isTeamTournament} onChange={handleTeamToggle} disabled={props.disableTeamToggle} />
              }
              label="Team Turnier"
            />
            {/* Warning text if checkbox is disabled */}
            {props.disableTeamToggle && (
              <Typography variant="body2" color="error" sx={{ ml: 2 }}>
                Änderung nicht möglich, da bereits Teilnehmer registriert sind.
              </Typography>
            )}
          </Box>
        </Grid>
        {isTeamTournament && (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Spieler pro Team"
                type="number"
                slotProps={{ htmlInput: { min: 2, max: 99 } }}
                value={props.formState.numPlayersPerTeam}
                onChange={(e) => props.onFieldChange('numPlayersPerTeam', Number(e.target.value))}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Max. Auswechselspieler"
                type="number"
                slotProps={{ htmlInput: { min: 0, max: 99 } }}
                value={props.formState.maxSubstitutes}
                onChange={(e) => props.onFieldChange('maxSubstitutes', Number(e.target.value))}
              />
            </Grid>
          </>
        )}
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
      </Box>
    </Box>
  );
};

export default TournamentEditForm;
