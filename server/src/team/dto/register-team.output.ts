import { Field, ObjectType } from '@nestjs/graphql';
import { TeamModel } from 'src/team/dto/team.model';

@ObjectType()
export class RegisterTeamOutput {
  @Field()
  success: boolean;

  @Field(() => TeamModel, { nullable: true })
  team?: TeamModel;

  @Field({ nullable: true })
  message?: string;
}
