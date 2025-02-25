import { TournamentParticipantEntity } from "src/tournament-participant/tournament-participant.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    seat: string;

    @Column({ type: 'boolean', default: false })
    is_global_admin: boolean;

    @OneToMany(() => TournamentParticipantEntity, participant => participant.user)
    tournamentParticipants: TournamentParticipantEntity[];
}