import React from 'react';
import TournamentForm from '../../components/TournamentForm/TournamentForm';
import { Container } from '@mui/material';

const TournamentCreationPage: React.FC = () => {
  return (
    <Container>
      <TournamentForm />
    </Container>
  );
};

export default TournamentCreationPage;