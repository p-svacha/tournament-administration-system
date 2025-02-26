import { Field, Int, ObjectType } from "@nestjs/graphql";
import { TournamentEntity } from "../tournament.entity";
import { TournamentParticipantModel } from "src/tournament-participant/dto/tournament-participant.model";

/**
 * Data that can be requested from the API for a specific tournament.
 */
@ObjectType()
export class TournamentModel {
  @Field(() => Int, { description: "Unique identifier of the tournament" })
  id: number;

  @Field({ description: "Name of the tournament" })
  name: string;

  @Field(() => Boolean, { description: "Flag indicating whether the tournament is publicly displayed" })
  is_published: boolean;

  @Field({ nullable: true, description: "Tournament rules and regulations" })
  rules?: string;

  @Field({ nullable: true, description: "Category of the tournament (used for grouping)" })
  category?: string;

  @Field({ nullable: true, description: "Prize for the first place" })
  prize_first?: string;

  @Field({ nullable: true, description: "Prize for the second place" })
  prize_second?: string;

  @Field({ nullable: true, description: "Prize for the third place" })
  prize_third?: string;

  @Field({ nullable: true, description: "Date and time of the tournament briefing" })
  briefing_time?: Date;

  @Field(() => Int, { description: "Number of players per team (default 1 for solo tournaments)" })
  num_players_per_team: number;

  @Field(() => Int, { nullable: true, description: "Minimum number of participants required for the tournament to take place" })
  min_participants?: number;

  @Field(() => Int, { nullable: true, description: "Maximum number of participants that can register for the tournament" })
  max_participants?: number;

  @Field(() => [TournamentParticipantModel], { nullable: true, description: "List of participants registered for this tournament" })
  participants?: TournamentParticipantModel[];

  constructor(tournamentEntity?: TournamentEntity) {
    if (tournamentEntity) {
      this.id = tournamentEntity.id;
      this.name = tournamentEntity.name;
      this.is_published = tournamentEntity.is_published;
      this.rules = tournamentEntity.rules;
      this.category = tournamentEntity.category;
      this.prize_first = tournamentEntity.prize_first;
      this.prize_second = tournamentEntity.prize_second;
      this.prize_third = tournamentEntity.prize_third;
      this.briefing_time = tournamentEntity.briefing_time;
      this.num_players_per_team = tournamentEntity.num_players_per_team;
      this.min_participants = tournamentEntity.min_participants;
      this.max_participants = tournamentEntity.max_participants;
    }
  }
}