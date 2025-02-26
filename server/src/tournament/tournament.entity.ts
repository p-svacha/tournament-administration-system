import { TournamentParticipantEntity } from "src/tournament-participant/tournament-participant.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Tournament')
export class TournamentEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255, comment: 'Name des Turniers' })
    name: string;
  
    @Column({ type: 'boolean', default: false, comment: 'Flag, ob das Turnier öffentlich angezeigt wird' })
    is_published: boolean;
  
    @Column({ type: 'text', nullable: true, comment: 'Regeln des Turniers' })
    rules: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true, comment: 'Kategorie des Turniers (zur Gruppierung)' })
    category: string;
  
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
  
    @OneToMany(() => TournamentParticipantEntity, participant => participant.tournament)
    tournamentParticipants: TournamentParticipantEntity[];
}