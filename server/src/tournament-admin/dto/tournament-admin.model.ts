import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TournamentModel } from 'src/tournament/dto/tournament.model';
import { UserModel } from 'src/user/dto/user.model';
import { TournamentAdminEntity } from '../tournament-admin.entity';

@ObjectType()
export class TournamentAdminModel {
  @Field(() => Int)
  id: number;

  @Field(() => TournamentModel)
  tournament: TournamentModel;

  @Field(() => UserModel)
  user: UserModel;

  constructor(tournamentAdminEntity?: TournamentAdminEntity) {
    if (tournamentAdminEntity) {
      this.id = tournamentAdminEntity.id;
      this.tournament = new TournamentModel(tournamentAdminEntity.tournament);
      this.user = new UserModel(tournamentAdminEntity.user);
    }
  }
}
