import React from 'react';
import { Typography, Box, Button, Autocomplete, TextField } from '@mui/material';
import { useUser } from '../contexts/UserContext';

/**
 * Renders the tournament admin management section, allowing the addition and removal of tournament admins.
 */
interface TournamentAdminManagementProps {
  admins: { user: { id: number; name: string } }[];
  availableUsers: { id: number; name: string }[];
  selectedNewAdmin: { id: number; name: string } | null;
  onAdminSelect: (newAdmin: { id: number; name: string } | null) => void;
  onAddAdmin: () => void;
  onRemoveAdmin: (userId: number) => void;
}

const TournamentAdminManagement: React.FC<TournamentAdminManagementProps> = ({
  admins,
  availableUsers,
  selectedNewAdmin,
  onAdminSelect,
  onAddAdmin,
  onRemoveAdmin,
}) => {
  const { currentUser } = useUser();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Turnier-Admins verwalten
      </Typography>
      {/* Current Admins */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Aktuelle Admins:</Typography>
        {admins && admins.length > 0 ? (
          admins.map((admin, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {admin.user.name}
              </Typography>
              {currentUser?.id !== admin.user.id && (
                <Button variant="contained" color="error" onClick={() => onRemoveAdmin(admin.user.id)}>
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
            options={availableUsers}
            getOptionLabel={(option) => option.name}
            value={selectedNewAdmin}
            onChange={(_, newValue) => onAdminSelect(newValue)}
            renderInput={(params) => <TextField {...params} label="Benutzer auswählen" variant="outlined" />}
            sx={{ width: 300 }}
          />
          <Button variant="contained" color="primary" onClick={onAddAdmin} disabled={!selectedNewAdmin}>
            Admin hinzufügen
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TournamentAdminManagement;
