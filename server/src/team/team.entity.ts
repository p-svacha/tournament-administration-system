import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeamMemberEntity } from '../team-member/team-member.entity';

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 3 })
  tag: string;

  @OneToMany(() => TeamMemberEntity, (teamMember) => teamMember.team)
  members: TeamMemberEntity[];
}
