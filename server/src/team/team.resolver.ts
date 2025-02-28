import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TeamModel } from './dto/team.model';
import { TeamService } from './team.service';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team-input';
import { TeamMemberModel } from '../team-member/dto/team-member.model';
import { TeamMemberService } from '../team-member/team-member.service';

@Resolver(() => TeamModel)
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService,
    private readonly teamMemberService: TeamMemberService,
  ) {}

  @Query(() => [TeamModel!]!)
  async teams(): Promise<TeamModel[]> {
    return this.teamService.findAllTeams();
  }

  @Query(() => TeamModel)
  async team(@Args('id', { type: () => Int }) id: number): Promise<TeamModel> {
    return this.teamService.findTeamById(id);
  }

  @ResolveField(() => [TeamMemberModel!]!)
  async users(@Parent() team: TeamModel): Promise<TeamMemberModel[]> {
    return this.teamMemberService.findTeamMembersByTeam(team.id);
  }

  @Mutation(() => TeamModel)
  async createTeam(@Args('data') createTeamData: CreateTeamInput): Promise<TeamModel> {
    return this.teamService.createTeam(createTeamData);
  }

  @Mutation(() => TeamModel)
  async updateTeam(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => UpdateTeamInput }) data: UpdateTeamInput,
  ): Promise<TeamModel> {
    return this.teamService.updateTeam(id, data);
  }

  @Mutation(() => Boolean)
  async deleteTeam(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.teamService.deleteTeam(id);
  }
}
