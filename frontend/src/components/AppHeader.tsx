import React from "react";
import { Header, Icon } from "semantic-ui-react";

const style = {
  header: {
    marginBottom: "1rem"
  }
};

export default function AppHeader() {
  return (
    <div>
      <Header style={style.header} as="h2">
        <Icon name="dashboard" />
        <Header.Content>Kanban</Header.Content>
      </Header>
    </div>
  );
}
