import SeriesCard from "@/components/SeriesCard";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/")({
	component: App,
});

function greeting(): string {
	const currentHour = new Date().getHours();

	if (currentHour >= 0 && currentHour < 12) {
		return "Good morning";
	} else if (currentHour >= 12 && currentHour < 18) {
		return "Good afternoon";
	}
	return "Good evening";
}

function App() {
	return (
		<>
			<div className="mb-8 flex w-full justify-between">
				<div>
					<p className="text-2xl">{greeting()}</p>
					<span className="flex gap-2">
						<h1 className="text-4xl font-bold">Your</h1>
						<p className="text-4xl">({4})</p>
					</span>
					<h1 className="text-4xl font-bold">TO-DOs</h1>
				</div>
				<div className="flex items-center">
					<Button className="border-2 border-blue-400 bg-white text-blue-400">
						<Plus /> New Task
					</Button>
				</div>
			</div>
			<SeriesCard />
			<TaskCard title="ไปอาบน้ำ" note="ไปอาบน้ำได้แล้วววววว" />
			<TaskCard title="ให้อาหารหมา" />
		</>
	);
}
