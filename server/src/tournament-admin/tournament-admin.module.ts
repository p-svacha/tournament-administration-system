import { Module } from '@nestjs/common';
import { TournamentAdminService } from './tournament-admin.service';
import { TournamentAdminResolver } from './tournament-admin.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentAdminEntity } from './tournament-admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentAdminEntity])],
  providers: [TournamentAdminService, TournamentAdminResolver],
  exports: [TournamentAdminService],
})
export class TournamentAdminModule {}
