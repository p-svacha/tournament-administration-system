import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentParticipantEntity } from './tournament-participant.entity';
import { TournamentParticipantService } from './tournament-participant.service';
import { TournamentParticipantResolver } from './tournament-participant.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentParticipantEntity])],
  providers: [TournamentParticipantService, TournamentParticipantResolver],
  exports: [TournamentParticipantService],
})
export class TournamentParticipantModule {}