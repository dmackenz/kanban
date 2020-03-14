import { InputType, Field } from "type-graphql";

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  swimlaneId: string;
}

@InputType()
export class UpdateTaskInput {
  @Field()
  taskId: string;

  @Field()
  title: string;

  @Field()
  description: string;
}

@InputType()
export class DeleteTaskInput {
  @Field()
  taskId: string;
}
