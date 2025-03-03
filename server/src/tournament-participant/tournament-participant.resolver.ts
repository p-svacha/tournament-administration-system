import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { TournamentParticipantModel } from './dto/tournament-participant.model';
import { TournamentParticipantService } from './tournament-participant.service';

@Resolver(() => TournamentParticipantModel)
export class TournamentParticipantResolver {
  constructor(private readonly participantService: TournamentParticipantService) {}

  @Mutation(() => TournamentParticipantModel)
  async registerUserParticipant(
    @Args('tournamentId', { type: () => Int }) tournamentId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<TournamentParticipantModel> {
    return this.participantService.registerUserParticipant(tournamentId, userId);
  }

  @Mutation(() => Boolean)
  async deregisterUserParticipant(
    @Args('tournamentId', { type: () => Int }) tournamentId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    return this.participantService.deregisterUserParticipant(tournamentId, userId);
  }
}
