import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import AppHeader from "./components/AppHeader";
import KanbanMenu from "./components/kanban/KanbanMenu";
import KanbanBoard from "./components/kanban/KanbanBoard";
import CreateKanbanDialog from "./components/dialogs/CreateKanbanDialog";
import KanbanSwimlane from "./components/kanban/KanbanSwimlane";
import KanbanItem from "./components/kanban/KanbanItem";
import { IBoard } from "./types";
import CreateSwimlaneDialog from "./components/dialogs/CreateSwimlaneDialog";
import CreateTaskDialog from "./components/dialogs/CreateTaskDialog";
import { KanbanAPI } from "./api";
import { client } from "./index";

const styles = {
  page: {
    padding: "1rem",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
    minWidth: "100vh"
  }
};

function App() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [isCreatingBoard, setIsCreatingBoard] = useState<boolean>(false);
  const [isCreatingSwimlane, setIsCreatingSwimlane] = useState<boolean>(false);
  const [activeSwimlaneId, setActiveSwimlaneId] = useState<string>("");
  const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);

  async function createBoard(title: string) {
    const board = await KanbanAPI.createBoard(client, title);
    setBoards([...boards, board]);
  }

  async function createSwimlane(title: string) {
    const board = getActiveBoard();
    board.swimlanes.push(
      await KanbanAPI.createSwimlane(client, board.id, title)
    );
    setBoards([...boards]);
  }

  async function deleteSwimlane(swimlaneId: string) {
    const board = getActiveBoard();
    board.swimlanes = board.swimlanes.filter(
      swimlane => swimlane.id !== swimlaneId
    );
    await KanbanAPI.deleteSwimlane(client, swimlaneId);
    setBoards([...boards]);
  }

  async function createTask(
    swimlaneId: string,
    title: string,
    description: string
  ) {
    const board = getActiveBoard();
    const swimlane = board.swimlanes.filter(
      swimlane => swimlane.id === swimlaneId
    )[0];

    swimlane.tasks.push(
      await KanbanAPI.createTask(client, title, description, swimlane.id)
    );
    setBoards([...boards]);
  }

  async function activateBoard(id: string) {
    const newBoards = boards.map(async board => {
      if (board.active === true) {
        board.active = false;
      }
      if (board.id === id) {
        board = await KanbanAPI.getBoard(client, board.id);
        board.active = true;
      }
      return board;
    });

    setBoards(await Promise.all(newBoards));
  }

  function getActiveBoard(): IBoard {
    return boards.filter(board => board.active === true)[0];
  }

  function onCreateTaskClick(swimlaneId: string): void {
    setIsCreatingTask(true);
    setActiveSwimlaneId(swimlaneId);
  }

  if (boards.length === 0) {
    (async () => {
      setBoards(await KanbanAPI.getBoards(client));
    })();
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
          numSwimlanes={activeBoard ? activeBoard.swimlanes.length : 0}
          onCreateSwimlaneClicked={() => setIsCreatingSwimlane(true)}
        >
          {activeBoard && activeBoard.swimlanes.length > 0
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
