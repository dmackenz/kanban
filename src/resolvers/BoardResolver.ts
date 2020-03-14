import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from "type-graphql";
import { Board } from "../entity/Board";
import {
  CreateBoardInput,
  UpdateBoardInput,
  DeleteBoardInput
} from "../inputs/BoardInput";
import { Swimlane } from "../entity/Swimlane";
import { BoardController } from "../controllers/BoardController";
import { SwimlaneController } from "../controllers/SwimlaneController";

@Resolver(of => Board)
export class BoardResolver {
  @Query(returns => [Board])
  async boards(): Promise<Board[]> {
    return await BoardController.getBoards();
  }

  @Query(returns => Board)
  async board(@Arg("id") id: string): Promise<Board> {
    return await BoardController.getBoard(id);
  }

  @Mutation(returns => Board)
  async createBoard(@Arg("data") data: CreateBoardInput): Promise<Board> {
    return await BoardController.createBoard(data);
  }

  @Mutation(returns => Board)
  async updateBoard(@Arg("data") data: UpdateBoardInput): Promise<Board> {
    return await BoardController.updateBoard(data);
  }

  @Mutation(returns => Boolean)
  async deleteBoard(@Arg("data") data: DeleteBoardInput): Promise<Boolean> {
    await BoardController.deleteBoard(data);
    return true;
  }

  @FieldResolver(returns => [Swimlane])
  async swimlanes(@Root() board: Board): Promise<Swimlane[]> {
    return await SwimlaneController.getSwimlanes(board);
  }
}
