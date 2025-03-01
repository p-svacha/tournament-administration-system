import { TournamentEntity } from 'src/tournament/tournament.entity';
import { UserEntity } from 'src/user/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('tournament-admin')
@Unique(['user', 'tournament'])
export class TournamentAdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.admins, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tournament_id' })
  tournament: TournamentEntity;

  @ManyToOne(() => UserEntity, (user) => user.adminTournaments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
