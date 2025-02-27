import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterTournamentParticipantInput } from './dto/register-tournament-participant.input';
import { TournamentParticipantModel } from './dto/tournament-participant.model';
import { TournamentParticipantService } from './tournament-participant.service';

@Resolver(() => TournamentParticipantModel)
export class TournamentParticipantResolver {
  constructor(private readonly participantService: TournamentParticipantService) {}

  @Mutation(() => TournamentParticipantModel)
  async registerParticipant(
    @Args('data') registerParticipantData: RegisterTournamentParticipantInput,
  ): Promise<TournamentParticipantModel> {
    return this.participantService.registerParticipant(registerParticipantData);
  }

  @Mutation(() => Boolean)
  async deregisterParticipant(
    @Args('data') registerParticipantData: RegisterTournamentParticipantInput,
  ): Promise<boolean> {
    return this.participantService.deregisterParticipant(registerParticipantData);
  }
}
