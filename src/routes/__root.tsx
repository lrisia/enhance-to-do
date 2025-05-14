import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="my-6 mx-2">
				<Outlet />
			</div>
			<TanStackRouterDevtools />
		</>
	),
});
