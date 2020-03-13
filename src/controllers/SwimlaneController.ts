import { Board } from "../entity/Board";
import { CreateBoardInput, UpdateBoardInput } from "../inputs/BoardInput";
import { Swimlane } from "../entity/Swimlane";
import { CreateSwimlaneInput } from "../inputs/SwimlaneInput";

export class SwimlaneController {
	static async getSwimlane(id: string): Promise<Swimlane> {
		return await Swimlane.findOne(id)
	}

	static async createSwimlane(swimlane: CreateSwimlaneInput): Promise<Swimlane> {
		return await Swimlane.create(swimlane).save()
	}

	static async getSwimlanes(board?: Board): Promise<Swimlane[]> {
		if (board) {
			return await Swimlane.find({
				where: { boardId: board.id }
			})
		} else {
			return await Swimlane.find()
		}
	}
}