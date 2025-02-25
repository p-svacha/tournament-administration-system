import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentResolver } from './tournament.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from './tournament.entity';
import { TournamentParticipantModule } from 'src/tournament-participant/tournament-participant.module';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEntity]), TournamentParticipantModule],
  providers: [TournamentService, TournamentResolver],
  exports: [TournamentService]
})
export class TournamentModule {}
