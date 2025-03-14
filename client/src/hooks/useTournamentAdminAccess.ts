import { useUser } from '../contexts/UserContext';
import { useGetTournamentQuery } from '../generated/graphql';
import { hasTournamentAdminAccess } from '../utils/permissions';

interface UseTournamentAdminAccessResult {
  loading: boolean;
  hasAdminAccess: boolean;
}

export const useTournamentAdminAccess = (tournamentId: number): UseTournamentAdminAccessResult => {
  const { currentUser } = useUser();
  const { loading, data } = useGetTournamentQuery({ variables: { id: tournamentId } });

  // While loading or if there's no tournament data yet, return loading.
  if (loading || !data?.tournament) {
    return { loading: true, hasAdminAccess: false };
  }

  // Return final access if loading is done
  return { loading: false, hasAdminAccess: hasTournamentAdminAccess(data.tournament.admins, currentUser) };
};
