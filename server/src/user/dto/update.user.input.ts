import { Field, InputType } from '@nestjs/graphql';

/**
 * Data that can be provided to the API to update an existing user.
 */
@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  seat: string;

  @Field({ nullable: true })
  isGlobalAdmin: boolean;
}
