import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { TournamentEntity } from '../tournament/tournament.entity';
import { UserEntity } from '../user/user.entity';

@Entity('tournament_participant')
@Unique(['tournament', 'user'])
export class TournamentParticipantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.tournamentParticipants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tournament_id' })
  tournament: TournamentEntity;

  @ManyToOne(() => UserEntity, (user) => user.tournamentParticipants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'int', nullable: true })
  initial_seed: number;

  @Column({ type: 'int', nullable: true })
  final_rank: number;
}
