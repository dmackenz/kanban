import React, { ReactNode } from "react";
import { Button, Icon, Header } from "semantic-ui-react";
import { ISwimLane } from "../types";

const styles = {
  topBar: {
    display: "flex",
    height: "2rem",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lane: {
    backgroundColor: "#d8d8d8",
    borderRadius: "0.5rem",
    minWidth: "20rem",
    padding: "1rem",
    margin: "1rem",
    alignSelf: "flex-start"
  },
  createTaskContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    height: "4rem"
  }
};

export interface Props {
  children?: ReactNode;
  swimlane: ISwimLane;
  onCreateTaskClick: (swimlaneId: string) => void;
  deleteSwimlane: (swimlaneId: string) => void;
}

export default function KanbanSwimlane({
  children,
  swimlane,
  onCreateTaskClick,
  deleteSwimlane
}: Props) {
  return (
    <div style={styles.lane}>
      <div style={styles.topBar}>
        <div>
          <Header as="h4">{swimlane.title}</Header>
        </div>
        <div>
          <Icon name="close" onClick={() => deleteSwimlane(swimlane.id)}></Icon>
        </div>
      </div>

      {children && children}

      <div style={styles.createTaskContainer}>
        <Button onClick={() => onCreateTaskClick(swimlane.id)}>
          Create Task
        </Button>
      </div>
    </div>
  );
}
