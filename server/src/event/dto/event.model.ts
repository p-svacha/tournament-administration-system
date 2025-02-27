import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TournamentModel } from 'src/tournament/dto/tournament.model';
import { EventEntity } from '../event.entity';

@ObjectType()
export class EventModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [TournamentModel])
  tournaments: TournamentModel[];

  constructor(eventEntity: EventEntity) {
    this.id = eventEntity.id;
    this.name = eventEntity.name;
    this.tournaments = [];
  }
}
