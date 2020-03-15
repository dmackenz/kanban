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
  id: string;
  title: string;
  description: string;
}

export class Board implements IBoard {
  constructor(
    public id: string,
    public title: string,
    public active: boolean = false,
    public swimlanes: ISwimLane[] = []
  ) {}
}

export class Swimlane implements ISwimLane {
  constructor(
    public id: string,
    public title: string,
    public tasks: ITask[] = []
  ) {}
}

export class Task implements ITask {
  constructor(
    public id: string,
    public title: string,
    public description: string
  ) {}
}
