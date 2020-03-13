
import { Resolver, Query, Mutation, Arg, ID } from "type-graphql"
import { Swimlane } from "../entity/Swimlane"
import { CreateSwimlaneInput } from "../inputs/SwimlaneInput"
import { SwimlaneController } from "../controllers/SwimlaneController"

@Resolver()
export class SwimlaneResolver {
	@Query(() => [Swimlane])
	async swimlanes() {
		return await SwimlaneController.getSwimlanes()
	}

	@Mutation(() => Swimlane)
	async createSwimlane(@Arg("data") data: CreateSwimlaneInput) {
		return await SwimlaneController.createSwimlane(data)
	}
}