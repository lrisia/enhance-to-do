import TaskCard from "@/components/TaskCard";
import type { Task, Todo } from "@/entities/todo";
import { useLocalStorage } from "usehooks-ts";

type CompleteZoneProps = {
	completedTask: Task[];
};

export default function CompleteZone(props: CompleteZoneProps) {
	const [_, setTodo] = useLocalStorage<Todo[]>("todos", []);

	function onClearCompleted() {
		setTodo((prev: Todo[]) => {
			return prev.filter((todo) => {
				return !props.completedTask.map((task) => task.id).includes(todo.id);
			});
		});
	}

	return (
		<>
			<div className="flex items-center gap-2 mt-6">
				<p className="text-gray-400 font-bold">COMPLETED</p>
				<hr className="w-full" />
			</div>
			<div className="flex justify-end -mt-2">
				<button type="button" onClick={onClearCompleted}>
					<p className="text-gray-500 mr-4">Clear</p>
				</button>
			</div>
			{props.completedTask.map((task) => {
				return <TaskCard key={`${task.id}-completed`} task={task as Task} />;
			})}
		</>
	);
}
