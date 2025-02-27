import { InputType, Field, Int } from '@nestjs/graphql';

/**
 * Data that needs to be provided to the API to register or deregister a user to a tournament.
 */
@InputType()
export class RegisterTournamentParticipantInput {
  @Field(() => Int)
  tournamentId: number;

  @Field(() => Int)
  userId: number;
}
