import React from 'react';
import { Container, Typography } from '@mui/material';

const AdminPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Ich bin der Admin-Bereich.
      </Typography>
      <Typography>
        Hier kann Admin-Zeugs gemacht werden.
      </Typography>
    </Container>
  );
};

export default AdminPage;