import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import Dialog from "./Dialog";
import "../styles/Dialog.css";

export interface Props {
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
  isOpen: boolean;
}

export default function CreateTaskDialog({ isOpen, onClose, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  return (
    <Dialog
      title="Create New Task"
      isOpen={isOpen}
      onClose={onClose}
      onAction={() => {
        if (title !== "" && description !== "") {
          onCreate(title, description);
        } else {
          if (title === "") {
            setTitleError(true);
          }
          if (description === "") {
            setDescriptionError(true);
          }
        }
      }}
    >
      <div className="container">
        <div className="input-border input-padded">
          <Input
            transparent
            inverted
            placeholder="Task Title"
            error={titleError}
            onChange={e => {
              setTitle(e.target.value);
              if (e.target.value !== "") {
                setTitleError(false);
              }
            }}
          />
        </div>
        <div className="input-border input-padded">
          <Input
            transparent
            inverted
            placeholder="Task Description"
            error={descriptionError}
            onChange={e => {
              setDescription(e.target.value);
              if (e.target.value !== "") {
                setDescriptionError(false);
              }
            }}
          />
        </div>
      </div>
    </Dialog>
  );
}
