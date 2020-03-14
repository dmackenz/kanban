import { Swimlane } from "../entity/Swimlane";
import { Task } from "../entity/Task";
import {
  CreateTaskInput,
  UpdateTaskInput,
  DeleteTaskInput
} from "../inputs/TaskInput";

export class TaskController {
  static async getTask(id: string): Promise<Task> {
    return await Task.findOne(id);
  }

  static async getTasks(swimlane?: Swimlane): Promise<Task[]> {
    if (swimlane) {
      return await Task.find({
        where: { swimlaneId: swimlane.id }
      });
    } else {
      return await Task.find();
    }
  }

  static async createTask(task: CreateTaskInput): Promise<Task> {
    return await Task.create(task).save();
  }

  static async updateTask(data: UpdateTaskInput): Promise<Task> {
    const task = await Task.findOne(data.taskId);
    task.title = data.title;
    task.description = data.description;
    return await task.save();
  }

  static async deleteTask(data: DeleteTaskInput): Promise<void> {
    const task = await Task.findOne(data.taskId);
    if (task) {
      await Task.remove(task);
      return;
    }
    throw new Error("Task not found");
  }
}
