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
import React, { FormEvent, useState } from 'react';
import EventSelectionComponent from '../EventSelectionComponent';
import GameSelectionComponent from '../GameSelectionComponent';
import { Event, Game, TournamentFormState } from './TournamentFormState';

interface TournamentFormProps {
  tournamentId?: number;
  formData: TournamentFormState;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  onFieldChange: (field: keyof TournamentFormState, value: string | number | boolean | Game | Event) => void;
  disableTeamToggle?: boolean;
}

/**
 * Tournament form allowing to create or update tournament details.
 */
const TournamentForm: React.FC<TournamentFormProps> = (props: TournamentFormProps) => {
  const existingTournamentCategories: string[] = ['Pro', 'Comp', 'Fun'];

  const [errors, setErrors] = useState({ event: '', game: '' });
  const [touched, setTouched] = useState({ event: false, game: false });

  const handleGameChange = (e: React.SyntheticEvent, value: any | null) => {
    if (value) {
      props.onFieldChange('game', value);
      validateField('game', value.id);
    } else {
      props.onFieldChange('game', { id: 0, name: '', logoUrl: '' });
      validateField('game', 0);
    }
  };

  const handleGameBlur = () => {
    setTouched((prev) => ({ ...prev, game: true }));
    validateField('game', props.formData.game.id);
  };

  const handleEventChange = (e: React.SyntheticEvent, value: any | null) => {
    if (value) {
      props.onFieldChange('event', value);
      validateField('event', value.id);
    } else {
      props.onFieldChange('event', { id: 0, name: '' });
      validateField('event', 0);
    }
  };

  const handleEventBlur = () => {
    setTouched((prev) => ({ ...prev, event: true }));
    validateField('event', props.formData.event.id);
  };

  // Make sure that the id of Game and Event are not 0 anymore. This would lead to a DB constraint violation.
  const validateField = (name: string, value: any) => {
    if (value === 0) {
      setErrors((prev) => ({ ...prev, [name]: 'Dies ist ein Pflichtfeld' }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleTeamToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Checked:', event.target.checked);
    const isTeam = event.target.checked;
    props.onFieldChange('isTeamTournament', isTeam);
    props.onFieldChange('numPlayersPerTeam', isTeam ? 2 : 1);
    props.onFieldChange('maxSubstitutes', 0);
  };

  const handlePublishedToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onFieldChange('isPublished', event.target.checked);
  };

  function isEventFormError() {
    return !!errors.event || (!!errors.event && touched.event) || props.formData.event.id === 0;
  }

  function isGameFormError() {
    return !!errors.game || (!!errors.game && touched.game) || props.formData.game.id === 0;
  }

  function validateFields(): boolean {
    validateField('event', props.formData.event.id);
    validateField('game', props.formData.game.id);
    return !isEventFormError() && !isGameFormError();
  }

  async function handleSubmit(e: FormEvent) {
    if (validateFields()) {
      await props.handleSubmit(e);
    } else {
      alert('Nicht alle Felder sind valid.');
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Typography variant="h4" gutterBottom>
            Turnier{props.tournamentId ? ' bearbeiten' : ' erstellen'}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Name"
              value={props.formData.name}
              onChange={(e) => {
                props.onFieldChange('name', e.target.value);
              }}
            />
          </Grid>
          <Grid container spacing={2} size={{ xs: 12 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <EventSelectionComponent
                onChange={handleEventChange}
                initialValue={props.formData?.event}
                onBlur={handleEventBlur}
                err={isEventFormError()}
                helperText={isEventFormError() ? errors.event : ''}
                required={true}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <GameSelectionComponent
                onChange={handleGameChange}
                initialValue={props.formData?.game}
                onBlur={handleGameBlur}
                err={isGameFormError()}
                helperText={isGameFormError() ? errors.game : ''}
                required={true}
              />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Autocomplete
              freeSolo
              options={existingTournamentCategories}
              value={props.formData.category}
              onInputChange={(_, newValue) => props.onFieldChange('category', newValue)}
              renderInput={(params) => <TextField {...params} label="Kategorie" />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Registrierungsgruppe"
              value={props.formData.registrationGroup}
              onChange={(e) => props.onFieldChange('registrationGroup', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            {/* Checkbox to toggle between solo and team tournament */}
            <Box display="flex" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.formData.isTeamTournament}
                    onChange={handleTeamToggle}
                    disabled={props.disableTeamToggle}
                  />
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
          {props.formData.isTeamTournament && (
            <>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Spieler pro Team"
                  type="number"
                  slotProps={{ htmlInput: { min: 2, max: 99 } }}
                  value={props.formData.numPlayersPerTeam}
                  onChange={(e) => props.onFieldChange('numPlayersPerTeam', Number(e.target.value))}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Max. Ersatzspieler"
                  type="number"
                  slotProps={{ htmlInput: { min: 0, max: 99 } }}
                  value={props.formData.maxSubstitutes}
                  onChange={(e) => props.onFieldChange('maxSubstitutes', Number(e.target.value))}
                />
              </Grid>
            </>
          )}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Preis (1. Platz)"
              value={props.formData.prize1}
              onChange={(e) => props.onFieldChange('prize1', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Preis (2. Platz)"
              value={props.formData.prize2}
              onChange={(e) => props.onFieldChange('prize2', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Preis (3. Platz)"
              value={props.formData.prize3}
              onChange={(e) => props.onFieldChange('prize3', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Min. Teilnehmer"
              type="number"
              value={props.formData.minParticipants}
              onChange={(e) => props.onFieldChange('minParticipants', Number(e.target.value))}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Max. Teilnehmer"
              type="number"
              value={props.formData.maxParticipants}
              onChange={(e) => props.onFieldChange('maxParticipants', Number(e.target.value))}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Briefing-Zeitpunkt"
              type="datetime-local"
              value={props.formData.briefingTime}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              onChange={(e) => props.onFieldChange('briefingTime', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Regeln"
              multiline
              minRows={3}
              value={props.formData.rules}
              onChange={(e) => props.onFieldChange('rules', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={<Checkbox checked={props.formData.isPublished} onChange={handlePublishedToggle} />}
              label="Veröffentlicht"
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {props.tournamentId ? 'Speichern' : 'Turnier erstellen'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TournamentForm;