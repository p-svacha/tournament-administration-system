import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TournamentService } from './tournament.service';
import { TournamentModel } from './dto/tournament.model';
import { CreateTournamentInput } from './dto/create-tournament.input';
import { TournamentParticipantService } from 'src/tournament-participant/tournament-participant.service';
import { TournamentParticipantModel } from 'src/tournament-participant/dto/tournament-participant.model';

@Resolver(() => TournamentModel)
export class TournamentResolver {
    constructor(
        private readonly tournamentService: TournamentService,
        private readonly tournamentParticipantService: TournamentParticipantService
    ) {}

    @Query(() => [TournamentModel])
    async tournaments(): Promise<TournamentModel[]> {
        return this.tournamentService.findAllTournaments();
    }

    @ResolveField(() => [TournamentParticipantModel])
    async participants(@Parent() tournament: TournamentModel): Promise<TournamentParticipantModel[]> {
        return this.tournamentParticipantService.findParticipantsByTournament(tournament.id);
    }


    
    @Mutation(() => TournamentModel)
    async createTournament(@Args('data') createTournamentData: CreateTournamentInput): Promise<TournamentModel> {
        return this.tournamentService.createTournament(createTournamentData);
    }

}
