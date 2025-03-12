import { Field, InputType } from '@nestjs/graphql';

/**
 * Data that needs to be provided to the API to create a new game.
 */
@InputType()
export class CreateGameInput {
  @Field()
  name: string;

  @Field()
  logoUrl: string;
}