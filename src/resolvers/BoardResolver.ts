
import { Resolver, Query, Mutation, Arg, ID, FieldResolver, Root } from "type-graphql"
import { Board } from "../entity/Board"
import { CreateBoardInput, UpdateBoardInput } from "../inputs/BoardInput"
import { Swimlane } from "../entity/Swimlane"
import { BoardController } from "../controllers/BoardController"
import { SwimlaneController } from "../controllers/SwimlaneController"
import { CreateSwimlaneInput } from "../inputs/SwimlaneInput"

@Resolver(of => Board)
export class BoardResolver {
	@Query(returns => [Board])
	async boards() {
		return await BoardController.getBoards()
	}

	@Query(returns => Board)
	async board(@Arg("id") id: string) {
		return await BoardController.getBoard(id)
	}

	@Mutation(returns => Board)
	async createBoard(@Arg("data") data: CreateBoardInput) {
		return await BoardController.createBoard(data)
	}

	@Mutation(returns => Board)
	async updateBoard(@Arg("data") data: UpdateBoardInput) {
		return await BoardController.updateBoard(data)
	}

	@Mutation(returns => Board)
	async addSwimlane(@Arg("data") data: CreateSwimlaneInput) {
		return await BoardController.addSwimlane(data)
	}

	@FieldResolver(returns => [Swimlane])
	async swimlanes(@Root() board: Board) {
		return await SwimlaneController.getSwimlanes(board)
	}
}