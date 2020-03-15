import React from "react";
import { Header, Icon } from "semantic-ui-react";
import "./styles/Header.css";
export default function AppHeader() {
  return (
    <div>
      <Header className="header" as="h2">
        <Icon name="compass outline" />
        <Header.Content>Kanban</Header.Content>
      </Header>
    </div>
  );
}
