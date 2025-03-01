import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentResolver } from './tournament.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from './tournament.entity';
import { TournamentParticipantModule } from 'src/tournament-participant/tournament-participant.module';
import { TournamentAdminModule } from 'src/tournament-admin/tournament-admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEntity]), TournamentParticipantModule, TournamentAdminModule],
  providers: [TournamentService, TournamentResolver],
  exports: [TournamentService],
})
export class TournamentModule {}
