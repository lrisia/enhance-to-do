import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type Todo, TodoType } from "@/entities/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { CirclePlus, CircleX } from "lucide-react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";

export const Route = createLazyFileRoute("/task/create")({
	component: RouteComponent,
});

const formSchema = z.object({
	title: z.string().min(1, {
		message: "Title is required",
	}),
	note: z.optional(z.string()),
});

function randomTitle(): string {
	const titles = ["Go shopping", "Do homework", "Exercise", "Read a book"];
	return titles[Math.floor(Math.random() * titles.length)];
}

function RouteComponent() {
	const [_, setValue] = useLocalStorage<Todo[]>("todos", []);
	const id = useId();
	const navigate = useNavigate();

	const taskForm = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			note: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setValue((prev: Todo[]) => {
			return [
				...prev,
				{
					id: id,
					type: TodoType.Task,
					title: values.title,
					note: values.note === "" ? undefined : values.note,
					isCompleted: false,
				},
			];
		});
		navigate({
			to: "/",
		});
	}

	return (
		<>
			<Link to="/">
				<CircleX strokeWidth={1} size={50} />
			</Link>
			<h1 className="text-4xl font-bold my-2">NEW TASK</h1>
			<p className="mb-2 mt-6 text-gray-400 font-bold">SERIES</p>
			<div>
				<Link to=".">
					<CirclePlus strokeWidth={1} size={40} to="." />
				</Link>
			</div>
			<p className="mb-2 mt-6 text-gray-400 font-bold">TASK</p>
			<Form {...taskForm}>
				<form onSubmit={taskForm.handleSubmit(onSubmit)} className="space-y-8 mx-2 mt-6">
					<FormField
						control={taskForm.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-400">Title</FormLabel>
								<FormControl>
									<div className="flex gap-2">
										<Input
											className="rounded-4xl h-12 px-5"
											placeholder={randomTitle()}
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
								<FormLabel className="text-gray-400">Note</FormLabel>
								<FormControl>
									<div className="flex gap-2">
										<Input
											className="rounded-4xl h-12 px-5"
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
					<div className="fixed w-full bottom-2 left-0 px-2">
						<Button className="w-full rounded-4xl h-12" type="submit">
							Create
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
