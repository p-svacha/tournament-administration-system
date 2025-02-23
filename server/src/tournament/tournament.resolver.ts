import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tournament } from './tournament.entity';
import { TournamentService } from './tournament.service';

@Resolver(() => Tournament)
export class TournamentResolver {
    constructor(private readonly tournamentService: TournamentService) {}

    @Query(() => [Tournament])
    async tournaments(): Promise<Tournament[]> {
        return this.tournamentService.findAll();
    }

    @Mutation(() => Tournament)
    async createTournament(@Args('name') name: string): Promise<Tournament> {
        return this.tournamentService.create(name);
    }
}
