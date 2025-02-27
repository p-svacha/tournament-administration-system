import { Field, InputType } from '@nestjs/graphql';

/**
 * Data that can be provided to the API to update an existing event.
 */
@InputType()
export class UpdateEventInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  seat: string;

  @Field({ nullable: true })
  isGlobalAdmin: boolean;
}
