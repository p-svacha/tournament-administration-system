import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';
import { TournamentModule } from 'src/tournament/tournament.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]), TournamentModule],
  providers: [EventService, EventResolver],
  exports: [EventService],
})
export class EventModule {}
