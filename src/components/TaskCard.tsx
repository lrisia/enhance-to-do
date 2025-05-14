import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { TodoContext } from "@/hooks/contexts";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useContext } from "react";

export default function TaskCard(props: { title: string; note?: string }) {
  const { setTodo } = useContext(TodoContext);


	return (
		<Card className="my-4">
			<CardContent className="flex justify-between">
				<div>
					<CardTitle>{props.title}</CardTitle>
					<CardDescription className="mt-1">{props.note}</CardDescription>
				</div>
				<div>
					<Checkbox onChange={(event) => {
            event.preventDefault();
            // Todo: add trottle
            setTodo((prev) => {
              return prev.map((todo) => {
                if (todo.title === props.title) {
                  todo.isCompleted = !todo.isCompleted;
                }
                return todo;
              });
            });
          }} />
				</div>
			</CardContent>
		</Card>
	);
}
