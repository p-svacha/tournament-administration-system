import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamModel } from './dto/team.model';
import { UpdateTeamInput } from './dto/update-team-input';
import { TeamEntity } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}

  async findAllTeams(): Promise<TeamModel[]> {
    // Find all entities
    const teams: TeamEntity[] = await this.teamRepository.find();

    // Map entities to models (output DTOs)
    return teams.map((teamEntity) => new TeamModel(teamEntity));
  }

  async findTeamById(id: number): Promise<TeamModel> {
    const team = await this.teamRepository.findOne({ where: { id: id } });
    if (!team) {
      throw new Error('Team not found');
    }

    return new TeamModel(team);
  }

  async createTeam(name: string, tag: string): Promise<TeamModel> {
    // Map input DTO to entity
    const team: TeamEntity = this.teamRepository.create({
      name: name,
      tag: tag,
    });

    // Save new entity
    const savedTeam: TeamEntity = await this.teamRepository.save(team);

    // Return saved entity as model (output DTO)
    return new TeamModel(savedTeam);
  }

  async updateTeam(id: number, input: UpdateTeamInput): Promise<TeamModel> {
    // Find affected team
    const team = await this.teamRepository.findOne({ where: { id: id } });
    if (!team) {
      throw new Error('Team not found');
    }

    // Change fields
    if (input.name != undefined) team.name = input.name;
    if (input.tag != undefined) team.tag = input.tag;

    // Save changed team to DB
    const updatedTeam = await this.teamRepository.save(team);

    // Return changed team
    return new TeamModel(updatedTeam);
  }

  async deleteTeam(id: number): Promise<boolean> {
    const result = await this.teamRepository.delete(id);
    return result.affected != undefined && result.affected > 0;
  }
}
