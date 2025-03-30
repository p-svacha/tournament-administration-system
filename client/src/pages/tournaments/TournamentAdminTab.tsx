import { Box, Button, CircularProgress, Container, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../apollo-client';
import TournamentAdminManagement from '../../components/TournamentAdminManagement';
import { Event, Game, TournamentFormState } from '../../components/TournamentForm/TournamentFormState';
import { useUser } from '../../contexts/UserContext';
import {
  GetTournamentQuery,
  useAddTournamentAdminMutation,
  useDeleteTournamentMutation,
  useGetTournamentQuery,
  useGetUsersQuery,
  useRemoveTournamentAdminMutation,
  useUpdateTournamentMutation,
} from '../../generated/graphql';
import { isGlobalAdmin } from '../../utils/permissions';
import TournamentForm from '../../components/TournamentForm/TournamentForm';

const TournamentAdminTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const {
    data: tournamentData,
    loading,
    error,
    refetch,
  } = useGetTournamentQuery({
    variables: { id: tournamentId },
  });

  const { data: usersData } = useGetUsersQuery();

  const [updateTournament] = useUpdateTournamentMutation();
  const [deleteTournament] = useDeleteTournamentMutation();
  const [addTournamentAdmin] = useAddTournamentAdminMutation();
  const [removeTournamentAdmin] = useRemoveTournamentAdminMutation();

  const [formState, setFormState] = useState<TournamentFormState | null>(null);
  const [selectedNewAdmin, setSelectedNewAdmin] = useState<{ id: number; name: string } | null>(null);

  // Initialize formState when tournament data is loaded, only if formState is not yet set.
  useEffect(() => {
    if (tournamentData && tournamentData.tournament && formState === null) {
      setFormState({
        name: tournamentData.tournament.name,
        event: tournamentData.tournament.event,
        game: tournamentData.tournament.game,
        category: tournamentData.tournament.category || '',
        registrationGroup: tournamentData.tournament.registrationGroup || '',
        rules: tournamentData.tournament.rules || '',
        prize1: tournamentData.tournament.prize1 || '',
        prize2: tournamentData.tournament.prize2 || '',
        prize3: tournamentData.tournament.prize3 || '',
        numPlayersPerTeam: tournamentData.tournament.numPlayersPerTeam,
        maxSubstitutes: tournamentData.tournament.maxSubstitutes,
        minParticipants: tournamentData.tournament.minParticipants || 0,
        maxParticipants: tournamentData.tournament.maxParticipants || 0,
        briefingTime: convertDateString(tournamentData),
        isPublished: tournamentData.tournament.isPublished,
        isTeamTournament: tournamentData.tournament.numPlayersPerTeam > 1 || false,
      });
    }
  }, [tournamentData, formState]);

  // Stop here and return error/loading screen if tournament data is not available
  if (loading || !formState) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!tournamentData || !tournamentData.tournament)
    return <Typography color="error">Fehler beim Laden der Turnierdaten</Typography>;

  // Check if tournament already has participants
  const hasParticipants = tournamentData.tournament.participants.length > 0;

  const handleFieldChange = (field: keyof TournamentFormState, value: string | number | boolean | Game | Event) => {
    setFormState((prevState) => ({
      ...prevState!,
      [field]: value,
    }));
  };

  function convertDateString(tournamentData: GetTournamentQuery) {
    if (tournamentData.tournament?.briefingTime) {
      return new Date(
        new Date(tournamentData.tournament.briefingTime).getTime() - new Date().getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 16);
    } else {
      return '';
    }
  }

  const handleSave = async () => {
    try {
      await updateTournament({
        variables: {
          id: tournamentId,
          data: {
            name: formState.name,
            category: formState.category,
            rules: formState.rules,
            prize1: formState.prize1,
            prize2: formState.prize2,
            prize3: formState.prize3,
            numPlayersPerTeam: formState.numPlayersPerTeam,
            maxSubstitutes: formState.maxSubstitutes,
            minParticipants: formState.minParticipants,
            maxParticipants: formState.maxParticipants,
            isPublished: formState.isPublished,
          },
        },
      });
      refetch();
      alert('Turnierdaten gespeichert.');
    } catch (err) {
      alert('Fehler beim Speichern.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Soll dieses Turnier wirklich gelöscht werden?')) {
      try {
        await deleteTournament({
          variables: { id: tournamentId },
        });
        alert('Turnier gelöscht.');
        navigate('/tournaments');
        setTimeout(() => client.resetStore(), 100); // Reset cache so tournament doesn't appear in tournament overview anymore, but wait until navigate is done.
      } catch (err) {
        alert('Fehler beim Löschen.');
        console.error(err);
      }
    }
  };

  const handleAddAdmin = async () => {
    if (!selectedNewAdmin) return;
    try {
      await addTournamentAdmin({
        variables: {
          tournamentId,
          userId: selectedNewAdmin.id,
        },
      });
      refetch();
      setSelectedNewAdmin(null);
      alert('Admin erfolgreich hinzugefügt.');
    } catch (err) {
      alert('Fehler beim Hinzufügen des Admins.');
      console.error(err);
    }
  };

  const handleRemoveAdmin = async (userId: number) => {
    if (window.confirm('Soll dieser Admin wirklich entfernt werden?')) {
      try {
        await removeTournamentAdmin({
          variables: { tournamentId, userId },
        });
        refetch();
        alert('Admin entfernt.');
      } catch (err) {
        alert('Fehler beim Entfernen des Admins.');
        console.error(err);
      }
    }
  };

  // Filter available users (if usersData is loaded)
  const availableUsers =
    usersData && tournamentData
      ? usersData.users.filter((user) => !tournamentData.tournament?.admins.some((admin) => admin.user.id === user.id))
      : [];

  return (
    <Container>
      {/*Section to edit tournament details*/}
      <TournamentForm
        tournamentId={tournamentId}
        formData={formState}
        handleSubmit={handleSave}
        onFieldChange={handleFieldChange}
        disableTeamToggle={hasParticipants}
      />

      <Divider sx={{ my: 4 }} />

      {/*Section to edit tournament admins*/}
      <TournamentAdminManagement
        admins={tournamentData.tournament.admins}
        availableUsers={availableUsers}
        selectedNewAdmin={selectedNewAdmin}
        onAdminSelect={setSelectedNewAdmin}
        onAddAdmin={handleAddAdmin}
        onRemoveAdmin={handleRemoveAdmin}
      />

      <Divider sx={{ my: 4 }} />

      {/*Section to delete tournament*/}
      {isGlobalAdmin(currentUser) && (
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Turnier löschen
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default TournamentAdminTab;