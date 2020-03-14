import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from "type-graphql";
import { Swimlane } from "../entity/Swimlane";
import {
  CreateSwimlaneInput,
  UpdateSwimlaneInput,
  DeleteSwimlaneInput
} from "../inputs/SwimlaneInput";
import { SwimlaneController } from "../controllers/SwimlaneController";

@Resolver()
export class SwimlaneResolver {
  @Query(() => [Swimlane])
  async swimlanes() {
    return await SwimlaneController.getSwimlanes();
  }

  @Query(returns => Swimlane)
  async swimlane(@Arg("id") id: string): Promise<Swimlane> {
    return await SwimlaneController.getSwimlane(id);
  }

  @Mutation(() => Swimlane)
  async createSwimlane(
    @Arg("data") data: CreateSwimlaneInput
  ): Promise<Swimlane> {
    return await SwimlaneController.createSwimlane(data);
  }

  @Mutation(returns => Swimlane)
  async updateSwimlane(
    @Arg("data") data: UpdateSwimlaneInput
  ): Promise<Swimlane> {
    return await SwimlaneController.updateSwimlane(data);
  }

  @Mutation(returns => Boolean)
  async deleteSwimlane(
    @Arg("data") data: DeleteSwimlaneInput
  ): Promise<Boolean> {
    await SwimlaneController.deleteSwimlane(data);
    return true;
  }

  // @FieldResolver(returns => [Task])
  // async tasks(@Root() swimlane: Swimlane) {
  //   return await TaskController.getTasks(swimlane);
  // }
}
