import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {UserModel} from './dto/user.model';
import {CreateUserInput} from './dto/create-user.input';
import {TournamentParticipantModel} from 'src/tournament-participant/dto/tournament-participant.model';
import {TournamentParticipantService} from 'src/tournament-participant/tournament-participant.service';
import {UpdateUserInput} from './dto/update.user.input';
import {TeamMemberModel} from "../team-member/dto/team-member.model";
import {TeamMemberService} from "../team-member/team-member.service";

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly teamMemberService: TeamMemberService,
    private readonly tournamentParticipantService: TournamentParticipantService,
  ) {}

  @Query(() => [UserModel!]!)
  async users(): Promise<UserModel[]> {
    return this.userService.findAllUsers();
  }

  @Query(() => UserModel)
  async user(@Args('id', { type: () => Int }) id: number): Promise<UserModel> {
    return this.userService.findUserById(id);
  }

  @ResolveField(() => [TournamentParticipantModel!]!)
  async tournaments(@Parent() user: UserModel): Promise<TournamentParticipantModel[]> {
    return this.tournamentParticipantService.findParticipantsByUser(user.id);
  }

  @ResolveField(() => [TeamMemberModel!]!)
  async teams(@Parent() user: UserModel): Promise<TeamMemberModel[]> {
    return this.teamMemberService.findTeamMembersByUser(user.id);
  }

  @Mutation(() => UserModel)
  async createUser(@Args('data') createUserData: CreateUserInput): Promise<UserModel> {
    return this.userService.createUser(createUserData);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => UpdateUserInput }) data: UpdateUserInput,
  ): Promise<UserModel> {
    return this.userService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
