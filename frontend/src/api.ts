import ApolloClient, { DocumentNode, gql } from "apollo-boost";
import { IBoard, Board, Swimlane, Task, ISwimLane, ITask } from "./types";

export type Client = ApolloClient<unknown>;

export class KanbanAPI {
  private static readonly QUERY_BOARDS = gql`
    {
      boards {
        id
        title
      }
    }
  `;

  private static readonly QUERY_BOARD = gql`
    query Board($id: String!) {
      board(id: $id) {
        id
        title
        swimlanes {
          id
          title
          tasks {
            id
            title
            description
          }
        }
      }
    }
  `;

  private static readonly MUTATION_CREATE_BOARD = gql`
    mutation CreateBoard($data: CreateBoardInput!) {
      createBoard(data: $data) {
        id
        title
      }
    }
  `;

  private static readonly MUTATION_CREATE_SWIMLANE = gql`
    mutation CreateSwimlane($data: CreateSwimlaneInput!) {
      createSwimlane(data: $data) {
        id
        title
      }
    }
  `;

  private static readonly MUTATION_DELETE_SWIMLANE = gql`
    mutation DeleteSwimlane($data: DeleteSwimlaneInput!) {
      deleteSwimlane(data: $data)
    }
  `;

  private static readonly MUTATION_CREATE_TASK = gql`
    mutation CreateTask($data: CreateTaskInput!) {
      createTask(data: $data) {
        id
        title
        description
      }
    }
  `;

  private static async executeQuery(
    client: Client,
    query: DocumentNode,
    variables: any = undefined
  ): Promise<any> {
    if (variables) {
      return await client.query({
        query,
        variables
      });
    } else {
      return await client.query({
        query
      });
    }
  }

  private static async executeMutation(
    client: Client,
    mutation: DocumentNode,
    variables: any = undefined
  ): Promise<any> {
    if (variables) {
      return await client.mutate({
        mutation,
        variables
      });
    } else {
      return await client.mutate({
        mutation
      });
    }
  }

  private static parseBoard(board: any): Board {
    const { id, title, swimlanes } = board;
    const parsedSwimlanes: Swimlane[] = [];
    if (swimlanes) {
      for (const swimlane of swimlanes) {
        parsedSwimlanes.push(this.parseSwimlane(swimlane));
      }
    }
    return new Board(id, title, false, parsedSwimlanes);
  }

  private static parseSwimlane(swimlane: any): Swimlane {
    const { id, title, tasks } = swimlane;
    const parsedTasks: Task[] = [];
    if (tasks) {
      for (const task of tasks) {
        parsedTasks.push(this.parseTask(task));
      }
    }
    return new Swimlane(id, title, parsedTasks);
  }

  private static parseTask(task: any): Task {
    const { id, title, description } = task;
    return new Task(id, title, description);
  }

  static async getBoards(client: Client): Promise<IBoard[]> {
    const result = await this.executeQuery(client, this.QUERY_BOARDS);
    const boards: IBoard[] = [];
    for (const board of result.data.boards) {
      boards.push(this.parseBoard(board));
    }
    return boards;
  }

  static async getBoard(client: Client, boardId: string): Promise<IBoard> {
    const result = await this.executeQuery(client, this.QUERY_BOARD, {
      id: boardId
    });
    return this.parseBoard(result.data.board);
  }

  static async createBoard(client: Client, title: string): Promise<IBoard> {
    const result = await this.executeMutation(
      client,
      this.MUTATION_CREATE_BOARD,
      {
        data: {
          title
        }
      }
    );
    return this.parseBoard(result.data.createBoard);
  }

  static async createSwimlane(
    client: Client,
    boardId: string,
    title: string
  ): Promise<ISwimLane> {
    const result = await this.executeMutation(
      client,
      this.MUTATION_CREATE_SWIMLANE,
      {
        data: {
          title,
          boardId
        }
      }
    );

    return this.parseSwimlane(result.data.createSwimlane);
  }

  static async deleteSwimlane(
    client: Client,
    swimlaneId: string
  ): Promise<void> {
    return await this.executeMutation(client, this.MUTATION_DELETE_SWIMLANE, {
      data: {
        swimlaneId
      }
    });
  }

  static async createTask(
    client: Client,
    title: string,
    description: string,
    swimlaneId: string
  ): Promise<ITask> {
    const result = await this.executeMutation(
      client,
      this.MUTATION_CREATE_TASK,
      {
        data: {
          title,
          description,
          swimlaneId
        }
      }
    );

    return this.parseTask(result.data.createTask);
  }
}
