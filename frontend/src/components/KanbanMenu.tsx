import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { IBoard } from "../types";

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
  console.log(boards, "from kanban menu");
  return (
    <div>
      <Menu pointing>
        {boards.map(board => (
          <Menu.Item
            key={board.id}
            active={board.active === true}
            onClick={() => onSelect(board.id)}
          >
            {board.title} {board.active}
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
