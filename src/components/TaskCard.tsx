import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/entities/todo";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";

export default function TaskCard(props: { todo: Todo }) {
	const [_, setTodo] = useLocalStorage<Todo[]>("todos", []);
	const [editMode, setEditMode] = useState(false);
	const [title, setTitle] = useState(props.todo.title);
	const [note, setNote] = useState(props.todo.note);
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
			<CardContent className="flex">
				<div className="flex w-full">
					{editMode === true ? (
						<form
							className="flex"
							onSubmit={(event) => {
								event.preventDefault();
								setTodo((prev: Todo[]) => {
									return prev.map((todo) => {
										if (todo.id === props.todo.id) {
											return {
												...todo,
												title: title,
												note: note,
											};
										}
										return todo;
									});
								});
								setEditMode(false);
							}}
						>
							<Button variant="ghost" className="items-start mr-2" size={null} type="submit">
								<Check strokeWidth={2} />
							</Button>
							<div className="w-full pr-4">
								<input
									className="leading-none font-semibold w-full border-b-1 border-b-gray-300 focus:outline-hidden focus:border-b-gray-500"
									type="text"
									autoComplete="off"
									min={0}
									defaultValue={title}
									onChange={(event) => {
										setTitle(event.target.value);
									}}
								/>
								<input
									className="text-muted-foreground text-sm mt-0.5 focus:outline-hidden"
									placeholder="Note (Optional)"
									autoComplete="off"
									defaultValue={note}
									onChange={(event) => {
										setNote(event.target.value);
									}}
								/>
							</div>
						</form>
					) : (
						<>
							<Button
								variant="ghost"
								className="items-start mr-2"
								size={null}
								onClick={() => {
									setEditMode(true);
								}}
							>
								<Pencil strokeWidth={2} color="black" />
							</Button>
							<div className="w-full pr-4">
								<CardTitle>{title}</CardTitle>
								<CardDescription className="mt-1">{note}</CardDescription>
							</div>
						</>
					)}
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
