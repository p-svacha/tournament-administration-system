import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTournamentInput {
  @Field({ nullable: true, description: "Name of the tournament" })
  name?: string;

  @Field({ nullable: true, description: "Flag indicating whether the tournament is published" })
  isPublished?: boolean;

  @Field({ nullable: true, description: "Tournament rules and regulations" })
  rules?: string;

  @Field({ nullable: true, description: "Category of the tournament" })
  category?: string;

  @Field({ nullable: true, description: "Prize for first place" })
  prize1?: string;

  @Field({ nullable: true, description: "Prize for second place" })
  prize2?: string;

  @Field({ nullable: true, description: "Prize for third place" })
  prize3?: string;

  @Field({ nullable: true, description: "Date and time of the tournament briefing" })
  briefingTime?: Date;

  @Field(() => Int, { nullable: true, description: "Number of players per team (default 1 for solo tournaments)" })
  numPlayersPerTeam?: number;

  @Field(() => Int, { nullable: true, description: "Minimum number of participants required for the tournament" })
  minParticipants?: number;

  @Field(() => Int, { nullable: true, description: "Maximum number of participants allowed" })
  maxParticipants?: number;
}
