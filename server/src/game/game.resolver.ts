import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GameModel } from './dto/game.model';
import { GameService } from './game.service';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { TournamentModel } from '../tournament/dto/tournament.model';
import { TournamentService } from '../tournament/tournament.service';

@Resolver(() => GameModel)
export class GameResolver {
  constructor(
    private readonly gameService: GameService,
    private readonly tournamentService: TournamentService,
  ) {}

  @Query(() => [GameModel!]!)
  async games(): Promise<GameModel[]> {
    return this.gameService.findAllGames();
  }

  @Query(() => GameModel, { nullable: true })
  async game(@Args('id', { type: () => Int }) id: number): Promise<GameModel> {
    return this.gameService.findGameById(id);
  }

  @ResolveField(() => [TournamentModel!]!)
  async tournaments(@Parent() game: GameModel): Promise<TournamentModel[]> {
    return this.tournamentService.findTournamentsByGameId(game.id);
  }

  @Mutation(() => GameModel!)
  async createGame(@Args('data', { type: () => CreateGameInput }) data: CreateGameInput): Promise<GameModel> {
    return this.gameService.createGame(data);
  }

  @Mutation(() => GameModel)
  async updateGame(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => UpdateGameInput }) data: UpdateGameInput,
  ): Promise<GameModel> {
    return this.gameService.updateGame(id, data);
  }

  @Mutation(() => Boolean)
  async deleteGame(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.gameService.deleteGame(id);
  }
}
