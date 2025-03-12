import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventModel } from 'src/event/dto/event.model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { GameModel } from '../game/dto/game.model';
import { CreateTournamentInput } from './dto/create-tournament.input';
import { TournamentModel } from './dto/tournament.model';
import { UpdateTournamentInput } from './dto/update-tournament-input';
import { TournamentEntity } from './tournament.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(TournamentEntity)
    private tournamentRepository: Repository<TournamentEntity>,
  ) {}

  async findTournaments(publishedOnly?: boolean, eventId?: number): Promise<TournamentModel[]> {
    let whereCondition: FindOptionsWhere<TournamentEntity> = {};

    if (publishedOnly) {
      whereCondition.is_published = true;
    }

    if (eventId) {
      whereCondition.event = { id: eventId };
    }

    const tournaments: TournamentEntity[] = await this.tournamentRepository.find({
      where: whereCondition,
      relations: ['event'],
    });

    // Map entities to models (output DTOs)
    return tournaments.map((tournamentEntity) => new TournamentModel(tournamentEntity));
  }

  async findTournamentById(id: number): Promise<TournamentModel> {
    const tournamentEntity = await this.tournamentRepository.findOne({
      where: { id: id },
    });

    if (!tournamentEntity) {
      throw new Error('Tournament not found');
    }

    return new TournamentModel(tournamentEntity);
  }

  async findTournamentsByEventId(eventId: number): Promise<TournamentModel[]> {
    const tournaments: TournamentEntity[] = await this.tournamentRepository.find({
      where: { event: { id: eventId } },
      relations: ['event'],
    });

    return tournaments.map((tournamentEntity) => new TournamentModel(tournamentEntity));
  }

  async findTournamentsByGameId(gameId: number): Promise<TournamentModel[]> {
    const tournaments: TournamentEntity[] = await this.tournamentRepository.find({
      where: { game: { id: gameId } },
      relations: ['game'],
    });

    return tournaments.map((tournamentEntity) => new TournamentModel(tournamentEntity));
  }

  async createTournament(input: CreateTournamentInput): Promise<TournamentModel> {
    // Map input DTO to entity
    const tournament: TournamentEntity = this.tournamentRepository.create({
      name: input.name,
      event: { id: input.eventId },
      game: { id: input.gameId },
    });

    // Save new entity
    const savedTournament: TournamentEntity = await this.tournamentRepository.save(tournament);

    // Return saved entity as model (output DTO)
    return new TournamentModel(savedTournament);
  }

  async findTournamentEvent(tournamentId: number): Promise<EventModel> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
      relations: ['event'],
    });
    if (!tournament || !tournament.event) {
      throw new Error('Event not found for tournament');
    }
    return new EventModel(tournament.event);
  }

  async findTournamentGame(tournamentId: number): Promise<GameModel> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
      relations: ['game'],
    });
    if (!tournament || !tournament.game) {
      throw new Error('Game not found for tournament');
    }
    return new GameModel(tournament.game);
  }

  async updateTournament(id: number, input: UpdateTournamentInput): Promise<TournamentModel> {
    // Find tournament
    const tournament = await this.tournamentRepository.findOne({
      where: { id: id },
    });
    if (!tournament) {
      throw new Error('Tournament not found');
    }

    // Update fields if provided
    if (input.name !== undefined) tournament.name = input.name;
    if (input.isPublished !== undefined) tournament.is_published = input.isPublished;
    if (input.rules !== undefined) tournament.rules = input.rules;
    if (input.category !== undefined) tournament.category = input.category;
    if (input.registrationGroup !== undefined) tournament.registration_group = input.registrationGroup;
    if (input.prize1 !== undefined) tournament.prize_first = input.prize1;
    if (input.prize2 !== undefined) tournament.prize_second = input.prize2;
    if (input.prize3 !== undefined) tournament.prize_third = input.prize3;
    if (input.briefingTime !== undefined) tournament.briefing_time = input.briefingTime;
    if (input.numPlayersPerTeam !== undefined) tournament.num_players_per_team = input.numPlayersPerTeam;
    if (input.maxSubstitutes !== undefined) tournament.max_substitutes = input.maxSubstitutes;
    if (input.minParticipants !== undefined) tournament.min_participants = input.minParticipants;
    if (input.maxParticipants !== undefined) tournament.max_participants = input.maxParticipants;

    // Save changes to db
    const updatedTournament = await this.tournamentRepository.save(tournament);

    // Return updated tournament
    return new TournamentModel(updatedTournament);
  }

  async deleteTournament(id: number): Promise<boolean> {
    const result = await this.tournamentRepository.delete(id);
    return result.affected != undefined && result.affected > 0;
  }
}
