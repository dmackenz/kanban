import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";

const styles = {
  item: {
    padding: "0.5rem"
  }
};

export interface Props {
  title: string;
  description: string;
}

export default function KanbanItem({ title, description }: Props) {
  return (
    <Grid.Row style={styles.item}>
      <Card header={title} description={description} />
    </Grid.Row>
  );
}
