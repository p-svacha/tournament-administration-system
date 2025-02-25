import { TournamentParticipantEntity } from "src/tournament-participant/tournament-participant.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TournamentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @OneToMany(() => TournamentParticipantEntity, participant => participant.tournament)
    tournamentParticipants: TournamentParticipantEntity[];
}