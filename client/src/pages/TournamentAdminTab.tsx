import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress, Grid2 as Grid, FormControlLabel, Checkbox } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import client from '../apollo-client';

const GET_TOURNAMENT_DETAILS = gql`
  query GetTournament($id: Int!) {
    tournament(id: $id) {
      id
      name
      category
      rules
      prize1
      prize2
      prize3
      numPlayersPerTeam
      minParticipants
      maxParticipants
    }
  }
`;

const UPDATE_TOURNAMENT = gql`
  mutation UpdateTournament($id: Int!, $data: UpdateTournamentInput!) {
    updateTournament(id: $id, data: $data) {
      id
      name
      category
      rules
      prize1
      prize2
      prize3
      numPlayersPerTeam
      minParticipants
      maxParticipants
    }
  }
`;

const DELETE_TOURNAMENT = gql`
  mutation DeleteTournament($id: Int!) {
    deleteTournament(id: $id)
  }
`;

interface FormState {
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

const TournamentAdminTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_TOURNAMENT_DETAILS, {
    variables: { id: tournamentId },
  });

  const [updateTournament] = useMutation(UPDATE_TOURNAMENT);
  const [deleteTournament] = useMutation(DELETE_TOURNAMENT);

  const [formState, setFormState] = useState<FormState | null>(null);

  // Sobald die Query geladen hat, initialisieren wir das FormState
  useEffect(() => {
    if (data && data.tournament) {
      setFormState({
        name: data.tournament.name,
        category: data.tournament.category || '',
        rules: data.tournament.rules || '',
        prize1: data.tournament.prize1 || '',
        prize2: data.tournament.prize2 || '',
        prize3: data.tournament.prize3 || '',
        numPlayersPerTeam: data.tournament.numPlayersPerTeam,
        minParticipants: data.tournament.minParticipants || 0,
        maxParticipants: data.tournament.maxParticipants || 0,
        isPublished: data.tournament.isPublished,
      });
    }
  }, [data]);

  if (loading || !formState) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    });
  };

  const handleNumberChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [field]: Number(e.target.value),
    });
  };

  const handleSave = async () => {
    try {
      await updateTournament({
        variables: {
          id: tournamentId,
          data: {
            name: formState.name,
            category: formState.category,
            rules: formState.rules,
            prize1: formState.prize1,
            prize2: formState.prize2,
            prize3: formState.prize3,
            numPlayersPerTeam: formState.numPlayersPerTeam,
            minParticipants: formState.minParticipants,
            maxParticipants: formState.maxParticipants,
          },
        },
      });
      refetch();
      alert('Turnierdaten gespeichert.');
    } catch (err) {
      alert('Fehler beim Speichern.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Soll dieses Turnier wirklich gelöscht werden?')) {
      try {
        await deleteTournament({
          variables: { id: tournamentId },
        });
        alert('Turnier gelöscht.');
        await client.resetStore();
        navigate('/tournaments');
      } catch (err) {
        alert('Fehler beim Löschen.');
        console.error(err);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Turnier bearbeiten
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12}}>
            <TextField
              fullWidth
              label="Name"
              value={formState.name}
              onChange={handleChange('name')}
            />
          </Grid>
          <Grid size={{xs: 12}}>
            <TextField
              fullWidth
              label="Kategorie"
              value={formState.category}
              onChange={handleChange('category')}
            />
          </Grid>
          <Grid size={{xs: 12}}>
            <TextField
              fullWidth
              label="Regeln"
              multiline
              minRows={3}
              value={formState.rules}
              onChange={handleChange('rules')}
            />
          </Grid>
          <Grid size={{xs: 12, sm: 4}}>
            <TextField
              fullWidth
              label="Preis (1. Platz)"
              value={formState.prize1}
              onChange={handleChange('prize1')}
            />
          </Grid>
          <Grid size={{xs: 12, sm: 4}}>
            <TextField
              fullWidth
              label="Preis (2. Platz)"
              value={formState.prize2}
              onChange={handleChange('prize2')}
            />
          </Grid>
          <Grid size={{xs: 12, sm: 4}}>
            <TextField
              fullWidth
              label="Preis (3. Platz)"
              value={formState.prize3}
              onChange={handleChange('prize3')}
            />
          </Grid>
          <Grid size={{xs: 12, sm: 4}}>
            <TextField
              fullWidth
              label="Spieler pro Team"
              type="number"
              value={formState.numPlayersPerTeam}
              onChange={handleNumberChange('numPlayersPerTeam')}
            />
          </Grid>
          <Grid size={{xs: 12, sm: 4}}>
            <TextField
              fullWidth
              label="Min. Teilnehmer"
              type="number"
              value={formState.minParticipants}
              onChange={handleNumberChange('minParticipants')}
            />
          </Grid>
          <Grid size={{xs: 12, sm: 4}}>
            <TextField
              fullWidth
              label="Max. Teilnehmer"
              type="number"
              value={formState.maxParticipants}
              onChange={handleNumberChange('maxParticipants')}
            />
          </Grid>
          <Grid size={{xs: 12}}>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={formState.isPublished}
                    onChange={(e) =>
                        setFormState({
                        ...formState,
                        isPublished: e.target.checked,
                        })
                    }
                    />
                }
                label="Veröffentlicht"
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Speichern
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Turnier löschen
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TournamentAdminTab;