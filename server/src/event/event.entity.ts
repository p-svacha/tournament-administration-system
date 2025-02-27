import { TournamentEntity } from 'src/tournament/tournament.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, comment: 'Name des Events' })
  name: string;

  @OneToMany(() => TournamentEntity, (tournament) => tournament.event)
  tournaments: TournamentEntity[];
}
