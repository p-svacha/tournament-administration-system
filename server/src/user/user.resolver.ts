import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './dto/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { TournamentParticipantModel } from 'src/tournament-participant/dto/tournament-participant.model';
import { TournamentParticipantService } from 'src/tournament-participant/tournament-participant.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly tournamentParticipantService: TournamentParticipantService
  ) {}

  @Query(() => [UserModel])
  async users(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @ResolveField(() => [TournamentParticipantModel])
  async tournaments(@Parent() user: UserModel): Promise<TournamentParticipantModel[]> {
    return this.tournamentParticipantService.findParticipantsByUser(user.id);
  }

  @Mutation(() => UserModel)
  async createUser(@Args('data') createUserData: CreateUserInput): Promise<UserModel> {
    return this.userService.create(createUserData);
  }
}