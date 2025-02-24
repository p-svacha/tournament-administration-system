import React from 'react';
import { AppBar, Toolbar, Typography, FormControl, Select, MenuItem, Box } from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import { useUser } from '../contexts/UserContext';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

const Header: React.FC = () => {
    const { currentUserId, setCurrentUserId } = useUser();
    const { loading, error, data } = useQuery(GET_USERS);

    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Turnierverwaltung
            </Typography>
            <Box sx={{ minWidth: 120 }}>
            <FormControl variant="outlined" size="small" sx={{ backgroundColor: 'white', borderRadius: 1 }}>
                {loading ? (
                <Typography variant="body2" sx={{ p: 1 }}>Lädt...</Typography>
                ) : error ? (
                <Typography variant="body2" sx={{ p: 1, color: 'red' }}>Fehler</Typography>
                ) : (
                <Select
                    value={currentUserId || ''}
                    onChange={() => setCurrentUserId}
                    displayEmpty
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="">
                    <em>Wähle User</em>
                    </MenuItem>
                    {data.users.map((user: { id: number; name: string }) => (
                    <MenuItem key={user.id} value={user.id}>
                        {user.name}
                    </MenuItem>
                    ))}
                </Select>
                )}
            </FormControl>
            </Box>
        </Toolbar>
        </AppBar>
    );
};

export default Header;