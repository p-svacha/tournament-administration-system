import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EventModel } from 'src/event/dto/event.model';
import { TournamentAdminModel } from 'src/tournament-admin/dto/tournament-admin.model';
import { TournamentParticipantModel } from 'src/tournament-participant/dto/tournament-participant.model';
import { TournamentEntity } from '../tournament.entity';

/**
 * Data that can be requested from the API for a specific tournament.
 */
@ObjectType()
export class TournamentModel {
  @Field(() => Int, { description: 'Unique identifier of the tournament.' })
  id: number;

  @Field(() => EventModel)
  event: EventModel;

  @Field({ description: 'Name of the tournament.' })
  name: string;

  @Field(() => Boolean, {
    description: 'Flag indicating whether the tournament is publicly displayed.',
  })
  isPublished: boolean;

  @Field({ nullable: true, description: 'Tournament rules.' })
  rules?: string;

  @Field({
    nullable: true,
    description: 'Tournaments are grouped by this category when displayed in the tournament overview.',
  })
  category?: string;

  @Field({
    nullable: true,
    description: 'Users can only participate in one tournament within the same registration group.',
  })
  registrationGroup?: string;

  @Field({ nullable: true, description: 'Prize for the first place.' })
  prize1?: string;

  @Field({ nullable: true, description: 'Prize for the second place.' })
  prize2?: string;

  @Field({ nullable: true, description: 'Prize for the third place.' })
  prize3?: string;

  @Field({
    nullable: true,
    description: 'Date and time of the tournament briefing.',
  })
  briefingTime?: Date;

  @Field(() => Int, {
    description: 'Number of players per team (1 means solo tournaments).',
  })
  numPlayersPerTeam: number;

  @Field(() => Int, { description: 'Maximum number of substutitues a team may have.' })
  maxSubstitutes: number;

  @Field(() => Int, {
    description: 'Minimum number of participants required for the tournament to take place.',
  })
  minParticipants: number;

  @Field(() => Int, {
    description:
      'Maximum number of participants that can register for the tournament (0 means there is no upper limit).',
  })
  maxParticipants: number;

  @Field(() => [TournamentParticipantModel], {
    description: 'List of participants registered for this tournament.',
  })
  participants: TournamentParticipantModel[];

  @Field(() => [TournamentAdminModel])
  admins: TournamentAdminModel[];

  constructor(tournamentEntity?: TournamentEntity) {
    if (tournamentEntity) {
      this.id = tournamentEntity.id;
      this.name = tournamentEntity.name;
      this.isPublished = tournamentEntity.is_published;
      this.rules = tournamentEntity.rules;
      this.category = tournamentEntity.category;
      this.registrationGroup = tournamentEntity.registration_group;
      this.prize1 = tournamentEntity.prize_first;
      this.prize2 = tournamentEntity.prize_second;
      this.prize3 = tournamentEntity.prize_third;
      this.briefingTime = tournamentEntity.briefing_time;
      this.numPlayersPerTeam = tournamentEntity.num_players_per_team;
      this.maxSubstitutes = tournamentEntity.max_substitutes;
      this.minParticipants = tournamentEntity.min_participants;
      this.maxParticipants = tournamentEntity.max_participants;
      this.participants = [];
    }
  }
}
