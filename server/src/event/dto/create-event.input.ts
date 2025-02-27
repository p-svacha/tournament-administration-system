import { Field, InputType } from '@nestjs/graphql';

/**
 * Data that needs to be provided to the API to create a new event.
 */
@InputType()
export class CreateEventInput {
  @Field()
  name: string;
}
