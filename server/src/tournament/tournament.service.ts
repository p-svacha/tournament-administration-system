import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './tournament.entity';

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament)
        private tournamentRepository: Repository<Tournament>,
    ) {}

    async create(name: string): Promise<Tournament> {
        const tournament = this.tournamentRepository.create({ name });
        return await this.tournamentRepository.save(tournament);
    }

    async findAll(): Promise<Tournament[]> {
        return await this.tournamentRepository.find();
    }
}
