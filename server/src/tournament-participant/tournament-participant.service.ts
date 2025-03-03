import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentParticipantModel } from './dto/tournament-participant.model';
import { TournamentParticipantEntity } from './tournament-participant.entity';

@Injectable()
export class TournamentParticipantService {
  constructor(
    @InjectRepository(TournamentParticipantEntity)
    private tournamentParticipantRepository: Repository<TournamentParticipantEntity>,
  ) {}

  /**
   * Registers an individual user as a participant in a tournament.
   * Creates a new tournament participant entity linking the tournament and the user.
   *
   * @param tournamentId - The ID of the tournament.
   * @param userId - The ID of the user.
   * @returns The registered tournament participant as a model.
   */
  async registerUserParticipant(tournamentId: number, userId: number): Promise<TournamentParticipantModel> {
    // Check if an entry already exists
    const existing = await this.tournamentParticipantRepository.findOne({
      where: {
        tournament: { id: tournamentId },
        user: { id: userId },
        participant_type: 'user',
      },
    });
    if (existing) {
      return new TournamentParticipantModel(existing);
    }

    // Create new entity
    const newTournamentParticipant: TournamentParticipantEntity = this.tournamentParticipantRepository.create({
      tournament: { id: tournamentId },
      user: { id: userId },
      participant_type: 'user',
    });

    // Save new entity
    const savedTournamentParticipant: TournamentParticipantEntity =
      await this.tournamentParticipantRepository.save(newTournamentParticipant);

    // Return saved entity as model
    return new TournamentParticipantModel(savedTournamentParticipant);
  }

  /**
   * Deregisters an individual user from a tournament.
   * Deletes the tournament participant entry matching the provided tournament and user IDs.
   *
   * @param tournamentId - The ID of the tournament.
   * @param userId - The ID of the user.
   * @returns True if the participant entry was successfully removed, false otherwise.
   */
  async deregisterUserParticipant(tournamentId: number, userId: number): Promise<boolean> {
    // Delete participant db entry with matching tournament and user id
    const result = await this.tournamentParticipantRepository.delete({
      tournament: { id: tournamentId },
      user: { id: userId },
      participant_type: 'user',
    });

    return result.affected != null && result.affected > 0;
  }

  /**
   * Registers a team as a participant in a tournament.
   * Creates a new tournament participant entity linking the tournament and the team.
   *
   * @param tournamentId - The ID of the tournament.
   * @param teamId - The ID of the team.
   * @returns The registered tournament participant as a model.
   */
  async registerTeamParticipant(tournamentId: number, teamId: number): Promise<TournamentParticipantModel> {
    // Check if an entry already exists
    const existing = await this.tournamentParticipantRepository.findOne({
      where: {
        tournament: { id: tournamentId },
        team: { id: teamId },
        participant_type: 'team',
      },
    });
    if (existing) {
      return new TournamentParticipantModel(existing);
    }

    const newTournamentParticipant: TournamentParticipantEntity = this.tournamentParticipantRepository.create({
      tournament: { id: tournamentId },
      team: { id: teamId },
      participant_type: 'team',
    });

    const savedTournamentParticipant: TournamentParticipantEntity =
      await this.tournamentParticipantRepository.save(newTournamentParticipant);

    return new TournamentParticipantModel(savedTournamentParticipant);
  }

  /**
   * Deregisters a team from a tournament.
   * Deletes the tournament participant entry matching the provided tournament and team IDs.
   *
   * @param tournamentId - The ID of the tournament.
   * @param teamId - The ID of the team.
   * @returns True if the participant entry was successfully removed, false otherwise.
   */
  async deregisterTeamParticipant(tournamentId: number, teamId: number): Promise<boolean> {
    const result = await this.tournamentParticipantRepository.delete({
      tournament: { id: tournamentId },
      team: { id: teamId },
      participant_type: 'team',
    });

    return result.affected != null && result.affected > 0;
  }

  /**
   * Retrieves all participant entries (both users and teams) for a specific tournament.
   *
   * @param tournamentId - The ID of the tournament.
   * @returns An array of tournament participant models.
   */
  async findParticipantsByTournament(tournamentId: number): Promise<TournamentParticipantModel[]> {
    const participants: TournamentParticipantEntity[] = await this.tournamentParticipantRepository.find({
      where: { tournament: { id: tournamentId } },
      relations: ['user', 'team', 'tournament'],
    });

    return participants.map((p) => new TournamentParticipantModel(p));
  }

  /**
   * Retrieves all tournament participant entries for a specific user.
   *
   * @param userId - The ID of the user.
   * @returns An array of tournament participant models associated with the user.
   */
  async findParticipantsByUser(userId: number): Promise<TournamentParticipantModel[]> {
    const participants: TournamentParticipantEntity[] = await this.tournamentParticipantRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'tournament'],
    });

    return participants.map((p) => new TournamentParticipantModel(p));
  }

  /**
   * Retrieves all tournament participant entries for a specific team.
   *
   * @param teamId - The ID of the team.
   * @returns An array of tournament participant models associated with the team.
   */
  async findParticipantsByTeam(teamId: number): Promise<TournamentParticipantModel[]> {
    const participants: TournamentParticipantEntity[] = await this.tournamentParticipantRepository.find({
      where: { team: { id: teamId } },
      relations: ['team', 'tournament'],
    });

    return participants.map((p) => new TournamentParticipantModel(p));
  }
}
