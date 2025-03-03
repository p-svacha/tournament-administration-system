import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TournamentEntity } from '../tournament/tournament.entity';

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 2000 })
  logo_url: string;

  @OneToMany(() => TournamentEntity, (tournament) => tournament.game)
  tournaments: TournamentEntity[];
}
