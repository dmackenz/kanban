import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import Dialog from "./Dialog";
import "./styles/Dialog.css";

export interface Props {
  onClose: () => void;
  onCreate: (kanbanTitle: string) => void;
  isOpen: boolean;
}

export default function CreateKanbanDialog({
  isOpen,
  onClose,
  onCreate
}: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  return (
    <Dialog
      title="Create New Kanban Board"
      isOpen={isOpen}
      onClose={onClose}
      onAction={() => {
        if (value !== "") {
          onCreate(value);
        } else {
          setError(true);
        }
      }}
    >
      <div className="input-border">
        <Input
          inverted
          transparent
          placeholder="Kanban board name"
          error={error}
          onChange={e => {
            setValue(e.target.value);
            if (e.target.value !== "") {
              setError(false);
            }
          }}
        />
      </div>
    </Dialog>
  );
}
