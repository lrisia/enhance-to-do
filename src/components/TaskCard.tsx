import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/entities/todo";
import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useEffect } from "react";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";

export default function TaskCard(props: { todo: Todo }) {
	const [_, setTodo] = useLocalStorage<Todo[]>("todos", []);
	const [debouncedComplete, setComplete] = useDebounceValue(false, 3000);

	useEffect(() => {
		if (debouncedComplete === true) {
			setTodo((prev: Todo[]) => {
				return prev.filter((todo) => todo.id !== props.todo.id);
			});
		}
	}, [debouncedComplete, setTodo, props.todo.id]);

	return (
		<Card className="my-4">
			<CardContent className="flex justify-between">
				<div className="flex">
					<Link to="/task/edit/$taskId" params={{ taskId: props.todo.id }} className="mr-2">
						<Pencil strokeWidth={2} size={15} color="black" />
					</Link>
					<div>
						<CardTitle>{props.todo.title}</CardTitle>
						<CardDescription className="mt-1">{props.todo.note}</CardDescription>
					</div>
				</div>
				<Checkbox
					id={`complete-${props.todo.id}`}
					className="w-5 h-5 rounded-full border-black"
					onClick={(event) => {
						console.log("complete", event);
						setComplete(true);
					}}
				/>
			</CardContent>
		</Card>
	);
}
