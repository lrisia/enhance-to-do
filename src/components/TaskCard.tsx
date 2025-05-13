import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TaskCard(props: { title: string; note?: string }) {
	return (
		<Card className="my-4">
			<CardHeader>
				<CardTitle>{props.title}</CardTitle>
				<CardDescription>{props.note}</CardDescription>
			</CardHeader>
		</Card>
	);
}
