import CompleteZone from "@/components/CompleteZone";
import SeriesCard from "@/components/SeriesCard";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type Task, type Todo, TodoType } from "@/entities/todo";
import type { Weather, WeatherEmojiData } from "@/entities/weather";
import { greeting, mapWeatherCodeToEmoji } from "@/lib/utils";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpDown, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const [todos] = useLocalStorage<Todo[]>("todos", []);
	const completed = todos.filter(
		(todo) =>
			todo.type === TodoType.Task && todo.seriesId === undefined && todo.isCompleted === true,
	);

	const [weatherEmoji, setWeatherEmoji] = useState<WeatherEmojiData>({
		name: "",
		emoji: "⏳",
	});

	useEffect(() => {
		const fetchWeather = async () => {
			const response = await fetch(
				"https://api.open-meteo.com/v1/forecast?latitude=15.5&longitude=101&current=temperature_2m,weather_code&timezone=Asia/Bangkok&forecast_days=1",
			);
			const data = (await response.json()) as Weather;
			return data;
		};

		fetchWeather().then((data) => {
			const weatherCode = data.current.weather_code;
			const weatherEmoji = mapWeatherCodeToEmoji(weatherCode);
			setWeatherEmoji(weatherEmoji);
		});
	});

	return (
		<>
			<div className="mb-8 flex w-full justify-between">
				<div>
					<p className="text-2xl">
						<span className="relative text-3xl">{weatherEmoji.emoji}</span> {greeting()}
						<span className="text-sm font-light text-gray-700"> with {weatherEmoji.name}</span>
					</p>
					<span className="flex gap-2">
						<h1 className="text-4xl font-bold">Your</h1>
						<p className="text-4xl">
							(
							{
								todos.filter(
									(todo) =>
										(todo.type === TodoType.Task &&
											todo.seriesId === undefined &&
											todo.isCompleted === false) ||
										todo.type === TodoType.Series,
								).length
							}
							)
						</p>
					</span>
					<h1 className="text-4xl font-bold">TO-DOs</h1>
				</div>
				<div className="flex items-center">
					<Link to="/tasks/create">
						<Button className="border-2 border-blue-400 bg-white text-blue-400">
							<Plus /> New Task
						</Button>
					</Link>
				</div>
			</div>
			<div className="mb-4 flex justify-start">
				<Select>
					<SelectTrigger>
						<ArrowUpDown className="mr-2 h-4 w-4" />
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="decs">Descending</SelectItem>
						<SelectItem value="asc">Ascending</SelectItem>
					</SelectContent>
				</Select>
			</div>
			{todos.length === 0 ? (
				<div className="flex w-full justify-center mt-10 text-gray-500">
					<span>Empty</span>
				</div>
			) : (
				todos
					.filter((todo) => todo.isCompleted === false)
					.map((todo) => {
						if (todo.type === TodoType.Task && todo.seriesId === undefined) {
							return <TaskCard key={todo.id} task={todo} />;
						} else if (todo.type === TodoType.Series) {
							return (
								<Link key={todo.id} to="/series/$seriesId" params={{ seriesId: todo.id }}>
									<SeriesCard
										series={todo}
										tasks={
											todos.filter(
												(task) => task.type === TodoType.Task && task.seriesId === todo.id,
											) as Task[]
										}
									/>
								</Link>
							);
						}
					})
			)}
			{completed.length !== 0 ? <CompleteZone completedTask={completed as Task[]} /> : <></>}
		</>
	);
}
