import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { ObjectType, ID, Field } from "type-graphql";
import { RelationColumn } from "../helpers";
import { Swimlane } from "./Swimlane";

@Entity()
@ObjectType()
export class Task extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @ManyToOne(type => Swimlane, { onDelete: "CASCADE" })
  swimlane: Swimlane;
  @RelationColumn()
  swimlaneId: string;
}
