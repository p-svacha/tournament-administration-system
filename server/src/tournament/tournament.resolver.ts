import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TournamentService } from './tournament.service';
import { TournamentModel } from './dto/tournament.model';
import { CreateTournamentInput } from './dto/create-tournament.input';
import { TournamentParticipantService } from 'src/tournament-participant/tournament-participant.service';
import { TournamentParticipantModel } from 'src/tournament-participant/dto/tournament-participant.model';
import { UpdateTournamentInput } from './dto/update-tournament-input';
import { publish } from 'rxjs';

@Resolver(() => TournamentModel)
export class TournamentResolver {
    constructor(
        private readonly tournamentService: TournamentService,
        private readonly tournamentParticipantService: TournamentParticipantService
    ) {}

    @Query(() => [TournamentModel])
    async tournaments(
        @Args('publishedOnly', {type: () => Boolean, nullable: true, defaultValue: true}) publishedOnly: boolean
    ): Promise<TournamentModel[]> {
        return this.tournamentService.findAllTournaments(publishedOnly);
    }

    @Query(() => TournamentModel, { nullable: true })
    async tournament(
        @Args('id', {type: () => Int }) id: number
    ): Promise<TournamentModel> {
        return this.tournamentService.findTournamentById(id);
    }

    @ResolveField(() => [TournamentParticipantModel])
    async participants(@Parent() tournament: TournamentModel): Promise<TournamentParticipantModel[]> {
        return this.tournamentParticipantService.findParticipantsByTournament(tournament.id);
    }

    @Mutation(() => TournamentModel)
    async createTournament(@Args('data') createTournamentData: CreateTournamentInput): Promise<TournamentModel> {
        return this.tournamentService.createTournament(createTournamentData);
    }

    @Mutation(() => TournamentModel)
    async updateTournament(
      @Args('id', { type: () => Int }) id: number,
      @Args('data') updateTournamentData: UpdateTournamentInput
    ): Promise<TournamentModel> {
      return this.tournamentService.updateTournament(id, updateTournamentData);
    }
  
    @Mutation(() => Boolean)
    async deleteTournament(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
      return this.tournamentService.deleteTournament(id);
    }
}
