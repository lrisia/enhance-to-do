import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task, Todo } from "@/entities/todo";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";

export default function TaskCard(props: { task: Task }) {
	const [_, setTodo] = useLocalStorage<Todo[]>("todos", []);
	const [editMode, setEditMode] = useState(false);
	const [title, setTitle] = useState(props.task.title);
	const [titleError, setTitleError] = useState<string | undefined>();
	const [note, setNote] = useState(props.task.note);
	const [debouncedComplete, setComplete] = useDebounceValue(false, 3000);

	useEffect(() => {
		if (debouncedComplete === true) {
			setTodo((prev: Todo[]) => {
				return prev.filter((todo) => todo.id !== props.task.id);
			});
		}
	}, [debouncedComplete, setTodo, props.task.id]);

	return (
		<Card className="my-4">
			<CardContent className="flex">
				<div className="flex w-full">
					{editMode === true ? (
						<form
							className="flex"
							onSubmit={(event) => {
								event.preventDefault();

								if (titleError !== undefined) return;

								setTodo((prev: Todo[]) => {
									return prev.map((todo) => {
										if (todo.id === props.task.id) {
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
									className={`leading-none font-semibold w-full border-b-1 focus:outline-hidden ${titleError !== undefined ? "border-red-500 focus:border-b-red-600" : "border-b-gray-300 focus:border-b-gray-500"}`}
									type="text"
									autoComplete="off"
									defaultValue={title}
									onChange={(event) => {
										if (event.target.value.length === 0) {
											setTitleError("Title cannot be empty");
										} else {
											setTitleError(undefined);
										}
										setTitle(event.target.value);
									}}
								/>
								{titleError !== undefined ? (
									<p className="flex text-red-500 text-sm">{titleError}</p>
								) : (
									<></>
								)}
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
					id={`complete-${props.task.id}`}
					className="w-5 h-5 rounded-full border-black"
					onClick={() => {
						setComplete(true);
					}}
				/>
			</CardContent>
		</Card>
	);
}
