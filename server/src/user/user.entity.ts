import { TournamentParticipantEntity } from 'src/tournament-participant/tournament-participant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeamMemberEntity } from '../team-member/team-member.entity';
import { TournamentAdminEntity } from 'src/tournament-admin/tournament-admin.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  seat: string;

  @Column({ type: 'boolean', default: false })
  is_global_admin: boolean;

  @OneToMany(() => TournamentParticipantEntity, (participant) => participant.user)
  tournaments: TournamentParticipantEntity[];

  @OneToMany(() => TeamMemberEntity, (teamMember) => teamMember.user)
  teams: TeamMemberEntity[];

  @OneToMany(() => TournamentAdminEntity, (tournamentAdmin) => tournamentAdmin.user)
  adminTournaments: TournamentAdminEntity[];
}
