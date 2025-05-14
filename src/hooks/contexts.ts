import type { Todo } from "@/entities/todo";
import { createContext } from "react";

type ToDoContextType = {
  todos: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
};
export const TodoContext = createContext<ToDoContextType>({
  todos: [],
  setTodo: () => {},
});
