import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

/**
 * Data that needs to be provided to the API to create a new tournament.
 */
@InputType()
export class CreateTournamentInput {
  @Field()
  @IsString()
  name: string;
}