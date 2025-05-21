import SeriesCard from "@/components/SeriesCard";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { type Series, type Task, type Todo, TodoType } from "@/entities/todo";
import { Dialog } from "@radix-ui/react-dialog";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { CircleChevronLeft, CirclePlus, Trash2 } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export const Route = createLazyFileRoute("/series/$seriesId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { seriesId } = Route.useParams();
	const navigate = useNavigate();

	if (!seriesId) {
		throw new Error("seriesId is required");
	}
	const [todos, setTodo] = useLocalStorage<Todo[]>("todos", []);

	const series = todos.find((todo) => todo.id === seriesId) as Series;
	if (series === undefined) {
		throw new Error("series not found");
	}

	const tasks = todos.filter(
		(task) => task.type === TodoType.Task && task.seriesId === seriesId,
	) as Task[];

	function onDeleteSeries() {
		const deleteId = [seriesId, ...tasks.map((task) => task.id)];
		setTodo((prev: Todo[]) => {
			return prev.filter((todo) => !deleteId.includes(todo.id));
		});
		navigate({
			to: "/",
		});
	}

	return (
		<>
			<div className="flex justify-between">
				<Link to="/">
					<CircleChevronLeft strokeWidth={1} size={50} />
				</Link>
				<Dialog>
					<DialogTrigger asChild>
						<button type="button" className="mr-2">
							<Trash2 strokeWidth={2} size={35} color="#cc0202" />
						</button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle className="text-red-600">Delete Series ?</DialogTitle>
							<DialogDescription>This precess cannot be undone.</DialogDescription>
						</DialogHeader>
						<DialogFooter className="justify-conter">
							<Button variant="destructive" onClick={onDeleteSeries}>
								Delete
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<SeriesCard series={series} tasks={tasks} />
			<div className="relative -top-10 flex justify-center -mb-7">
				<Link
					to="/tasks/create"
					search={{ seriesId }}
					className="rounded-full p-2"
					style={{ backgroundColor: `${series.color}cc` }}
				>
					<CirclePlus strokeWidth={2} size={50} color="white" />
				</Link>
			</div>
			<p className="mb-2 text-gray-400 font-bold">SERIES</p>
			{tasks.length === 0 ? (
				<div className="flex w-full justify-center mt-4 text-gray-500">
					<span>Empty</span>
				</div>
			) : (
				tasks.map((task) => {
					return <TaskCard key={task.id} task={task} />;
				})
			)}
		</>
	);
}
