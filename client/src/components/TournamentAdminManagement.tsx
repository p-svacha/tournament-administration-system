import React from 'react';
import { Typography, Box, Button, Autocomplete, TextField } from '@mui/material';
import { useUser } from '../contexts/UserContext';

interface TournamentAdminManagementProps {
  admins: { user: { id: number; name: string } }[];
  availableUsers: { id: number; name: string }[];
  selectedNewAdmin: { id: number; name: string } | null;
  onAdminSelect: (newAdmin: { id: number; name: string } | null) => void;
  onAddAdmin: () => void;
  onRemoveAdmin: (userId: number) => void;
}

/**
 * Tournament admin management section, allowing the addition and removal of tournament admins.
 */
const TournamentAdminManagement: React.FC<TournamentAdminManagementProps> = (props: TournamentAdminManagementProps) => {
  const { currentUser } = useUser();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Turnier-Admins verwalten
      </Typography>
      {/* Current Admins */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Aktuelle Admins:</Typography>
        {props.admins && props.admins.length > 0 ? (
          props.admins.map((admin, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {admin.user.name}
              </Typography>
              {currentUser?.id !== admin.user.id && (
                <Button variant="contained" color="error" onClick={() => props.onRemoveAdmin(admin.user.id)}>
                  X
                </Button>
              )}
            </Box>
          ))
        ) : (
          <Typography variant="body2">Keine Admins zugewiesen.</Typography>
        )}
      </Box>

      {/* Add New Admin */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1">Neuen Admin hinzufügen:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
          <Autocomplete
            options={props.availableUsers}
            getOptionLabel={(option) => option.name}
            value={props.selectedNewAdmin}
            onChange={(_, newValue) => props.onAdminSelect(newValue)}
            renderInput={(params) => <TextField {...params} label="Benutzer auswählen" variant="outlined" />}
            sx={{ width: 300 }}
          />
          <Button variant="contained" color="primary" onClick={props.onAddAdmin} disabled={!props.selectedNewAdmin}>
            Admin hinzufügen
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TournamentAdminManagement;
