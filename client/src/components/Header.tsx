import React from 'react';
import { AppBar, Toolbar, Typography, FormControl, Select, MenuItem, Box, SelectChangeEvent } from '@mui/material';
import { UserData, useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { useGetEventsQuery, useGetUsersQuery } from '../generated/graphql';
import { useEvent } from '../contexts/EventContext';

const Header: React.FC = () => {
  const { currentUser, setCurrentUser } = useUser();
  const { currentEvent, setCurrentEvent } = useEvent();

  // Fetch users
  const { loading: loadingUsers, error: errorUsers, data: dataUsers } = useGetUsersQuery();
  // Fetch events
  const { loading: loadingEvents, error: errorEvents, data: dataEvents } = useGetEventsQuery();

  const handleUserChange = (e: SelectChangeEvent<string>) => {
    const selectedId = Number(e.target.value);
    const selectedUser = dataUsers?.users.find((user: any) => user.id === selectedId);
    setCurrentUser(selectedUser || null);
  };

  const handleEventChange = (e: SelectChangeEvent<string>) => {
    const selectedEventId = Number(e.target.value);
    const selectedEvent = dataEvents?.events.find((event: any) => event.id === selectedEventId);
    if (selectedEvent) {
      setCurrentEvent(selectedEvent);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Title as a link to the tournament overview */}
        <Typography
          variant="h6"
          component={Link}
          to="/tournaments"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Turnierverwaltung
        </Typography>

        {/* Event Dropdown */}
        <Box sx={{ mr: 4 }}>
          {loadingEvents ? (
            <Typography variant="body1">Loading events...</Typography>
          ) : errorEvents ? (
            <Typography variant="body1" color="error">
              Error loading events
            </Typography>
          ) : (
            <FormControl variant="outlined" size="small" sx={{ backgroundColor: 'white', borderRadius: 1 }}>
              <Select
                value={currentEvent ? String(currentEvent.id) : ''}
                onChange={handleEventChange}
                displayEmpty
                sx={{ minWidth: 150 }}
              >
                {dataEvents?.events.map((event: any) => (
                  <MenuItem key={event.id} value={event.id}>
                    {event.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        {/* User Dropdown */}
        <Box sx={{ minWidth: 120 }}>
          {loadingUsers ? (
            <Typography variant="body1">Loading users...</Typography>
          ) : errorUsers ? (
            <Typography variant="body1" color="error">
              Error loading users
            </Typography>
          ) : (
            <FormControl variant="outlined" size="small" sx={{ backgroundColor: 'white', borderRadius: 1 }}>
              <Select
                value={currentUser ? String(currentUser.id) : ''}
                onChange={handleUserChange}
                displayEmpty
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">
                  <em>Select User</em>
                </MenuItem>
                {dataUsers?.users.map((user: any) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        {/* Display additional user info */}
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1">Seat: {currentUser ? currentUser.seat : ''}</Typography>
          <Typography variant="body1">
            Admin: {currentUser ? (currentUser.isGlobalAdmin ? 'Yes' : 'No') : ''}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
