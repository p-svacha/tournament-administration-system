import { InputType, Field } from '@nestjs/graphql';

/**
 * Data that needs to be provided to the API to create a new user.
 */
@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  seat: string;

  @Field({ defaultValue: false })
  isGlobalAdmin: boolean;
}
