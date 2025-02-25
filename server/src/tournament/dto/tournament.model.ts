import { Field, Int, ObjectType } from "@nestjs/graphql";
import { TournamentEntity } from "../tournament.entity";
import { TournamentParticipantModel } from "src/tournament-participant/dto/tournament-participant.model";

/**
 * Data that can be requested from the API for a specific tournament.
 */
@ObjectType()
export class TournamentModel {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field(() => [TournamentParticipantModel], { nullable: true })
    participants?: TournamentParticipantModel[];

    constructor(tournamentEntity?: TournamentEntity) {
        if(tournamentEntity) {
            this.id = tournamentEntity.id;
            this.name = tournamentEntity.name;
        }
    }
}