import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/sex").methods({
	GET: () => {
		return new Response(JSON.stringify({ sex: "male" }), {
			headers: {
				"Content-Type": "application/json",
			},
		});
	},
});
