import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserModel } from './dto/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateEventInput } from 'src/event/dto/update-event.input';
import {UpdateUserInput} from "./dto/update.user.input";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<UserModel[]> {
    // Find all entities
    const users: UserEntity[] = await this.userRepository.find();

    // Map entities to models (output DTOs)
    return users.map((userEntity) => new UserModel(userEntity));
  }

  async findUserById(id: number): Promise<UserModel> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }

    return new UserModel(user);
  }

  async createUser(input: CreateUserInput): Promise<UserModel> {
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

  async updateUser(id: number, input: UpdateUserInput): Promise<UserModel> {
    // Find affected user
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }

    // Change fields
    if (input.name !== undefined) user.name = input.name;
    if (input.seat !== undefined) user.seat = input.seat;
    if (input.isGlobalAdmin !== undefined) user.is_global_admin = input.isGlobalAdmin;

    // Save changed user to db
    const updatedUser = await this.userRepository.save(user);

    // Return changed user
    return new UserModel(updatedUser);
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected != undefined && result.affected > 0;
  }
}
