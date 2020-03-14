import React from "react";
import { Container } from "semantic-ui-react";
import AppHeader from "./components/AppHeader";
import KanbanMenu from "./components/KanbanMenu";
import KanbanBoard from "./components/KanbanBoard";
import CreateKanbanDialog from "./components/CreateKanbanDialog";
import KanbanSwimlane from "./components/KanbanSwimlane";
import KanbanItem from "./components/KanbanItem";

const styles = {
  page: {
    padding: "1rem",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
    minWidth: "100vh"
  }
};

function App() {
  return (
    <div style={styles.page}>
      <Container>
        <AppHeader />
        <KanbanMenu
          boards={[
            {
              title: "board 1",
              id: "1",
              active: true
            },
            {
              title: "board 2",
              id: "2"
            }
          ]}
          onSelect={id => console.log(id)}
          onCreateClicked={() => console.log("create")}
        />
        <KanbanBoard numSwimlanes={2}>
          <KanbanSwimlane title="Swimlane 1">
            {new Array(Math.floor(Math.random() * 10)).fill(0).map(z => (
              <KanbanItem
                title={Math.random().toString()}
                description={Math.random().toString()}
              />
            ))}
          </KanbanSwimlane>
          <KanbanSwimlane title="Swimlane 2">
            {new Array(Math.floor(Math.random() * 10)).fill(0).map(z => (
              <KanbanItem
                title={Math.random().toString()}
                description={Math.random().toString()}
              />
            ))}
          </KanbanSwimlane>
        </KanbanBoard>
        <CreateKanbanDialog
          onClose={() => {
            console.log("props.onClose");
          }}
          isOpen={false}
          onCreate={(kanbanTitle: string) => {
            console.log(kanbanTitle);
          }}
        />
      </Container>
    </div>
  );
}

export default App;
