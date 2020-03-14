import React, { useState } from "react";
import { Modal, Header, Button, Icon, Input } from "semantic-ui-react";

const styles = {
  centered: {
    textAlign: "center"
  }
};

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
    <Modal open={isOpen} onClose={onClose} closeIcon="close" basic size="tiny">
      <Header icon="browser" content="Create Kanban Board" />
      <Modal.Content style={styles.centered}>
        <Input
          inverted
          placeholder="Kanban board name"
          error={error}
          onChange={e => {
            setValue(e.target.value);
            if (e.target.value !== "") {
              setError(false);
            }
          }}
        />
      </Modal.Content>
      <Modal.Actions style={styles.centered}>
        <Button
          color="green"
          onClick={() => {
            if (value !== "") {
              onCreate(value);
            } else {
              setError(true);
            }
          }}
          inverted
        >
          Create
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
