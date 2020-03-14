export interface IBoard {
  id: string;
  title: string;
  active?: boolean;
  swimlanes: ISwimLane[];
}

export interface ISwimLane {
  id: string;
  title: string;
  tasks: ITask[];
}

export interface ITask {
  title: string;
  description: string;
}
