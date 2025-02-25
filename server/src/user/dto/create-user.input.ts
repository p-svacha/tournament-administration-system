import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean } from 'class-validator';

/**
 * Data that needs to be provided to the API to create a new user.
 */
@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  seat: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  is_global_admin: boolean;
}