import type { SeriesColor } from "@/lib/constant";

export enum TodoType {
  Task = "task",
  Series = "series",
}

export type Todo = Task | Series;

export type Task = {
  id: string;
  type: TodoType.Task;
  title: string;
  note?: string;
  isCompleted: boolean;
  createdAt: Date;
  seriesId?: string;
};

export type Series = {
  id: string;
  type: TodoType.Series;
  title: string;
  color: SeriesColor
  isCompleted: boolean;
  createdAt: Date;
};
