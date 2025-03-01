import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentAdminEntity } from './tournament-admin.entity';
import { Repository } from 'typeorm';
import { TournamentAdminModel } from './dto/tournament-admin.model';

@Injectable()
export class TournamentAdminService {
  constructor(
    @InjectRepository(TournamentAdminEntity)
    private readonly tournamentAdminRepository: Repository<TournamentAdminEntity>,
  ) {}

  async findTournamentAdminsByTournament(tournamentId: number): Promise<TournamentAdminModel[]> {
    const tournamentAdmins = await this.tournamentAdminRepository.find({
      where: { tournament: { id: tournamentId } },
      relations: ['tournament', 'user'],
    });

    return tournamentAdmins.map((tournamentAdmin) => new TournamentAdminModel(tournamentAdmin));
  }

  async findTournamentAdminsByUser(userId: number): Promise<TournamentAdminModel[]> {
    const tournamentAdmins = await this.tournamentAdminRepository.find({
      where: { user: { id: userId } },
      relations: ['tournament', 'user'],
    });

    return tournamentAdmins.map((tournamentAdmin) => new TournamentAdminModel(tournamentAdmin));
  }

  async addTournamentAdmin(tournamentId: number, userId: number): Promise<TournamentAdminModel> {
    const tournamentAdmin: TournamentAdminEntity = this.tournamentAdminRepository.create({
      tournament: { id: tournamentId },
      user: { id: userId },
    });

    const savedTournamentAdmin: TournamentAdminEntity = await this.tournamentAdminRepository.save(tournamentAdmin);

    return new TournamentAdminModel(savedTournamentAdmin);
  }

  async removeTournamentAdmin(tournamentId: number, userId: number): Promise<boolean> {
    const result = await this.tournamentAdminRepository.delete({
      tournament: { id: tournamentId },
      user: { id: userId },
    });

    return result.affected != null && result.affected > 0;
  }
}
