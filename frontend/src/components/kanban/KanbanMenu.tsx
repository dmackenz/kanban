import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { IBoard } from "../../types";

export interface Props {
  boards: IBoard[];
  onSelect: (id: string) => void;
  onCreateKanbanClicked: () => void;
}

export default function KanbanMenu({
  boards,
  onSelect,
  onCreateKanbanClicked
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
            <span>{board.title}</span>
          </Menu.Item>
        ))}

        <Menu.Menu position="right">
          <Menu.Item>
            <Button onClick={onCreateKanbanClicked}>Create Kanban</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}
