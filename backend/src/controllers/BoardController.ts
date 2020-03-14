import { Board } from "../entity/Board";
import {
  CreateBoardInput,
  UpdateBoardInput,
  DeleteBoardInput
} from "../inputs/BoardInput";
import { SwimlaneController } from "./SwimlaneController";
import { CreateSwimlaneInput } from "../inputs/SwimlaneInput";

export class BoardController {
  static async getBoard(id: string): Promise<Board> {
    return await Board.findOne(id);
  }

  static async getBoards(): Promise<Board[]> {
    return await Board.find();
  }

  static async createBoard(board: CreateBoardInput): Promise<Board> {
    return await Board.create(board).save();
  }

  static async updateBoard(data: UpdateBoardInput): Promise<Board> {
    const board = await Board.findOne(data.boardId);
    board.title = data.title;
    return await board.save();
  }

  static async deleteBoard(data: DeleteBoardInput): Promise<void> {
    const board = await Board.findOne(data.boardId);
    if (board) {
      await Board.remove(board);
      return;
    }
    throw new Error("Board not found");
  }

  static async addSwimlane(data: CreateSwimlaneInput): Promise<Board> {
    const board = await Board.findOne(data.boardId);
    if (!board.swimlanes) {
      board.swimlanes = [];
    }
    const swimlane = await SwimlaneController.createSwimlane(data);
    board.swimlanes.push(swimlane);
    return await board.save();
  }
}
