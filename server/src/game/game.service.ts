import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './game.entity';
import { Repository } from 'typeorm';
import { GameModel } from './dto/game.model';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
  ) {}

  async findAllGames(): Promise<GameModel[]> {
    const games: GameEntity[] = await this.gameRepository.find();
    return games.map((game) => new GameModel(game));
  }

  async findGameById(id: number): Promise<GameModel> {
    const game = await this.gameRepository.findOne({
      where: { id: id },
    });

    if (!game) {
      throw Error('Game not found');
    }

    return new GameModel(game);
  }

  async createGame(input: CreateGameInput): Promise<GameModel> {
    // Create entity
    const game = this.gameRepository.create({
      name: input.name,
      logoUrl: input.logoUrl,
    });

    // Save to database
    const newGame: GameEntity = await this.gameRepository.save(game);

    // Return
    return new GameModel(newGame);
  }

  async updateGame(id: number, input: UpdateGameInput): Promise<GameModel> {
    // Find game
    const game = await this.gameRepository.findOne({ where: { id: id } });
    if (!game) {
      throw new Error('Game not found');
    }

    // Update fields
    if (input.name !== undefined) game.name = input.name;

    // Save updated entity to db
    const updatedGame = await this.gameRepository.save(game);

    // Return updated model
    return new GameModel(updatedGame);
  }

  async deleteGame(id: number): Promise<boolean> {
    const result = await this.gameRepository.delete(id);
    return result.affected != undefined && result.affected > 0;
  }
}
