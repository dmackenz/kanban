import { InputType, Field } from "type-graphql"
import { CreateSwimlaneInput } from "./SwimlaneInput"

@InputType()
export class CreateBoardInput {
	@Field()
	title: string
}

@InputType()
export class UpdateBoardInput {
	@Field()
	id: string

	@Field()
	title: string
}

// @InputType()
// export class AddSwimlaneInput {
// 	@Field()
// 	id: string

// 	@Field(type => CreateSwimlaneInput)
// 	swimlane: CreateSwimlaneInput
// }