import React, { Component, ReactNode } from "react";
import { Card, Grid, Icon, Header, Button } from "semantic-ui-react";
import KanbanSwimlane from "./KanbanSwimlane";

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
  }
};

export interface Props {
  children: ReactNode;
  numSwimlanes: number;
  onSwimlaneCreate: (title: string) => void;
}

export default function KanbanBoard({
  children,
  numSwimlanes,
  onSwimlaneCreate
}: Props) {
  return (
    <div>
      <Card style={styles.board}>
        {numSwimlanes > 0 ? (
          <Grid columns={numSwimlanes as 1 | 2 | 3 | 5 | 6}>{children}</Grid>
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
              <Button onClick={() => onSwimlaneCreate("new swimlane")}>
                Create Swimlane
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
