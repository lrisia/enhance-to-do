import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import type { Todo } from "@/entities/todo";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Link } from "@tanstack/react-router";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";
import { z } from "zod";

const formSchema = z.object({
	title: z.string().min(1, {
		message: "Title is required",
	}),
	note: z.optional(z.string()),
});

export default function TaskCard(props: { todo: Todo }) {
	const [_, setTodo] = useLocalStorage<Todo[]>("todos", []);
	const [editMode, setEditMode] = useState(false);
	const [debouncedComplete, setComplete] = useDebounceValue(false, 3000);

	// useEffect(() => {
	// 	if (debouncedComplete === true) {
	// 		setTodo((prev: Todo[]) => {
	// 			return prev.filter((todo) => todo.id !== props.todo.id);
	// 		});
	// 	}
	// }, [debouncedComplete, setTodo, props.todo.id]);

	const taskForm = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: props.todo.title,
			note: props.todo.note ?? "",
		},
	});

	return (
		<Card className="my-4">
			<Form {...taskForm}>
				<form>
					<CardContent className="flex">
						<div className="flex w-full">
							{editMode === true ? (
								<Button variant="ghost" className="items-start mr-2" size={null} type="submit">
									<Check strokeWidth={2} />
								</Button>
							) : (
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
							)}
							<div className="w-full pr-4">
								{editMode === true ? (
									<>
										<FormField
											control={taskForm.control}
											name="title"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className="flex gap-2">
															<input
																className="leading-none font-semibold w-full border-b-1 border-b-gray-300 focus:outline-hidden focus:border-b-gray-500"
																type="text"
																autoComplete="off"
																{...field}
															/>
														</div>
													</FormControl>
													<FormMessage className="ml-2" />
												</FormItem>
											)}
										/>
										<FormField
											control={taskForm.control}
											name="note"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className="flex gap-2">
															<input
																className="ext-muted-foreground text-sm mt-1 focus:outline-hidden"
																placeholder="Note (Optional)"
																autoComplete="off"
																{...field}
															/>
														</div>
													</FormControl>
													<FormMessage className="ml-2" />
												</FormItem>
											)}
										/>
									</>
								) : (
									<>
										<CardTitle>{props.todo.title}</CardTitle>
										<CardDescription className="mt-1">{props.todo.note}</CardDescription>
									</>
								)}
							</div>
						</div>
						<Checkbox
							id={`complete-${props.todo.id}`}
							className="w-5 h-5 rounded-full border-black"
							onClick={() => {
								setComplete(true);
							}}
						/>
					</CardContent>
				</form>
			</Form>
		</Card>
	);
}
