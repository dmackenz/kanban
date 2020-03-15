import React, { ReactNode } from "react";
import { Button, Icon, Header } from "semantic-ui-react";
import { ISwimLane } from "../types";
import "./styles/Swimlane.css";

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
    <div className="lane">
      <div className="top-bar">
        <div>
          <Header as="h4">{swimlane.title}</Header>
        </div>
        <div>
          <Icon name="close" onClick={() => deleteSwimlane(swimlane.id)}></Icon>
        </div>
      </div>

      {children && children}

      <div className="create-task-container">
        <Button onClick={() => onCreateTaskClick(swimlane.id)}>
          Create Task
        </Button>
      </div>
    </div>
  );
}
