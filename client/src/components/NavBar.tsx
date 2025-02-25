import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const NavBar: React.FC = () => {
  const { currentUser } = useUser();

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/tournaments">
            Turniere
          </Button>
          {currentUser && currentUser.isGlobalAdmin && (
            <Button color="inherit" component={Link} to="/admin">
              Admin
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;