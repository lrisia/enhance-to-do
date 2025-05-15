import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/entities/todo";
import { TodoContext } from "@/hooks/contexts";
import { useContext, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

export default function TaskCard(props: { todo: Todo }) {
	const { setTodo } = useContext(TodoContext);
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
				<div>
					<CardTitle>{props.todo.title}</CardTitle>
					<CardDescription className="mt-1">{props.todo.note}</CardDescription>
				</div>
				<Checkbox
					id={`complete-${props.todo.id}`}
					className="w-5 h-5 rounded-full border-black"
					onClick={() => {
						setComplete(true);
					}}
				/>
			</CardContent>
		</Card>
	);
}
