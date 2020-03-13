import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, ID, Field } from "type-graphql";
import { Board } from "./Board";
import { RelationColumn } from "../helpers";

@Entity()
@ObjectType()
export class Swimlane extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: string;

	@Field(() => String)
	@Column()
	title: string;

	@ManyToOne(type => Board)
	board: Board;
	@RelationColumn()
	boardId: string;
}