import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentResolver } from './tournament.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament])],
  providers: [TournamentService, TournamentResolver]
})
export class TournamentModule {}
