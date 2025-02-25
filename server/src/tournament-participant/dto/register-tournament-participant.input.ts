import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

/**
 * Data that needs to be provided to the API to register or deregister a user to a tournament.
 */
@InputType()
export class RegisterTournamentParticipantInput {
  @Field(() => Int)
  @IsInt()
  tournamentId: number;

  @Field(() => Int)
  @IsInt()
  userId: number;
}