import React, { useState } from 'react';
import TournamentForm from '../../components/TournamentForm/TournamentForm';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateTournamentMutation } from '../../generated/graphql';
import { Event, Game, TournamentFormState } from '../../components/TournamentForm/TournamentFormState';

const TournamentCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const [createTournament] = useCreateTournamentMutation();

  const [formData, setFormData] = useState({
    name: '',
    event: { id: 0, name: '' },
    game: { id: 0, name: '', logoUrl: '' },
    category: '',
    registrationGroup: '',
    rules: '',
    prize1: '',
    prize2: '',
    prize3: '',
    numPlayersPerTeam: 1,
    maxSubstitutes: 0,
    minParticipants: 8,
    maxParticipants: 64,
    briefingTime: '',
    isPublished: false,
    isTeamTournament: false,
  });

  const handleFieldChange = (field: keyof TournamentFormState, value: string | number | boolean | Game | Event) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      await createTournament({
        variables: {
          data: {
            name: formData.name,
            eventId: formData.event.id,
            gameId: formData.game.id,
            category: formData.category,
            registrationGroup: formData.registrationGroup,
            rules: formData.rules,
            prize1: formData.prize1,
            prize2: formData.prize2,
            prize3: formData.prize3,
            numPlayersPerTeam: formData.numPlayersPerTeam,
            maxSubstitutes: formData.maxSubstitutes,
            minParticipants: formData.minParticipants,
            maxParticipants: formData.maxParticipants,
            briefingTime: formData.briefingTime,
            isPublished: formData.isPublished,
          },
        },
      });
      alert('Turnier wurde erfolgreich angelegt.');
      navigate('/tournaments');
    } catch (err) {
      console.error('Fehler beim Erstellen eines neuen Turniers:', err);
    }
  };
  return (
    <Container>
      <TournamentForm
        formData={formData}
        handleSubmit={handleSubmit}
        onFieldChange={handleFieldChange}
        disableTeamToggle={false}
      />
    </Container>
  );
};

export default TournamentCreationPage;