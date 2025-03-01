import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { TournamentAdminModel } from './dto/tournament-admin.model';
import { TournamentAdminService } from './tournament-admin.service';

@Resolver(() => TournamentAdminModel)
export class TournamentAdminResolver {
  constructor(private readonly tournamentAdminService: TournamentAdminService) {}

  @Mutation(() => TournamentAdminModel)
  async addTournamentAdmin(
    @Args('tournamentId', { type: () => Int }) tournamendId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<TournamentAdminModel> {
    return this.tournamentAdminService.addTournamentAdmin(tournamendId, userId);
  }

  @Mutation(() => Boolean)
  async removeTournamentAdmin(
    @Args('tournamentId', { type: () => Int }) tournamendId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    return this.tournamentAdminService.removeTournamentAdmin(tournamendId, userId);
  }
}
