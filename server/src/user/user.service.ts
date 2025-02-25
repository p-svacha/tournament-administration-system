import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserModel } from './dto/user.model';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserModel[]> {
    // Find all entities
    const users: UserEntity[] = await this.userRepository.find();

    // Map entities to models (output DTOs)
    return users.map(userEntity => new UserModel(userEntity));
  }

  async create(input: CreateUserInput): Promise<UserModel> {
    // Map input DTO to entity
    const user: UserEntity = this.userRepository.create({
      name: input.name,
      seat: input.seat,
      is_global_admin: input.isGlobalAdmin,
    });

    // Save new entity
    const savedUser: UserEntity = await this.userRepository.save(user);

    // Return saved entity as model (output DTO)
    return new UserModel(savedUser);
  }
}
