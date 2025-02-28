import {Field, InputType} from '@nestjs/graphql';

/**
 * Data that can be provided to the API to update an existing team.
 */
@InputType()
export class UpdateTeamInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  tag: string;
}
