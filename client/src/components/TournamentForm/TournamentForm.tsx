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
import React, { useState } from 'react';
import { useCreateTournamentMutation } from '../../generated/graphql';
import EventSelectionComponent from '../EventSelectionComponent';
import { useNavigate } from 'react-router-dom';
import GameSelectionComponent from '../GameSelectionComponent';
import TournamentFormState from './TournamentFormState';

interface TournamentFormProps {
  tournamentId?: number;
  existingData?: TournamentFormState;
  handleSave?: () => void;
  disableTeamToggle?: boolean;
}

/**
 * Tournament form allowing to create or update tournament details.
 */
const TournamentForm: React.FC<TournamentFormProps> = (props: TournamentFormProps) => {
  const navigate = useNavigate();
  const [createTournament] = useCreateTournamentMutation();

  const [formData, setFormData] = useState({
    name: props.existingData?.name || '',
    eventId: props.existingData?.eventId || 0,
    gameId: props.existingData?.gameId || 0,
    category: props.existingData?.category || '',
    registrationGroup: props.existingData?.registrationGroup || '',
    rules: props.existingData?.rules || '',
    prize1: props.existingData?.prize1 || '',
    prize2: props.existingData?.prize2 || '',
    prize3: props.existingData?.prize3 || '',
    numPlayersPerTeam: props.existingData?.numPlayersPerTeam || 1,
    maxSubstitutes: props.existingData?.maxSubstitutes || 0,
    minParticipants: props.existingData?.maxParticipants || 8,
    maxParticipants: props.existingData?.maxParticipants || 64,
    briefingTime: props.existingData?.briefingTime || '',
    isPublished: props.existingData?.isPublished || false,
    isTeamTournament: props.existingData?.numPlayersPerTeam ? props.existingData?.numPlayersPerTeam > 1 : false,
  });
  const [errors, setErrors] = useState({ event: '', game: '' });
  const [touched, setTouched] = useState({ event: false, game: false });

  const existingTournamentCategories: string[] = ['Pro', 'Comp', 'Fun'];

  const handleGameChange = (e: React.SyntheticEvent, value: any | null) => {
    if (value) {
      setFormData({ ...formData, gameId: value.id });
      validateField('game', value.id);
    } else {
      setFormData({ ...formData, gameId: 0 });
      validateField('game', 0);
    }
  };

  const handleGameBlur = () => {
    setTouched((prev) => ({ ...prev, game: true }));
    validateField('game', formData.gameId);
  };

  const handleEventChange = (e: React.SyntheticEvent, value: any | null) => {
    if (value) {
      setFormData({ ...formData, eventId: value.id });
      validateField('event', value.id);
    } else {
      setFormData({ ...formData, eventId: 0 });
      validateField('event', 0);
    }
  };

  const handleEventBlur = () => {
    setTouched((prev) => ({ ...prev, event: true }));
    validateField('event', formData.eventId);
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
    setFormData((prev) => ({
      ...prev,
      numPlayersPerTeam: event.target.checked ? 2 : 1,
      maxSubstitutes: 0,
      isTeamTournament: event.target.checked,
    }));
  };

  const handlePublishedToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFormData({ ...formData, isPublished: true });
    } else {
      setFormData({ ...formData, isPublished: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateField('event', formData.eventId);
    validateField('game', formData.gameId);

    if (!isEventFormError() && !isGameFormError()) {
      try {
        await createTournament({
          variables: {
            data: {
              name: formData.name,
              eventId: formData.eventId,
              gameId: formData.gameId,
              category: formData.category,
              registrationGroup: formData.registrationGroup,
              rules: formData.rules,
              prize1: formData.prize1,
              prize2: formData.prize2,
              prize3: formData.prize3,
              numPlayersPerTeam: formData.numPlayersPerTeam,
              maxSubstitutes: formData.maxSubstitutes,
              minParticipants: formData.minParticipants,
              maxParticipants: formData.maxParticipants,
              briefingTime: formData.briefingTime,
              isPublished: formData.isPublished,
            },
          },
        });
        alert('Turnier wurde erfolgreich angelegt.');
        navigate('/tournaments');
      } catch (err) {
        console.error('Fehler beim Erstellen eines neuen Turniers:', err);
      }
    }
  };

  function isEventFormError() {
    return !!errors.event || (!!errors.event && touched.event);
  }

  function isGameFormError() {
    return !!errors.game || (!!errors.game && touched.game);
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
          margin: '1em 2em',
          width: { xs: '100%', sm: '75%', md: '50%' },
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
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </Grid>
          <Grid container spacing={2} size={{ xs: 12 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <EventSelectionComponent
                onChange={handleEventChange}
                onBlur={handleEventBlur}
                err={isEventFormError()}
                helperText={isEventFormError() ? errors.event : ''}
                required={true}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <GameSelectionComponent
                onChange={handleGameChange}
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
              value={formData.category}
              onInputChange={(_, newValue) => setFormData({ ...formData, category: newValue })}
              renderInput={(params) => <TextField {...params} label="Kategorie" />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Registrierungsgruppe"
              value={formData.registrationGroup}
              onChange={(e) => setFormData({ ...formData, registrationGroup: e.target.value })}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            {/* Checkbox to toggle between solo and team tournament */}
            <Box display="flex" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isTeamTournament}
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
          {formData.isTeamTournament && (
            <>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Spieler pro Team"
                  type="number"
                  slotProps={{ htmlInput: { min: 2, max: 99 } }}
                  value={formData.numPlayersPerTeam}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      numPlayersPerTeam: Number(e.target.value),
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Max. Ersatzspieler"
                  type="number"
                  slotProps={{ htmlInput: { min: 0, max: 99 } }}
                  value={formData.maxSubstitutes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxSubstitutes: Number(e.target.value),
                    })
                  }
                />
              </Grid>
            </>
          )}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Preis (1. Platz)"
              value={formData.prize1}
              onChange={(e) => setFormData({ ...formData, prize1: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Preis (2. Platz)"
              value={formData.prize2}
              onChange={(e) => setFormData({ ...formData, prize2: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Preis (3. Platz)"
              value={formData.prize3}
              onChange={(e) => setFormData({ ...formData, prize3: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Min. Teilnehmer"
              type="number"
              value={formData.minParticipants}
              onChange={(e) => setFormData({ ...formData, minParticipants: Number(e.target.value) })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Max. Teilnehmer"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: Number(e.target.value) })}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Briefing-Zeitpunkt"
              type="datetime-local"
              value={formData.briefingTime}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              onChange={(e) => setFormData({ ...formData, briefingTime: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Regeln"
              multiline
              minRows={3}
              value={formData.rules}
              onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={<Checkbox checked={formData.isPublished} onChange={handlePublishedToggle} />}
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