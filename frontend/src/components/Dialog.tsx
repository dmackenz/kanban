import React, { ReactNode } from "react";
import { Modal, Header, Button } from "semantic-ui-react";

const styles = {
  centered: {
    textAlign: "center"
  }
};

export interface Props {
  title: string;
  onClose: () => void;
  onAction: () => void;
  isOpen: boolean;
  children: ReactNode;
}

export default function Dialog({
  title,
  isOpen,
  onClose,
  onAction,
  children
}: Props) {
  return (
    <Modal open={isOpen} onClose={onClose} closeIcon="close" basic size="tiny">
      <Header icon="browser" content={title} />
      <Modal.Content style={styles.centered}>{children}</Modal.Content>
      <Modal.Actions style={styles.centered}>
        <Button color="green" onClick={onAction} inverted>
          Create
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
