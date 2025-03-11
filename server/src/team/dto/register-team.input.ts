import { Field, InputType, Int } from '@nestjs/graphql';

/**
 * Data that needs to be provided to the API to create and register a new team.
 * The user creating the team is added as team captain.
 * The team is registered as a participant for the tournament it is created for.
 */
@InputType()
export class RegisterTeamInput {
  @Field({ description: 'The name of the team.' })
  name: string;

  @Field({ description: 'The tag or short identifier for the team.' })
  tag: string;

  @Field(() => Int, { description: 'The ID of the user creating the team, who will be set as the team captain.' })
  userId: number;

  @Field(() => Int, { description: 'The ID of the tournament for which the team is being registered.' })
  tournamentId: number;
}
