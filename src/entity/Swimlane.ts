import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm";
import { ObjectType, ID, Field } from "type-graphql";
import { Board } from "./Board";
import { RelationColumn } from "../helpers";
import { Task } from "./Task";

@Entity()
@ObjectType()
export class Swimlane extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @ManyToOne(type => Board, { onDelete: "CASCADE" })
  board: Board;
  @RelationColumn()
  boardId: string;

  @Field(type => [Task])
  @OneToMany(
    type => Task,
    task => task.swimlane,
    { cascade: ["insert"], onDelete: "CASCADE" }
  )
  tasks: Task[];
}
