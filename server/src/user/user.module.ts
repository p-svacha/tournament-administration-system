import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { TournamentParticipantModule } from 'src/tournament-participant/tournament-participant.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TournamentParticipantModule],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
