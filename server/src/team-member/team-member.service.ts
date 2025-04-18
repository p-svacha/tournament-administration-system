import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMemberEntity } from './team-member.entity';
import { TeamMemberModel } from './dto/team-member.model';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMemberEntity)
    private readonly teamMemberRepository: Repository<TeamMemberEntity>,
  ) {}

  async findTeamMembersByTeam(teamId: number): Promise<TeamMemberModel[]> {
    const teamMembers: TeamMemberEntity[] = await this.teamMemberRepository.find({
      where: { team: { id: teamId } },
      relations: ['user', 'team'],
    });
    return teamMembers.map((teamMemberEntity) => new TeamMemberModel(teamMemberEntity));
  }

  async findTeamMembersByUser(userId: number): Promise<TeamMemberModel[]> {
    const teamMembers: TeamMemberEntity[] = await this.teamMemberRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'team'],
    });
    return teamMembers.map((teamMemberEntity) => new TeamMemberModel(teamMemberEntity));
  }

  async addTeamMember(teamId: number, userId: number, isTeamCaptain: boolean): Promise<TeamMemberModel> {
    // Create entity
    const newTeamMember: TeamMemberEntity = this.teamMemberRepository.create({
      team: { id: teamId },
      user: { id: userId },
      is_team_captain: isTeamCaptain,
    });

    // Save entity
    const savedTeamMember: TeamMemberEntity = await this.teamMemberRepository.save(newTeamMember);

    // Return as model
    return new TeamMemberModel(savedTeamMember);
  }
}
