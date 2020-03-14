import React, { ReactNode } from "react";
import { Grid, Button, Icon, Header } from "semantic-ui-react";
import KanbanItem from "./KanbanItem";
import { ISwimLane } from "../types";

const styles = {
  topBar: {
    display: "flex",
    height: "2rem",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    marginTop: "1.5rem",
    marginLeft: "0.5rem"
  },
  lane: {
    margin: "0.6rem",
    backgroundColor: "#d8d8d8",
    borderRadius: "0.5rem"
  }
};

export interface Props {
  children?: ReactNode;
  swimlane: ISwimLane;
  createTask: (swimlaneId: string, title: string, description: string) => void;
  deleteSwimlane: (swimlaneId: string) => void;
}

export default function KanbanSwimlane({
  children,
  swimlane,
  createTask,
  deleteSwimlane
}: Props) {
  return (
    <Grid.Column>
      <Grid columns={1}>
        <Grid.Column>
          <div style={styles.lane}>
            <Grid.Row style={styles.topBar}>
              <Header as="h4" style={styles.title}>
                {swimlane.title}
              </Header>
              <Icon
                name="close"
                onClick={() => deleteSwimlane(swimlane.id)}
              ></Icon>
            </Grid.Row>
            {children && children}
            <Button
              onClick={() => createTask(swimlane.id, "task 1", "description")}
            >
              Create Task
            </Button>
          </div>
        </Grid.Column>
      </Grid>
    </Grid.Column>
  );
}
