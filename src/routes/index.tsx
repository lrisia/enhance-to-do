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
import { type Task, type Todo, TodoType } from "@/entities/todo";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpDown, Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

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
	const [todos] = useLocalStorage<Todo[]>("todos", []);

	return (
		<>
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
					<Link to="/tasks/create">
						<Button className="border-2 border-blue-400 bg-white text-blue-400">
							<Plus /> New Task
						</Button>
					</Link>
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
			{todos.length === 0 ? (
				<div className="flex w-full justify-center mt-10 text-gray-500">
					<span>Empty</span>
				</div>
			) : (
				todos.map((todo) => {
					if (todo.type === TodoType.Task && todo.seriesId === undefined) {
						return <TaskCard key={todo.id} todo={todo} />;
					} else if (todo.type === TodoType.Series) {
						return (
							<SeriesCard
								key={todo.id}
								series={todo}
								tasks={
									todos.filter(
										(task) => task.type === TodoType.Task && task.seriesId === todo.id,
									) as Task[]
								}
							/>
						);
					}
				})
			)}
		</>
	);
}
