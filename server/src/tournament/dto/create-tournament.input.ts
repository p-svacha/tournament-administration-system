import {Field, InputType, Int} from '@nestjs/graphql';

/**
 * Data that needs to be provided to the API to create a new tournament.
 */
@InputType()
export class CreateTournamentInput {
  @Field()
  name?: string;

  @Field(() => Int)
  eventId: number;

  @Field(() => Int)
  gameId: number;

  @Field()
  category?: string;

  @Field()
  registrationGroup?: string;

  @Field()
  rules?: string;

  @Field()
  prize1?: string;

  @Field()
  prize2?: string;

  @Field()
  prize3?: string;

  @Field()
  numPlayersPerTeam: number;

  @Field()
  maxSubstitutes?: number;

  @Field()
  minParticipants?: number;

  @Field()
  maxParticipants?: number;

  @Field()
  briefingTime?: Date;

  @Field()
  isPublished?: boolean;
}
