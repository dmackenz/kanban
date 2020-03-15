import React from "react";
import { Card } from "semantic-ui-react";
import { ITask } from "../types";

const styles = {
  card: {
    padding: "0.5rem"
  }
};

export interface Props {
  task: ITask;
}

export default function KanbanItem({ task }: Props) {
  return (
    <Card
      header={task.title}
      description={task.description}
      style={styles.card}
      raised
      centered
      fluid
    />
  );
}
