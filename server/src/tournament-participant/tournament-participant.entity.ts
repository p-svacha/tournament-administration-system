import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { TournamentEntity } from '../tournament/tournament.entity';
import { UserEntity } from '../user/user.entity';
import { TeamEntity } from 'src/team/team.entity';

@Entity('tournament_participant')
export class TournamentParticipantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.tournamentParticipants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tournament_id' })
  tournament: TournamentEntity;

  @ManyToOne(() => UserEntity, (user) => user.tournaments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => TeamEntity, (team) => team.tournaments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @Column()
  participant_type: 'user' | 'team';

  @Column({ type: 'int', nullable: true })
  initial_seed: number;

  @Column({ type: 'int', nullable: true })
  final_rank: number;
}
