import { Card } from "@/components/ui/card";
import type { SeriesColor } from "@/lib/constant";

interface PreviewSeriesCardProps {
	color: SeriesColor;
	title?: string;
}

export default function PreviewSeriesCard({
	color,
	title = "Holidays in Norway",
}: PreviewSeriesCardProps) {
	return (
		<Card
			className="aspect-square my-4 relative overflow-hidden"
			style={{
				background: `radial-gradient(circle at center, ${color}33 0%, ${color} 100%)`,
			}}
		>
			<div className="p-4">
				<h2 className="text-5xl font-bold mb-8">{title}</h2>
				<div className="flex items-center gap-3">
					<div className="relative h-14 w-4 bg-transparent border-white border-2 rounded-full overflow-hidden">
						<div
							className="absolute bottom-0 left-0 w-full rounded-full bg-white"
							style={{ height: "80%" }}
						/>
					</div>
					<div>
						<p className="text-4xl font-bold mb-1">8/10</p>
						<p className="text-gray-600">tasks</p>
					</div>
				</div>
			</div>
			<div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col justify-end">
				{[...Array(15)].map((_, i) => (
					<div
						key={_}
						className="w-full h-1 mb-[1px]"
						style={{
							backgroundColor: color,
							opacity: 0.1 + i * 0.06,
						}}
					/>
				))}
			</div>
		</Card>
	);
}
