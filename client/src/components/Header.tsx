import React from 'react';
import { AppBar, Toolbar, Typography, FormControl, Select, MenuItem, Box, SelectChangeEvent, Container } from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import { UserData, useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      seat
      isGlobalAdmin
    }
  }
`;

const Header: React.FC = () => {
    const { currentUser, setCurrentUser } = useUser();
    const { loading, error, data } = useQuery(GET_USERS);

    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedId = Number(event.target.value);
        const selectedUser: UserData | undefined = data?.users.find((user: UserData) => user.id === selectedId);
        setCurrentUser(selectedUser || null);
    };

    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component={Link} to="/tournaments" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Turnierverwaltung
            </Typography>
            <Box sx={{ minWidth: 120 }}>
                <Typography variant="body1">
                    Sitzplatz: {currentUser ? currentUser.seat : ''}
                </Typography>
                <Typography variant="body1">
                    Admin: {currentUser ? (currentUser.isGlobalAdmin ? 'Ja' : 'Nein') : ''}
                </Typography>
            </Box>           
            <Box sx={{ minWidth: 120 }}>
                <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                Angemeldet als
                </Typography>
                <FormControl variant="outlined" size="small" sx={{ backgroundColor: 'white', borderRadius: 1 }}>
                    {loading ? (
                    <Typography variant="body2" sx={{ p: 1 }}>Lädt...</Typography>
                    ) : error ? (
                    <Typography variant="body2" sx={{ p: 1, color: 'red' }}>Fehler</Typography>
                    ) : (
                    <Select
                    value={currentUser ? String(currentUser.id) : ''}
                        onChange={handleChange}
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