import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TOURNAMENT_DETAILS = gql`
  query GetTournament($id: Int!) {
    tournament(id: $id) {
      id
      name
      category
      rules
      prize_first
      prize_second
      prize_third
      num_players_per_team
      min_participants
      max_participants
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
      prize_first
      prize_second
      prize_third
      num_players_per_team
      min_participants
      max_participants
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
  prize_first?: string;
  prize_second?: string;
  prize_third?: string;
  num_players_per_team: number;
  min_participants?: number;
  max_participants?: number;
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
        prize_first: data.tournament.prize_first || '',
        prize_second: data.tournament.prize_second || '',
        prize_third: data.tournament.prize_third || '',
        num_players_per_team: data.tournament.num_players_per_team,
        min_participants: data.tournament.min_participants || 0,
        max_participants: data.tournament.max_participants || 0,
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
            prize_first: formState.prize_first,
            prize_second: formState.prize_second,
            prize_third: formState.prize_third,
            num_players_per_team: formState.num_players_per_team,
            min_participants: formState.min_participants,
            max_participants: formState.max_participants,
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={formState.name}
              onChange={handleChange('name')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Kategorie"
              value={formState.category}
              onChange={handleChange('category')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Regeln"
              multiline
              minRows={3}
              value={formState.rules}
              onChange={handleChange('rules')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Preis (1. Platz)"
              value={formState.prize_first}
              onChange={handleChange('prize_first')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Preis (2. Platz)"
              value={formState.prize_second}
              onChange={handleChange('prize_second')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Preis (3. Platz)"
              value={formState.prize_third}
              onChange={handleChange('prize_third')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Spieler pro Team"
              type="number"
              value={formState.num_players_per_team}
              onChange={handleNumberChange('num_players_per_team')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Min. Teilnehmer"
              type="number"
              value={formState.min_participants}
              onChange={handleNumberChange('min_participants')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Max. Teilnehmer"
              type="number"
              value={formState.max_participants}
              onChange={handleNumberChange('max_participants')}
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