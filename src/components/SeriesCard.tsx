import { Card } from "@/components/ui/card";
import type { Series, Task } from "@/entities/todo";

interface SeriesCardProps {
	series: Series;
	tasks: Task[];
}

export default function SeriesCard({ series, tasks }: SeriesCardProps) {
	const taskCount = tasks.length;
	const completedTasks = tasks.filter((task) => task.isCompleted).length;
	const completionPercentage = Math.round((completedTasks / taskCount) * 100);

	return (
		<Card
			className="aspect-square my-4 relative overflow-hidden"
			style={{
				background: `radial-gradient(circle at center, ${series.color}33 0%, ${series.color} 100%)`,
			}}
		>
			<div className="p-4">
				<h2 className="text-5xl font-bold mb-8">{series.title}</h2>
				<div className="flex items-center gap-3">
					<div className="relative h-14 w-4 bg-transparent border-white border-2 rounded-full overflow-hidden">
						<div
							className="absolute bottom-0 left-0 w-full rounded-full bg-white"
							style={{ height: `${completionPercentage}%` }}
						/>
					</div>
					<div>
						<p className="text-4xl font-bold mb-1">{`${completedTasks}/${taskCount}`}</p>
						<p className="text-gray-600">tasks</p>
					</div>
				</div>
			</div>
			<div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col justify-end">
				{[...Array(15)].map((_, i) => (
					<div
						key={i}
						className="w-full h-1 mb-[1px]"
						style={{
							backgroundColor: series.color,
							opacity: 0.1 + i * 0.06,
						}}
					/>
				))}
			</div>
		</Card>
	);
}
