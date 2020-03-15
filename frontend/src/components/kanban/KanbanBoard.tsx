import React, { ReactNode } from "react";
import { Icon, Header, Button } from "semantic-ui-react";
import "../styles/Board.css";

export interface Props {
  children: ReactNode;
  numSwimlanes: number;
  onCreateSwimlaneClicked: () => void;
}

export default function KanbanBoard({
  children,
  numSwimlanes,
  onCreateSwimlaneClicked
}: Props) {
  return (
    <div className="board">
      {numSwimlanes > 0 ? (
        <>
          <div className="top-menu-container">
            <Button onClick={onCreateSwimlaneClicked}>Create Swimlane</Button>
          </div>

          <div className="grid">{children}</div>
        </>
      ) : (
        <div className="no-lanes-container">
          <div className="no-lanes-message">
            <div>
              <Icon name="list" size="big" />
            </div>
            <div>
              <Header as="h3">No Swimlanes</Header>
            </div>
          </div>
          <div className="create-swimlane-button-container">
            <Button onClick={onCreateSwimlaneClicked}>Create Swimlane</Button>
          </div>
        </div>
      )}
    </div>
  );
}
