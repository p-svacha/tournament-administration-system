export default interface TournamentEditFormState {
  name: string;
  category?: string;
  rules?: string;
  prize1?: string;
  prize2?: string;
  prize3?: string;
  numPlayersPerTeam: number;
  maxSubstitutes: number;
  minParticipants?: number;
  maxParticipants?: number;
  isPublished: boolean;
}
