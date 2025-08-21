import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const { signIn } = useAuthActions();
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold">Login</h1>
			<button
				type="button"
				onClick={() => signIn("kakao")}
				className="bg-primary text-black p-2 rounded-md"
			>
				카카오로 로그인
			</button>
		</div>
	);
}
