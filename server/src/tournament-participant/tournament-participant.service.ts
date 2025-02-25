import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterTournamentParticipantInput } from './dto/register-tournament-participant.input';
import { TournamentParticipantEntity } from './tournament-participant.entity';
import { TournamentParticipantModel } from './dto/tournament-participant.model';

@Injectable()
export class TournamentParticipantService {
    constructor(
        @InjectRepository(TournamentParticipantEntity)
        private participantRepository: Repository<TournamentParticipantEntity>,
    ) {}

    async registerParticipant(input: RegisterTournamentParticipantInput): Promise<TournamentParticipantModel> {
        // Map input DTO to entity
        const tournamentParticipant: TournamentParticipantEntity = this.participantRepository.create({
            tournament: { id: input.tournamentId },
            user: { id: input.userId }
        });
    
        // Save new entity
        const savedTournamentParticipant: TournamentParticipantEntity = await this.participantRepository.save(tournamentParticipant);
        
        // Return saved entity as model
        return new TournamentParticipantModel(savedTournamentParticipant);
    }

    async deregisterParticipant(input: RegisterTournamentParticipantInput): Promise<boolean> {
        // Delete participant db entry with matching tournament and user id
        const result = await this.participantRepository.delete({
          tournament: { id: input.tournamentId },
          user: { id: input.userId },
        });

        return result.affected != null && result.affected > 0;
    }

    /**
     * Returns all participant objects for a specific tournament.
     */
    async findParticipantsByTournament(tournamentId: number): Promise<TournamentParticipantModel[]> {
        const participants: TournamentParticipantEntity[] = await this.participantRepository.find({
          where: { tournament: { id: tournamentId } },
          relations: ['user', 'tournament'],
        });

        return participants.map(p => new TournamentParticipantModel(p));
      }
      
      /**
     * Returns all participant objects for a specific user.
     */
      async findParticipantsByUser(userId: number): Promise<TournamentParticipantModel[]> {
        const participants: TournamentParticipantEntity[] = await this.participantRepository.find({
          where: { user: { id: userId } },
          relations: ['user', 'tournament'],
        });

        return participants.map(p => new TournamentParticipantModel(p));
      }
}
