/**
 * Data that can be requested from the API for a specific team member.
 */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TeamModel } from '../../team/dto/team.model';
import { UserModel } from '../../user/dto/user.model';
import { TeamMemberEntity } from '../team-member.entity';

@ObjectType()
export class TeamMemberModel {
  @Field(() => Int)
  id: number;

  @Field(() => TeamModel)
  team: TeamModel;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => Boolean)
  isTeamCaptain: boolean;

  constructor(teamMemberEntity?: TeamMemberEntity) {
    if (teamMemberEntity) {
      this.id = teamMemberEntity.id;
      this.team = new TeamModel(teamMemberEntity.team);
      this.user = new UserModel(teamMemberEntity.user);
      this.isTeamCaptain = teamMemberEntity.is_team_captain;
    }
  }
}
