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
import TournamentFormState from './TournamentFormState';
import { CreateTournamentInput, useCreateTournamentMutation } from '../../generated/graphql';
import { Games } from '../GameSelectionComponent';
import { Events } from '../EventSelectionComponent';
import { useNavigate } from 'react-router-dom';

interface TournamentCreateFormProps {
  formState: TournamentFormState;
  onFieldChange: (field: keyof CreateTournamentInput, value: string | number | boolean) => void;
  onSave: () => void;
  categories: string[];
}

/**
 * Tournament editing form allowing to update tournament details.
 */
const TournamentForm: React.FC = () => {
  const navigate = useNavigate();
  const [createTournament] = useCreateTournamentMutation();

  const [formData, setFormData] = useState({
    name: '',
    eventId: 0,
    gameId: 0,
    category: '',
    registrationGroup: '',
    rules: '',
    prize1: '',
    prize2: '',
    prize3: '',
    numPlayersPerTeam: 1,
    maxSubstitutes: 0,
    minParticipants: 8,
    maxParticipants: 64,
    briefingTime: '',
    isPublished: false,
    isTeamTournament: false,
  });

  const existingTournamentCategories: string[] = ['Pro', 'Comp', 'Fun'];

  const handleGameChange = (e: React.SyntheticEvent, value: any | null) => {
    setFormData({ ...formData, gameId: value.id });
  };

  const handleEventChange = (e: React.SyntheticEvent, value: any | null) => {
    setFormData({ ...formData, eventId: value.id });
  };

  const handleTeamToggle = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      // Switching to team tournament
      setFormData({ ...formData, numPlayersPerTeam: 2 });
      setFormData({ ...formData, maxSubstitutes: 0 });
      setFormData({ ...formData, isTeamTournament: true });
    } else {
      // Switching to solo tournament
      setFormData({ ...formData, numPlayersPerTeam: 1 });
      setFormData({ ...formData, maxSubstitutes: 0 });
      setFormData({ ...formData, isTeamTournament: false });
    }
  };

  const handleCreateTournament = async () => {
    try {
      const result = await createTournament({
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
      alert('Turnier wurde erfolgreich angelegt: ' + result);
      navigate('/tournaments');
    } catch (err) {
      console.error('Fehler beim Erstellen eines neuen Turniers:', err);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Turnier erstellen
      </Typography>
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
        <Grid size={{ xs: 12 }}>
          <Events onEventSelected={handleEventChange} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Games onGameSelected={handleGameChange} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Autocomplete
            freeSolo
            options={existingTournamentCategories}
            value={formData.category}
            onInputChange={(_, newValue) => setFormData({ ...formData, category: newValue })}
            renderInput={(params) => <TextField {...params} label="Kategorie" />}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Registrierungsgruppe"
            value={formData.registrationGroup}
            onChange={(e) => setFormData({ ...formData, registrationGroup: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
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
          {/* Checkbox to toggle between solo and team tournament */}
          <Box display="flex" alignItems="center">
            <FormControlLabel
              control={<Checkbox checked={formData.isTeamTournament} onChange={handleTeamToggle} />}
              label="Team Turnier"
            />
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
                    numPlayersPerTeam: +e.target.value,
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
                    maxSubstitutes: +e.target.value,
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
            onChange={(e) => setFormData({ ...formData, minParticipants: +e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Max. Teilnehmer"
            type="number"
            value={formData.maxParticipants}
            onChange={(e) => setFormData({ ...formData, maxParticipants: +e.target.value })}
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
            control={
              <Checkbox
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isPublished: Boolean(e.target.value),
                  })
                }
              />
            }
            label="Veröffentlicht"
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreateTournament}>
          Turnier anlegen
        </Button>
      </Box>
    </Box>
  );
};

export default TournamentForm;