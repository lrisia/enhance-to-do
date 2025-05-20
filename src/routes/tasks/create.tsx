import PreviewSeriesCard from "@/components/PreviewSeriesCard";
import SeriesCard from "@/components/SeriesCard";
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
import { type Series, type Task, type Todo, TodoType } from "@/entities/todo";
import { DefaultSeriesColor, SeriesColor } from "@/lib/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { CirclePlus, CircleX } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { uuidv7 } from "uuidv7";
import { z } from "zod";

const searchParamSchema = z.object({
	seriesId: z.optional(z.string()),
});

export const Route = createFileRoute("/tasks/create")({
	component: RouteComponent,
	validateSearch: searchParamSchema,
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

function randomSeriesTitle(): string {
	const titles = [
		"Holidays in Norway",
		"Weekend Projects",
		"Study Goals",
		"Fitness Journey",
		"Home Renovation",
		"Travel Plans",
		"Reading List",
		"Work Tasks",
	];
	return titles[Math.floor(Math.random() * titles.length)];
}

function RouteComponent() {
	const search = Route.useSearch();

	const [todos, setTodo] = useLocalStorage<Todo[]>("todos", []);
	const taskId = uuidv7();
	let seriesId = uuidv7();

	const navigate = useNavigate();
	const [title] = useState(randomTitle());
	const [selectedSeries, setSelectedSeries] = useState<string | undefined>(search.seriesId);
	const [createSeries, setCreateSeries] = useState(false);
	const [siriesColor, setSeriesColor] = useState(DefaultSeriesColor);
	const [defaultSeriesTitle] = useState(randomSeriesTitle());
	const [seriesTitle, setSeriesTitle] = useState(defaultSeriesTitle);

	const taskForm = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			note: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (selectedSeries !== undefined) {
			seriesId = selectedSeries;
		} else if (createSeries === true) {
			// Create series
			setTodo((prev: Todo[]) => {
				return [
					...prev,
					{
						id: seriesId,
						type: TodoType.Series,
						title: seriesTitle,
						isCompleted: false,
						createdAt: new Date(),
						color: siriesColor,
					},
				];
			});
		}

		setTodo((prev: Todo[]) => {
			return [
				...prev,
				{
					id: taskId,
					type: TodoType.Task,
					title: values.title,
					note: values.note === "" ? undefined : values.note,
					isCompleted: false,
					createdAt: new Date(),
					seriesId: createSeries || selectedSeries ? seriesId : undefined,
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
			<div className="flex gap-2">
				<button
					type="button"
					onClick={() => {
						setSelectedSeries(undefined);
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
				<div className="flex overflow-scroll text-nowrap gap-2 no-scrollbar mask-r-from-90%">
					{todos
						.filter((todo) => todo.type === TodoType.Series)
						.map((series) => (
							<button
								key={series.id}
								type="button"
								onClick={() => {
									setSelectedSeries(series.id);
									setCreateSeries(false);
								}}
							>
								<div
									style={{
										background: `radial-gradient(circle at center, ${series.color}33 0%, ${series.color} 100%)`,
									}}
									className="relative rounded-full p-2 justify-items-center"
								>
									<p className="font-bold">{series.title}</p>
								</div>
							</button>
						))}
				</div>
			</div>
			{createSeries && (
				<>
					<p className="mt-2 mb-2 text-gray-400 font-bold text-xs">COLOR</p>
					<div className="flex bg-gray-100 rounded-full p-2 w-min gap-2 mb-4">
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
					<p className="mb-2 text-gray-400 font-bold text-xs">SERIES TITLE</p>
					<Input
						className="rounded-4xl h-12 px-5"
						placeholder={defaultSeriesTitle}
						autoComplete="off"
						onChange={(event) => {
							if (event.target.value.length === 0) {
								setSeriesTitle(defaultSeriesTitle);
							} else {
								setSeriesTitle(event.target.value);
							}
						}}
					/>
					<PreviewSeriesCard color={siriesColor} title={seriesTitle} />
				</>
			)}
			{selectedSeries && (
				<SeriesCard
					series={todos.find((todo) => todo.id === selectedSeries) as Series}
					tasks={
						todos.filter(
							(todo) => todo.type === TodoType.Task && todo.seriesId === selectedSeries,
						) as Task[]
					}
				/>
			)}
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
			<div className="h-10" />
		</>
	);
}
