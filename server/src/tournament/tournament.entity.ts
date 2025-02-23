import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType() // for GraphQL
@Entity() // for TypeORM
export class Tournament {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({type: 'varchar', length: 255})
    name: string;
}