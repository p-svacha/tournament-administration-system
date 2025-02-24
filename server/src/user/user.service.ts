import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(name: string, seat: string, is_global_admin: boolean): Promise<User> {
    const user = this.userRepository.create({ name, seat, is_global_admin });
    return this.userRepository.save(user);
  }
}
