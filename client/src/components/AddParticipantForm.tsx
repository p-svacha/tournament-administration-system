import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useGetUsersQuery, useRegisterUserParticipantMutation } from '../generated/graphql';

interface AddParticipantFormProps {
  tournamentId: number;
  isTeamTournament: boolean;
  registeredUserIds: number[];
  onAdded?: () => void;
}

const AddParticipantForm: React.FC<AddParticipantFormProps> = (props: AddParticipantFormProps) => {
  const { loading, error, data } = useGetUsersQuery();
  const [registerParticipant] = useRegisterUserParticipantMutation();
  const [selectedUser, setSelectedUser] = useState<{ id: number; name: string } | null>(null);

  if (loading) return <Typography>Lädt Benutzer...</Typography>;
  if (error) return <Typography color="error">Fehler beim Laden der Benutzer: {error.message}</Typography>;
  if (!data) return <Typography color="error">Keine Benutzer gefunden.</Typography>;

  const availableUsers = props.isTeamTournament
    ? []
    : data.users.filter((user) => !props.registeredUserIds.includes(user.id));

  const handleAdd = async () => {
    if (!selectedUser) return;
    try {
      await registerParticipant({
        variables: {
          tournamentId: props.tournamentId,
          userId: selectedUser.id,
        },
      });
      setSelectedUser(null);
      if (props.onAdded) props.onAdded();
    } catch (err) {
      console.error('Fehler beim Hinzufügen des Teilnehmers', err);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">Teilnehmer hinzufügen</Typography>
      <Box display="flex" alignItems="center" mt={1} gap={2}>
        <Autocomplete
          options={availableUsers}
          getOptionLabel={(option) => option.name}
          value={selectedUser}
          onChange={(_, newValue) => setSelectedUser(newValue)}
          renderInput={(params) => <TextField {...params} label="Benutzer auswählen" variant="outlined" />}
          sx={{ width: 300 }}
        />
        <Button variant="contained" color="primary" onClick={handleAdd} disabled={!selectedUser}>
          Hinzufügen
        </Button>
      </Box>
    </Box>
  );
};

export default AddParticipantForm;
