import { Field, ObjectType } from '@nestjs/graphql';
import { TeamModel } from 'src/team/dto/team.model';

@ObjectType()
export class RegisterTeamOutput {
  @Field({ description: 'Indicates whether the team registration was successful.' })
  success: boolean;

  @Field(() => TeamModel, {
    nullable: true,
    description: 'The newly registered team if the registration was successful; otherwise null.',
  })
  team?: TeamModel;

  @Field({ nullable: true, description: 'A message providing additional information or error details.' })
  message?: string;
}
