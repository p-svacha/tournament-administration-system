import { InputType, Field } from '@nestjs/graphql';

/**
 * Data that needs to be provided to the API to create a new tournament.
 */
@InputType()
export class CreateTournamentInput {
  @Field()
  name: string;
}
