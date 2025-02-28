/**
 * Data that can be requested from the API for a specific team.
 */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TeamEntity } from '../team.entity';
import { TeamMemberModel } from '../../team-member/dto/team-member.model';

@ObjectType()
export class TeamModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  tag: string;

  @Field(() => [TeamMemberModel])
  users: TeamMemberModel[];

  constructor(teamEntity?: TeamEntity) {
    if (teamEntity) {
      this.id = teamEntity.id;
      this.name = teamEntity.name;
      this.tag = teamEntity.tag;
    }
  }
}