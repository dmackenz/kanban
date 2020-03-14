import { InputType, Field } from "type-graphql";

@InputType()
export class CreateSwimlaneInput {
  @Field()
  title: string;

  @Field()
  boardId: string;
}

@InputType()
export class UpdateSwimlaneInput {
  @Field()
  swimlaneId: string;

  @Field()
  title: string;
}

@InputType()
export class DeleteSwimlaneInput {
  @Field()
  swimlaneId: string;
}
