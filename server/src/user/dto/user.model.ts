import {Field, Int, ObjectType} from '@nestjs/graphql';
import {UserEntity} from '../user.entity';
import {TournamentParticipantModel} from 'src/tournament-participant/dto/tournament-participant.model';
import {TeamMemberModel} from "../../team-member/dto/team-member.model";

/**
 * Data that can be requested from the API for a specific user.
 */
@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  seat: string;

  @Field()
  isGlobalAdmin: boolean;

  @Field(() => [TournamentParticipantModel])
  tournaments: TournamentParticipantModel[];

  @Field(() => [TeamMemberModel])
  teams: TeamMemberModel[];

  constructor(userEntity?: UserEntity) {
    if (userEntity) {
      this.id = userEntity.id;
      this.name = userEntity.name;
      this.seat = userEntity.seat;
      this.isGlobalAdmin = userEntity.is_global_admin;
      this.tournaments = [];
    }
  }
}
