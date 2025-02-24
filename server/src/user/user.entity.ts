import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Field()
    @Column({ type: 'varchar', length: 255 })
    seat: string;

    @Field()
    @Column({ type: 'boolean', default: false })
    is_global_admin: boolean;
}