import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { Swimlane } from "../entity/Swimlane";
import { CreateSwimlaneInput } from "../inputs/SwimlaneInput";
import { SwimlaneController } from "../controllers/SwimlaneController";
import { TaskController } from "../controllers/TaskController";
import { Task } from "../entity/Task";
import {
  CreateTaskInput,
  UpdateTaskInput,
  DeleteTaskInput
} from "../inputs/TaskInput";

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  async tasks() {
    return await TaskController.getTasks();
  }

  @Query(returns => Task)
  async task(@Arg("id") id: string): Promise<Task> {
    return await TaskController.getTask(id);
  }

  @Mutation(() => Task)
  async createTask(@Arg("data") data: CreateTaskInput) {
    return await TaskController.createTask(data);
  }

  @Mutation(returns => Swimlane)
  async updateTask(@Arg("data") data: UpdateTaskInput): Promise<Task> {
    return await TaskController.updateTask(data);
  }

  @Mutation(returns => Boolean)
  async deleteTask(@Arg("data") data: DeleteTaskInput): Promise<Boolean> {
    await TaskController.deleteTask(data);
    return true;
  }
}
