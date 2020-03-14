import { IBoard, ISwimLane, ITask } from "./types";

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
