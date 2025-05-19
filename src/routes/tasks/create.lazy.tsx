import PreviewSeriesCard from "@/components/PreviewSeriesCard";
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
import { DefaultSeriesColor, SeriesColor } from "@/lib/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { CirclePlus, CircleX } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";

export const Route = createLazyFileRoute("/tasks/create")({
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

const title = randomTitle();

function RouteComponent() {
	const [_, setValue] = useLocalStorage<Todo[]>("todos", []);
	const id = useId();
	const navigate = useNavigate();
	const [createSeries, setCreateSeries] = useState(false);
	const [siriesColor, setSeriesColor] = useState(DefaultSeriesColor);

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
					createdAt: new Date(),
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
				<button
					type="button"
					onClick={() => {
						setCreateSeries(!createSeries);
						setSeriesColor(DefaultSeriesColor);
					}}
				>
					<CirclePlus
						strokeWidth={1}
						size={40}
						className={`transition-transform ${createSeries ? "rotate-z-45" : ""}`}
					/>
				</button>
				{createSeries && (
					<>
						<p className="mb-2 text-gray-400 font-bold text-xs">COLOR</p>
						<div className="flex bg-gray-100 rounded-full p-2 w-min gap-2">
							{Object.entries(SeriesColor).map(([color, code]) => (
								<div
									key={color}
									style={{ backgroundColor: code }}
									className={`rounded-full w-8 h-8 cursor-pointer transition-transform hover:scale-110 ${siriesColor === code ? "ring-2 ring-gray-400" : ""}`}
									onClick={() => {
										setSeriesColor(code);
									}}
								/>
							))}
						</div>
						<PreviewSeriesCard color={siriesColor} />
					</>
				)}
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
											placeholder={title}
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
			<div className="h-10"/>
		</>
	);
}
