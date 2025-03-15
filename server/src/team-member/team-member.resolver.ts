import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { TeamMemberModel } from './dto/team-member.model';
import { TeamMemberService } from './team-member.service';

@Resolver(() => TeamMemberModel)
export class TeamMemberResolver {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Mutation(() => TeamMemberModel)
  async addTeamMember(
    @Args('teamId', { type: () => Int }) teamId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<TeamMemberModel> {
    return this.teamMemberService.addTeamMember(teamId, userId, false);
  }

  @Mutation(() => Boolean)
  async removeTeamMember(
    @Args('teamId', { type: () => Int }) teamId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    return this.teamMemberService.removeTeamMember(teamId, userId);
  }
}
