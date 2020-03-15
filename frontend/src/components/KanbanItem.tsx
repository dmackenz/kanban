import React from "react";
import { Card } from "semantic-ui-react";
import { ITask } from "../types";
import "./styles/Task.css";

export interface Props {
  task: ITask;
}

export default function KanbanItem({ task }: Props) {
  return (
    <Card
      header={task.title}
      description={task.description}
      className="task"
      raised
      centered
      fluid
    />
  );
}
