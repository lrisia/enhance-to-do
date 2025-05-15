import { type Todo, TodoType } from "@/entities/todo";
import { TodoContext } from "@/hooks/contexts";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";

export const Route = createRootRoute({
	component: Root,
});

function Root() {
	const [todos, setTodo] = useState<Todo[]>([
		{
			id: "1",
			type: TodoType.Task,
			title: "ไปอาบน้ำ",
			note: "ไปอาบน้ำได้แล้ววววววว",
			isCompleted: false,
		},
		{
			id: "2",
			type: TodoType.Series,
			title: "ไปเที่ยว",
			note: "ไปเที่ยวได้แล้ววววววว",
			isCompleted: false,
		},
	]);

	return (
		<>
			<div className="my-6 mx-2">
				<TodoContext.Provider value={{ todos, setTodo }}>
					<Outlet />
				</TodoContext.Provider>
			</div>
			<TanStackRouterDevtools />
		</>
	);
}
