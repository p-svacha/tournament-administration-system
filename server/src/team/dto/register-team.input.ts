import { Field, InputType, Int } from '@nestjs/graphql';

/**
 * Data that needs to be provided to the API to create and register a new team.
 * The user creating the team is added as team captain.
 * The team is registered as a participant for the tournament it is created for.
 */
@InputType()
export class RegisterTeamInput {
  @Field()
  name: string;

  @Field()
  tag: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  tournamentId: number;
}
