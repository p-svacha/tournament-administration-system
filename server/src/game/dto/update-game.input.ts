import { Field, InputType } from '@nestjs/graphql';

/**
 * Data that can be provided to the API to update an existing game.
 */
@InputType()
export class UpdateGameInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  logoUrl: string;
}
