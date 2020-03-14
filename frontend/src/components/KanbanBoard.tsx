import React, { Component, ReactNode } from "react";
import { Card, Grid } from "semantic-ui-react";
import KanbanSwimlane from "./KanbanSwimlane";

const styles = {
  board: {
    // backgroundColor: "green",
    width: "100%",
    marginTop: "0.5rem"
  }
};

export interface Props {
  children: ReactNode;
  numSwimlanes: NumberLanes;
}

type NumberLanes = 1 | 2 | 3 | 4 | 5 | 6;

export default function KanbanBoard({ children, numSwimlanes }: Props) {
  return (
    <div>
      <Card style={styles.board}>
        <Grid columns={numSwimlanes}>{children}</Grid>
      </Card>
    </div>
  );
}
