import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentEntity } from './tournament.entity';
import { TournamentModel } from './dto/tournament.model';
import { CreateTournamentInput } from './dto/create-tournament.input';

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(TournamentEntity)
        private tournamentRepository: Repository<TournamentEntity>
    ) {}

    async findAllTournaments(): Promise<TournamentModel[]> {
        // Find all entities
        const tournaments: TournamentEntity[] = await this.tournamentRepository.find();

        // Map entities to models (output DTOs)
        return tournaments.map(tournamentEntity => new TournamentModel(tournamentEntity));
    }

    async findTournamentById(id: number): Promise<TournamentModel> {
        const tournamentEntity = await this.tournamentRepository.findOne({
            where: { id: id }
        });

        if (!tournamentEntity) {
            throw new Error('Tournament not found');
        }

        return new TournamentModel(tournamentEntity);
    }

    async createTournament(input: CreateTournamentInput): Promise<TournamentModel> {
        // Map input DTO to entity
        const tournament: TournamentEntity = this.tournamentRepository.create({
            name: input.name
        });
    
        // Save new entity
        const savedTournament: TournamentEntity = await this.tournamentRepository.save(tournament);
    
        // Return saved entity as model (output DTO)
        return new TournamentModel(savedTournament);
    }
}
