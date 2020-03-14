import { InputType, Field } from "type-graphql";
import { CreateSwimlaneInput } from "./SwimlaneInput";

@InputType()
export class CreateBoardInput {
  @Field()
  title: string;
}

@InputType()
export class UpdateBoardInput {
  @Field()
  boardId: string;

  @Field()
  title: string;
}

@InputType()
export class DeleteBoardInput {
  @Field()
  boardId: string;
}
