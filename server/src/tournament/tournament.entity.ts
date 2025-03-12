import { EventEntity } from 'src/event/event.entity';
import { TournamentAdminEntity } from 'src/tournament-admin/tournament-admin.entity';
import { TournamentParticipantEntity } from 'src/tournament-participant/tournament-participant.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tournament')
export class TournamentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventEntity, (event) => event.tournaments, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;

  @Column({ type: 'varchar', length: 255, comment: 'Tournament name' })
  name: string;

  @Column({ type: 'boolean', default: false, comment: 'Indicates whether the tournament is publicly visible' })
  is_published: boolean;

  @Column({ type: 'text', nullable: true, comment: 'Tournament rules' })
  rules: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Tournament category used to group tournaments in the overview',
  })
  category: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Tournament registration group. Participants can register for only one tournament within the same group',
  })
  registration_group: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: 'Prize for first place' })
  prize_first: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: 'Prize for second place' })
  prize_second: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: 'Prize for third place' })
  prize_third: string;

  @Column({ type: 'datetime', nullable: true, comment: 'Date and time of the tournament briefing' })
  briefing_time: Date;

  @Column({
    type: 'int',
    default: 1,
    comment: 'Number of players per team (1 for solo tournament, 2+ for team tournament)',
  })
  num_players_per_team: number;

  @Column({ type: 'int', default: 1, comment: 'Maximum number of substitutes allowed per team' })
  max_substitutes: number;

  @Column({
    type: 'int',
    default: 1,
    comment: 'Minimum number of participants required for the tournament to take place',
  })
  min_participants: number;

  @Column({ type: 'int', nullable: true, comment: 'Maximum number of participants that can register' })
  max_participants: number;

  @OneToMany(() => TournamentParticipantEntity, (participant) => participant.tournament)
  tournamentParticipants: TournamentParticipantEntity[];

  @OneToMany(() => TournamentAdminEntity, (tournamentAdminEntity) => tournamentAdminEntity.tournament)
  admins: TournamentAdminEntity[];
}
