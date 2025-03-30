export interface TournamentFormState {
  name: string;
  event: Event;
  game: Game;
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
  briefingTime?: string;
  isPublished: boolean;
  isTeamTournament?: boolean;
}

export interface Event {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  logoUrl: string;
}
