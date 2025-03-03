import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TeamModel } from 'src/team/dto/team.model';
import { TournamentModel } from 'src/tournament/dto/tournament.model';
import { UserModel } from 'src/user/dto/user.model';
import { TournamentParticipantEntity } from '../tournament-participant.entity';

@ObjectType()
export class TournamentParticipantModel {
  @Field(() => TournamentModel)
  tournament: TournamentModel;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => TeamModel, { nullable: true })
  team?: TeamModel;

  @Field(() => Int, { nullable: true })
  initialSeed?: number;

  @Field(() => Int, { nullable: true })
  finalRank?: number;

  constructor(participantEntity?: TournamentParticipantEntity) {
    if (participantEntity) {
      this.tournament = new TournamentModel(participantEntity.tournament);
      this.user = participantEntity.user ? new UserModel(participantEntity.user) : undefined;
      this.team = participantEntity.team ? new TeamModel(participantEntity.team) : undefined;
      this.initialSeed = participantEntity.initial_seed;
      this.finalRank = participantEntity.final_rank;
    }
  }
}
