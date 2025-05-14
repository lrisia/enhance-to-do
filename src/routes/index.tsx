import SeriesCard from "@/components/SeriesCard";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type Todo, TodoType } from "@/entities/todo";
import { TodoContext } from "@/hooks/contexts";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpDown, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
	component: App,
});

function greeting(): string {
	const currentHour = new Date().getHours();

	if (currentHour >= 0 && currentHour < 12) {
		return "Good morning";
	} else if (currentHour >= 12 && currentHour < 18) {
		return "Good afternoon";
	}
	return "Good evening";
}

function App() {
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
			<TodoContext.Provider value={{ todos, setTodo }}>
				<div className="mb-8 flex w-full justify-between">
					<div>
						<p className="text-2xl">{greeting()}</p>
						<span className="flex gap-2">
							<h1 className="text-4xl font-bold">Your</h1>
							<p className="text-4xl">({todos.length})</p>
						</span>
						<h1 className="text-4xl font-bold">TO-DOs</h1>
					</div>
					<div className="flex items-center">
						<Button className="border-2 border-blue-400 bg-white text-blue-400">
							<Plus /> New Task
						</Button>
					</div>
				</div>
				<div className="mb-4 flex justify-start">
					<Select>
						<SelectTrigger>
							<ArrowUpDown className="mr-2 h-4 w-4" />
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="decs">Descending</SelectItem>
							<SelectItem value="asc">Ascending</SelectItem>
						</SelectContent>
					</Select>
				</div>
				{todos.map((todo) => {
					if (todo.type === TodoType.Task) {
						return <TaskCard title={todo.title} note={todo.note} />;
					} else {
						return <SeriesCard />;
					}
				})}
			</TodoContext.Provider>
		</>
	);
}
