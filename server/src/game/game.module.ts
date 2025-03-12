import { Module } from '@nestjs/common';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {GameEntity} from "./game.entity";
import {TournamentModule} from "../tournament/tournament.module";

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity]), TournamentModule],
  providers: [GameResolver, GameService],
  exports: [GameService]
})
export class GameModule {}
