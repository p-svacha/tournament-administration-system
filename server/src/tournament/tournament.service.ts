import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentEntity } from './tournament.entity';
import { TournamentModel } from './dto/tournament.model';
import { CreateTournamentInput } from './dto/create-tournament.input';
import { UpdateTournamentInput } from './dto/update-tournament-input';

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

    async updateTournament(id: number, input: UpdateTournamentInput): Promise<TournamentModel> {
        const tournament = await this.tournamentRepository.findOne({ where: { id } });
        if (!tournament) {
          throw new Error('Tournament not found');
        }
        // Update fields if provided
        if (input.name !== undefined) tournament.name = input.name;
        if (input.is_published !== undefined) tournament.is_published = input.is_published;
        if (input.rules !== undefined) tournament.rules = input.rules;
        if (input.category !== undefined) tournament.category = input.category;
        if (input.prize_first !== undefined) tournament.prize_first = input.prize_first;
        if (input.prize_second !== undefined) tournament.prize_second = input.prize_second;
        if (input.prize_third !== undefined) tournament.prize_third = input.prize_third;
        if (input.briefing_time !== undefined) tournament.briefing_time = input.briefing_time;
        if (input.num_players_per_team !== undefined) tournament.num_players_per_team = input.num_players_per_team;
        if (input.min_participants !== undefined) tournament.min_participants = input.min_participants;
        if (input.max_participants !== undefined) tournament.max_participants = input.max_participants;
    
        const updatedTournament = await this.tournamentRepository.save(tournament);
        return new TournamentModel(updatedTournament);
      }
    
      async deleteTournament(id: number): Promise<boolean> {
        const result = await this.tournamentRepository.delete(id);
        return result.affected != undefined && result.affected > 0;
      }
}
