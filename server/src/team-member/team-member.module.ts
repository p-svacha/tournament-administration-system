import { Module } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { TeamMemberResolver } from './team-member.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMemberEntity } from './team-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMemberEntity])],
  providers: [TeamMemberService, TeamMemberResolver],
  exports: [TeamMemberService],
})
export class TeamMemberModule {}
