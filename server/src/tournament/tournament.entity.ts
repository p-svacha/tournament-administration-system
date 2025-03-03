import { EventEntity } from 'src/event/event.entity';
import { TournamentAdminEntity } from 'src/tournament-admin/tournament-admin.entity';
import { TournamentParticipantEntity } from 'src/tournament-participant/tournament-participant.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {GameEntity} from "../game/game.entity";

@Entity('tournament')
export class TournamentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventEntity, (event) => event.tournaments, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;

  @ManyToOne(() => GameEntity, (game) => game.tournaments, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_id' })
  game: GameEntity;

  @Column({ type: 'varchar', length: 255, comment: 'Name des Turniers' })
  name: string;

  @Column({ type: 'boolean', default: false, comment: 'Flag, ob das Turnier öffentlich angezeigt wird' })
  is_published: boolean;

  @Column({ type: 'text', nullable: true, comment: 'Regeln des Turniers' })
  rules: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Kategorie des Turniers, wonach die Turniere in der Turnierübersicht gruppiert werden.',
  })
  category: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment:
      'Registrierungsgruppe des Turniers. Teilnehmer können sich nur für ein Turnier innerhalb derselben Grupper registrieren.',
  })
  registration_group: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: 'Preis für den Erstplatzierten' })
  prize_first: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: 'Preis für den Zweitplatzierten' })
  prize_second: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: 'Preis für den Drittplatzierten' })
  prize_third: string;

  @Column({ type: 'datetime', nullable: true, comment: 'Datum und Zeit des Turnierbriefings' })
  briefing_time: Date;

  @Column({ type: 'int', default: 1, comment: 'Anzahl Spieler pro Team (1 = Solo)' })
  num_players_per_team: number;

  @Column({ type: 'int', nullable: true, comment: 'Minimale Teilnehmerzahl, damit das Turnier stattfinden kann' })
  min_participants: number;

  @Column({ type: 'int', nullable: true, comment: 'Maximale Teilnehmerzahl, die sich anmelden können' })
  max_participants: number;

  @OneToMany(() => TournamentParticipantEntity, (participant) => participant.tournament)
  tournamentParticipants: TournamentParticipantEntity[];

  @OneToMany(() => TournamentAdminEntity, (tournamentAdminEntity) => tournamentAdminEntity.tournament)
  admins: TournamentAdminEntity[];
}
