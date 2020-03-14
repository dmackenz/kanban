import React, { ReactNode } from "react";
import { Grid, Button, Icon, Header } from "semantic-ui-react";
import KanbanItem from "./KanbanItem";

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
    backgroundColor: "#f7f7f7"
  }
};

export interface Props {
  children: ReactNode;
  title: String;
}

export default function KanbanSwimlane({ children, title }: Props) {
  return (
    <Grid.Column>
      <Grid columns={1}>
        <Grid.Column>
          <div style={styles.lane}>
            <Grid.Row style={styles.topBar}>
              <Header as="h4" style={styles.title}>
                {title}
              </Header>
              <Icon name="close"></Icon>
            </Grid.Row>
            {children}
          </div>
        </Grid.Column>
      </Grid>
    </Grid.Column>
  );
}
