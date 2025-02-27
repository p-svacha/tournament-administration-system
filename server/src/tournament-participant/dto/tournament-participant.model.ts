import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TournamentModel } from 'src/tournament/dto/tournament.model';
import { UserModel } from 'src/user/dto/user.model';
import { TournamentParticipantEntity } from '../tournament-participant.entity';

@ObjectType()
export class TournamentParticipantModel {
  @Field(() => TournamentModel)
  tournament: TournamentModel;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => Int, { nullable: true })
  initialSeed: number;

  @Field(() => Int, { nullable: true })
  finalRank: number;

  constructor(participantEntity?: TournamentParticipantEntity) {
    if (participantEntity) {
      this.tournament = new TournamentModel(participantEntity.tournament);
      this.user = new UserModel(participantEntity.user);
      this.initialSeed = participantEntity.initial_seed;
      this.finalRank = participantEntity.final_rank;
    }
  }
}
