import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { ObjectType, ID, Field } from "type-graphql";
import { Swimlane } from "./Swimlane";

@Entity()
@ObjectType()
export class Board extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(type => [Swimlane])
  @OneToMany(
    type => Swimlane,
    swimlane => swimlane.board,
    { cascade: ["insert"], onDelete: "CASCADE" }
  )
  swimlanes: Swimlane[];
}
