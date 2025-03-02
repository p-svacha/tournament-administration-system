import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { NavLink, Outlet, useParams, useLocation, Link } from 'react-router-dom';
import { useTournamentAdminAccess } from '../../hooks/useTournamentAdminAccess';

const TournamentDetailsTabs: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const basePath = `/tournaments/${id}`;

  let currentTab = location.pathname.replace(basePath, '');
  if (!currentTab || currentTab === '/') currentTab = '/details';
  const { hasAdminAccess } = useTournamentAdminAccess(Number(id));

  return (
    <Box>
      <Tabs value={currentTab} textColor="primary" indicatorColor="secondary">
        <Tab label="< Zur Turnierübersicht" value="/overview" component={Link} to="/tournaments" />
        <Tab label="Details/Regeln" value="/details" component={NavLink} to={`${basePath}/details`} />
        <Tab label="Teilnehmer" value="/participants" component={NavLink} to={`${basePath}/participants`} />
        {hasAdminAccess && <Tab label="Admin" value="/admin" component={NavLink} to={`${basePath}/admin`} />}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default TournamentDetailsTabs;
