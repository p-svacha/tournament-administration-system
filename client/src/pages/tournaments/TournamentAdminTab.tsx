import { CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../apollo-client';
import TournamentAdminManagement from '../../components/TournamentAdminManagement';
import TournamentEditForm from '../../components/TournamentEditForm/TournamentEditForm';
import TournamentEditFormState from '../../components/TournamentEditForm/TournamentEditFormState';
import {
  useAddTournamentAdminMutation,
  useDeleteTournamentMutation,
  useGetTournamentQuery,
  useGetUsersQuery,
  useRemoveTournamentAdminMutation,
  useUpdateTournamentMutation,
} from '../../generated/graphql';

const TournamentAdminTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = Number(id);
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useGetTournamentQuery({
    variables: { id: tournamentId },
  });
  const { data: usersData } = useGetUsersQuery();

  const [updateTournament] = useUpdateTournamentMutation();
  const [deleteTournament] = useDeleteTournamentMutation();
  const [addTournamentAdmin] = useAddTournamentAdminMutation();
  const [removeTournamentAdmin] = useRemoveTournamentAdminMutation();

  const [formState, setFormState] = useState<TournamentEditFormState | null>(null);
  const [selectedNewAdmin, setSelectedNewAdmin] = useState<{ id: number; name: string } | null>(null);

  // Initialize formState when tournament data is loaded, only if formState is not yet set.
  useEffect(() => {
    if (data && data.tournament && formState === null) {
      setFormState({
        name: data.tournament.name,
        category: data.tournament.category || '',
        rules: data.tournament.rules || '',
        prize1: data.tournament.prize1 || '',
        prize2: data.tournament.prize2 || '',
        prize3: data.tournament.prize3 || '',
        numPlayersPerTeam: data.tournament.numPlayersPerTeam,
        minParticipants: data.tournament.minParticipants || 0,
        maxParticipants: data.tournament.maxParticipants || 0,
        isPublished: data.tournament.isPublished,
      });
    }
  }, [data, formState]);

  if (loading || !formState) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!data || !data.tournament) return <Typography color="error">Fehler beim Laden der Turnierdaten</Typography>;

  // Get existing tournament categories from save event
  //const eventId: number = data.tournament.event

  const handleFieldChange = (field: keyof TournamentEditFormState, value: string | number | boolean) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

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
    usersData && data
      ? usersData.users.filter((user) => !data.tournament?.admins.some((admin) => admin.user.id === user.id))
      : [];

  return (
    <Container>
      <TournamentEditForm
        formState={formState}
        onFieldChange={handleFieldChange}
        onSave={handleSave}
        onDelete={handleDelete}
        categories={[]}
      />
      <TournamentAdminManagement
        admins={data.tournament.admins}
        availableUsers={availableUsers}
        selectedNewAdmin={selectedNewAdmin}
        onAdminSelect={setSelectedNewAdmin}
        onAddAdmin={handleAddAdmin}
        onRemoveAdmin={handleRemoveAdmin}
      />
    </Container>
  );
};

export default TournamentAdminTab;
