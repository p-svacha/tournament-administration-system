import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { TeamMemberModule } from '../team-member/team-member.module';
import { TournamentParticipantModule } from 'src/tournament-participant/tournament-participant.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity]), TeamMemberModule, TournamentParticipantModule],
  providers: [TeamService, TeamResolver],
  exports: [TeamService],
})
export class TeamModule {}
