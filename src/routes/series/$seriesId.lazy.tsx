import SeriesCard from "@/components/SeriesCard";
import TaskCard from "@/components/TaskCard";
import { type Series, type Task, type Todo, TodoType } from "@/entities/todo";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { CircleChevronLeft, CirclePlus, Trash2 } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export const Route = createLazyFileRoute("/series/$seriesId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { seriesId } = Route.useParams();
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
    
  }

	return (
		<>
    <div className="flex justify-between">
			<Link to="/">
				<CircleChevronLeft strokeWidth={1} size={50} />
			</Link>
      <button type="button" className="mr-2">
        <Trash2 strokeWidth={2} size={35} color="#cc0202" />
      </button>
    </div>
			<SeriesCard series={series} tasks={tasks} />
			<div className="relative -top-10 flex justify-center -mb-6">
				<button
					type="button"
					className="rounded-full p-2"
					style={{ backgroundColor: `${series.color}cc` }}
				>
					<CirclePlus strokeWidth={2} size={50} color="white" />
				</button>
			</div>
			<p className="mb-2 text-gray-400 font-bold">SERIES</p>
			{tasks.map((task) => {
				return <TaskCard key={task.id} task={task} />;
			})}
		</>
	);
}
