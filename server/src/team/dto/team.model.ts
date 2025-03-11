import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TournamentParticipantModel } from 'src/tournament-participant/dto/tournament-participant.model';
import { TeamMemberModel } from '../../team-member/dto/team-member.model';
import { TeamEntity } from '../team.entity';

/**
 * Data that can be requested from the API for a specific team.
 */
@ObjectType()
export class TeamModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  tag: string;

  @Field(() => [TeamMemberModel])
  members: TeamMemberModel[];

  @Field(() => [TournamentParticipantModel])
  tournaments: TournamentParticipantModel[];

  constructor(teamEntity?: TeamEntity) {
    if (teamEntity) {
      this.id = teamEntity.id;
      this.name = teamEntity.name;
      this.tag = teamEntity.tag;
    }
  }
}
