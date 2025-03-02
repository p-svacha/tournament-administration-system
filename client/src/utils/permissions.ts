import { TournamentAdminsFragment } from '../generated/graphql';
import { UserData } from '../contexts/UserContext';

/**
 * Checks if the given user has tournament admin access.
 * A user has admin access if they are a global admin or if they are in the tournament's admin list.
 *
 * @param {TournamentAdminsFragment} tournament - Tournament data including its admins.
 * @param {User | null} user - The user to check access for.
 * @returns {boolean} True if the user has admin access, false otherwise.
 */
export const hasTournamentAdminAccess = (tournament: TournamentAdminsFragment, user: UserData | null): boolean => {
  if (!user) return false;
  if (user.isGlobalAdmin) return true;
  return tournament.admins.some((admin) => admin.user.id === user.id) ?? false;
};

/**
 * Checks if the given user is a global admin.
 *
 * @param {User | null} user - The user to check permissions for.
 * @returns {boolean} True if the user is a global admin, false otherwise.
 */
export const isGlobalAdmin = (user: UserData | null): boolean => {
  return Boolean(user && user.isGlobalAdmin);
};
