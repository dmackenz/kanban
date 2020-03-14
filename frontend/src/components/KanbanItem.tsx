import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
import { ITask } from "../types";

const styles = {
  item: {
    padding: "0.5rem"
  },
  card: {
    width: "100%"
  }
};

export interface Props {
  task: ITask;
}

export default function KanbanItem({ task }: Props) {
  return (
    <Grid.Row style={styles.item}>
      <Card
        header={task.title}
        description={task.description}
        style={styles.card}
      />
    </Grid.Row>
  );
}
