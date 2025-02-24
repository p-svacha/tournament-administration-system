import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('name') name: string,
    @Args('seat') seat: string,
    @Args('is_global_admin', { type: () => Boolean, defaultValue: false }) is_global_admin: boolean,
  ): Promise<User> {
    return this.userService.create(name, seat, is_global_admin);
  }
}