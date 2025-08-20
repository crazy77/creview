import { useAuthActions } from "@convex-dev/auth/react";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex-gen/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { useEffect, useState } from "react";
import { useMe } from "@/hooks/useMe";

async function getNames() {
	return await fetch("/api/demo-names").then((res) => res.json());
}

const getSex = async () => {
	return await fetch("/api/sex").then((res) => res.json());
};

export const Route = createFileRoute("/demo/start/api-request")({
	loader: async (opts) => {
		await opts.context.queryClient.ensureQueryData(
			convexQuery(api.tasks.get, {}),
		);
	},
	component: Home,
});

function Home() {
	const { signIn, signOut } = useAuthActions();
	const [names, setNames] = useState<Array<string>>([]);
	const [sex, setSex] = useState<{ sex: string }>({ sex: "" });
	useEffect(() => {
		getNames().then(setNames);
		getSex().then(setSex);
	}, []);

	const { data } = useSuspenseQuery(convexQuery(api.tasks.get, {}));
	const user = useMe();

	return (
		<div
			className="flex items-center justify-center min-h-screen p-4 text-white"
			style={{
				backgroundColor: "#000",
				backgroundImage:
					"radial-gradient(ellipse 60% 60% at 0% 100%, #444 0%, #222 60%, #000 100%)",
			}}
		>
			<Authenticated>
				<button
					onClick={() => void signOut()}
					type="button"
					className="flex items-center gap-2"
				>
					<img
						src={user?.image}
						alt={user?.name}
						className="w-10 h-10 rounded-full"
					/>
					{user?.name}
					Sign out
				</button>
			</Authenticated>
			<Unauthenticated>
				<button onClick={() => void signIn("kakao")} type="button">
					Sign in with kakao
				</button>
			</Unauthenticated>
			<div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
				<h1 className="text-2xl mb-4">Start API Request Demo - Names List</h1>
				<ul className="mb-4 space-y-2">
					{names.map((name) => (
						<li
							key={name}
							className="bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-md"
						>
							<span className="text-lg text-white">{name}</span>
						</li>
					))}
				</ul>
				<p className="text-lg text-white">{sex.sex}</p>
				<ul className="mb-4 space-y-2">
					{data.map((task) => (
						<li
							key={task._id}
							className="bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-md"
						>
							<span className="text-lg text-white">{task.text}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
