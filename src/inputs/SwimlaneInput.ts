import { InputType, Field } from "type-graphql"

@InputType()
export class CreateSwimlaneInput {
	@Field()
	title: string

	@Field()
	boardId: string
}