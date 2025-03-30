import {Field, InputType, Int} from '@nestjs/graphql';

/**
 * Data that can be provided to the API to update an existing tournament.
 */
@InputType()
export class UpdateTournamentInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Int)
  eventId: number;

  @Field(() => Int)
  gameId: number;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  registrationGroup?: string;

  @Field()
  rules?: string;

  @Field({ nullable: true })
  prize1?: string;

  @Field({ nullable: true })
  prize2?: string;

  @Field({ nullable: true })
  prize3?: string;

  @Field(() => Int, { nullable: true })
  numPlayersPerTeam?: number;

  @Field(() => Int, { nullable: true })
  maxSubstitutes?: number;

  @Field(() => Int, { nullable: true })
  minParticipants?: number;

  @Field(() => Int, { nullable: true })
  maxParticipants?: number;

  @Field({ nullable: true })
  briefingTime?: Date;

  @Field({ nullable: true })
  isPublished?: boolean;
}
