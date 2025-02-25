import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentResolver } from './tournament.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from './tournament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEntity])],
  providers: [TournamentService, TournamentResolver],
  exports: [TournamentService]
})
export class TournamentModule {}
