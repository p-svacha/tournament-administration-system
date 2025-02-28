import { Resolver } from '@nestjs/graphql';
import {TeamMemberModel} from "./dto/team-member.model";
import {TeamMemberService} from "./team-member.service";

@Resolver(() => TeamMemberModel)
export class TeamMemberResolver {
    constructor(private readonly teamMemberService: TeamMemberService) {
    }


}
