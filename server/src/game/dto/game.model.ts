import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TournamentModel } from '../../tournament/dto/tournament.model';
import { GameEntity } from '../game.entity';

@ObjectType()
export class GameModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  logoUrl: string;

  @Field(() => [TournamentModel])
  tournaments: TournamentModel[];

  constructor(gameEntity: GameEntity) {
    this.id = gameEntity.id;
    this.name = gameEntity.name;
    this.logoUrl = gameEntity.logoUrl;
    this.tournaments = [];
  }
}
