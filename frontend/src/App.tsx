import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import AppHeader from "./components/AppHeader";
import KanbanMenu from "./components/kanban/KanbanMenu";
import KanbanBoard from "./components/kanban/KanbanBoard";
import CreateKanbanDialog from "./components/dialogs/CreateKanbanDialog";
import KanbanSwimlane from "./components/kanban/KanbanSwimlane";
import KanbanItem from "./components/kanban/KanbanItem";
import { IBoard, Board, Swimlane, Task } from "./types";
import CreateSwimlaneDialog from "./components/dialogs/CreateSwimlaneDialog";
import CreateTaskDialog from "./components/dialogs/CreateTaskDialog";

const styles = {
  page: {
    padding: "1rem",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
    minWidth: "100vh"
  }
};

function App() {
  const [boards, setBoards] = useState<IBoard[]>([
    new Board("1", "first board", true, [
      new Swimlane("342242", "auto created")
    ]),
    new Board("2", "second board")
  ]);
  const [isCreatingBoard, setIsCreatingBoard] = useState<boolean>(false);
  const [isCreatingSwimlane, setIsCreatingSwimlane] = useState<boolean>(false);
  const [activeSwimlaneId, setActiveSwimlaneId] = useState<string>("");
  const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);

  function activateBoard(id: string): void {
    setBoards(
      boards.map(board => {
        if (board.active === true) {
          board.active = false;
        }
        if (board.id === id) {
          board.active = true;
        }
        return board;
      })
    );
  }

  function createSwimlane(title: string) {
    const board = getActiveBoard();
    board.swimlanes.push(new Swimlane(Math.random().toString(), title));
    setBoards([...boards]);
  }

  function deleteSwimlane(swimlaneId: string) {
    const board = getActiveBoard();
    board.swimlanes = board.swimlanes.filter(
      swimlane => swimlane.id !== swimlaneId
    );
    setBoards([...boards]);
  }

  function createTask(swimlaneId: string, title: string, description: string) {
    const board = getActiveBoard();
    const swimlane = board.swimlanes.filter(
      swimlane => swimlane.id === swimlaneId
    )[0];
    swimlane.tasks.push(new Task(Math.random().toString(), title, description));
    setBoards([...boards]);
  }

  function createBoard(title: string): void {
    const id = Math.random().toString();
    setBoards([...boards, new Board(id, title)]);
  }

  function getActiveBoard(): IBoard {
    return boards.filter(board => board.active === true)[0];
  }

  function onCreateTaskClick(swimlaneId: string): void {
    setIsCreatingTask(true);
    setActiveSwimlaneId(swimlaneId);
  }

  let activeBoard = getActiveBoard();
  if (!activeBoard && boards.length > 0) {
    activateBoard(boards[0].id);
    activeBoard = getActiveBoard();
  }

  return (
    <div style={styles.page}>
      <Container>
        <AppHeader />
        <KanbanMenu
          boards={boards}
          onSelect={activateBoard}
          onCreateKanbanClicked={() => setIsCreatingBoard(true)}
        />
        <KanbanBoard
          numSwimlanes={activeBoard.swimlanes.length}
          onCreateSwimlaneClicked={() => setIsCreatingSwimlane(true)}
        >
          {activeBoard.swimlanes.length > 0
            ? activeBoard.swimlanes.map(swimlane => (
                <KanbanSwimlane
                  key={swimlane.id}
                  swimlane={swimlane}
                  onCreateTaskClick={onCreateTaskClick}
                  deleteSwimlane={deleteSwimlane}
                >
                  {swimlane.tasks.map(task => (
                    <KanbanItem key={task.id} task={task} />
                  ))}
                </KanbanSwimlane>
              ))
            : undefined}
        </KanbanBoard>
        <CreateKanbanDialog
          onClose={() => setIsCreatingBoard(false)}
          isOpen={isCreatingBoard}
          onCreate={(kanbanTitle: string) => {
            createBoard(kanbanTitle);
            setIsCreatingBoard(false);
          }}
        />
        <CreateSwimlaneDialog
          onClose={() => setIsCreatingSwimlane(false)}
          isOpen={isCreatingSwimlane}
          onCreate={(swimlaneTitle: string) => {
            createSwimlane(swimlaneTitle);
            setIsCreatingSwimlane(false);
          }}
        />
        <CreateTaskDialog
          onClose={() => setIsCreatingTask(false)}
          isOpen={isCreatingTask}
          onCreate={(taskTitle: string, taskDescription: string) => {
            createTask(activeSwimlaneId, taskTitle, taskDescription);
            setIsCreatingTask(false);
            setActiveSwimlaneId("");
          }}
        />
      </Container>
    </div>
  );
}

export default App;
