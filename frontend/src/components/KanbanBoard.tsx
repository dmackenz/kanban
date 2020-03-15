import React, { ReactNode } from "react";
import { Card, Icon, Header, Button } from "semantic-ui-react";

type FlexDirectionWrapper = "row" | "column";

interface IStyles {
  board: any;
  noLanesContainer: {
    height: string;
    display: string;
    justifyContent: string;
    alignItems: string;
    flexDirection: FlexDirectionWrapper;
  };
  noLanesMessage: any;
  createSwimlaneButtonContainer: any;
  topMenuContainer: any;
  grid: any;
}

const styles: IStyles = {
  board: {
    width: "100%",
    marginTop: "0.5rem"
  },
  noLanesContainer: {
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  noLanesMessage: {
    display: "flex",
    alignItems: "center"
  },
  createSwimlaneButtonContainer: {
    marginTop: "2rem"
  },
  topMenuContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "4rem",
    padding: "1rem"
  },
  grid: {
    display: "flex",
    overflowX: "scroll",
    width: "100%"
  }
};

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
    <div>
      <Card style={styles.board}>
        {numSwimlanes > 0 ? (
          <>
            <div style={styles.topMenuContainer}>
              <Button onClick={onCreateSwimlaneClicked}>Create Swimlane</Button>
            </div>

            <div style={styles.grid}>{children}</div>
          </>
        ) : (
          <div style={styles.noLanesContainer}>
            <div style={styles.noLanesMessage}>
              <div>
                <Icon name="list" size="big" />
              </div>
              <div>
                <Header as="h3">No Swimlanes</Header>
              </div>
            </div>
            <div style={styles.createSwimlaneButtonContainer}>
              <Button onClick={onCreateSwimlaneClicked}>Create Swimlane</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
