import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";

export interface Props {
  boards: {
    title: string;
    id: string;
    active?: boolean;
  }[];
  onSelect: (id: string) => void;
  onCreateClicked: () => void;
}

export default function KanbanMenu({
  boards,
  onSelect,
  onCreateClicked
}: Props) {
  return (
    <div>
      <Menu pointing>
        {boards.map(board => (
          <Menu.Item
            key={board.id}
            active={board.active === true}
            onClick={() => onSelect(board.id)}
          >
            {board.title}
          </Menu.Item>
        ))}

        <Menu.Menu position="right">
          <Menu.Item>
            <Button onClick={onCreateClicked}>Create Kanban</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}
