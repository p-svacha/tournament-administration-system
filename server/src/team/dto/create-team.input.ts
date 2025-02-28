import { InputType, Field, Int } from '@nestjs/graphql';

/**
 * Data that needs to be provided to the API to create a new team.
 */
@InputType()
export class CreateTeamInput {
  @Field()
  name: string;

  @Field()
  tag: string;
}
