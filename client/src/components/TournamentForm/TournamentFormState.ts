export default interface TournamentFormState {
  name: string;
  eventId: number;
  gameId: number;
  category?: string;
  registrationGroup?: string;
  rules?: string;
  prize1?: string;
  prize2?: string;
  prize3?: string;
  numPlayersPerTeam: number;
  maxSubstitutes: number;
  minParticipants?: number;
  maxParticipants?: number;
  briefingTime?: Date;
  isPublished: boolean;
}
