import { Swimlane } from "../entity/Swimlane";
import {
  CreateSwimlaneInput,
  UpdateSwimlaneInput,
  DeleteSwimlaneInput
} from "../inputs/SwimlaneInput";
import { CreateTaskInput } from "../inputs/TaskInput";
import { TaskController } from "./TaskController";
import { Board } from "../entity/Board";

export class SwimlaneController {
  static async getSwimlane(id: string): Promise<Swimlane> {
    return await Swimlane.findOne(id);
  }

  static async getSwimlanes(board?: Board): Promise<Swimlane[]> {
    if (board) {
      return await Swimlane.find({
        where: { boardId: board.id }
      });
    } else {
      return await Swimlane.find();
    }
  }

  static async createSwimlane(
    swimlane: CreateSwimlaneInput
  ): Promise<Swimlane> {
    return await Swimlane.create(swimlane).save();
  }

  static async updateSwimlane(data: UpdateSwimlaneInput): Promise<Swimlane> {
    const swimlane = await Swimlane.findOne(data.swimlaneId);
    swimlane.title = data.title;
    return await swimlane.save();
  }

  static async deleteSwimlane(data: DeleteSwimlaneInput): Promise<void> {
    const swimlane = await Swimlane.findOne(data.swimlaneId);
    if (swimlane) {
      await Swimlane.remove(swimlane);
      return;
    }
    throw new Error("Swimlane not found");
  }

  static async addTask(data: CreateTaskInput): Promise<Swimlane> {
    const swimlane = await Swimlane.findOne(data.swimlaneId);
    if (!swimlane.tasks) {
      swimlane.tasks = [];
    }
    const task = await TaskController.createTask(data);
    swimlane.tasks.push(task);
    return await swimlane.save();
  }
}
