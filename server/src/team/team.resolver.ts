import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TournamentParticipantModel } from 'src/tournament-participant/dto/tournament-participant.model';
import { TournamentParticipantService } from 'src/tournament-participant/tournament-participant.service';
import { TeamMemberModel } from '../team-member/dto/team-member.model';
import { TeamMemberService } from '../team-member/team-member.service';
import { RegisterTeamInput } from './dto/register-team.input';
import { RegisterTeamOutput } from './dto/register-team.output';
import { TeamModel } from './dto/team.model';
import { UpdateTeamInput } from './dto/update-team.input';
import { TeamService } from './team.service';

@Resolver(() => TeamModel)
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService,
    private readonly teamMemberService: TeamMemberService,
    private readonly tournamentParticipantService: TournamentParticipantService,
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
  async members(@Parent() team: TeamModel): Promise<TeamMemberModel[]> {
    return this.teamMemberService.findTeamMembersByTeam(team.id);
  }

  @ResolveField(() => [TournamentParticipantModel])
  async tournaments(@Parent() team: TeamModel): Promise<TournamentParticipantModel[]> {
    return this.tournamentParticipantService.findParticipantsByTeam(team.id);
  }

  /**
   * Composite mutation that creates a new team, adds the creating user as captain,
   * and registers the team as a participant in a tournament.
   *
   * @param data - The input data containing team details, user ID, and tournament ID.
   * @returns A payload object containing the newly created team and a success flag.
   */
  @Mutation(() => RegisterTeamOutput)
  async registerTeam(@Args('data') data: RegisterTeamInput): Promise<RegisterTeamOutput> {
    try {
      // Create team
      const newTeam: TeamModel = await this.teamService.createTeam(data.name, data.tag);

      // Add creating user as captain
      await this.teamMemberService.addTeamMember(newTeam.id, data.userId, true);

      // Register new team as tournament participant
      await this.tournamentParticipantService.registerTeamParticipant(data.tournamentId, newTeam.id);

      // Return the payload with the created team
      return { success: true, team: newTeam };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Mutation(() => TeamModel)
  async updateTeam(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => UpdateTeamInput }) data: UpdateTeamInput,
  ): Promise<TeamModel> {
    return this.teamService.updateTeam(id, data);
  }

  @Mutation(() => Boolean)
  async deregisterTeam(@Args('id', { type: () => Int }) teamId: number): Promise<boolean> {
    return this.teamService.deleteTeam(teamId);
  }
}
