import { useAuthActions } from "@convex-dev/auth/react";
import { Link, useRouter } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";

import { useMe } from "@/hooks/useMe";

export default function Header() {
	const { signIn, signOut } = useAuthActions();
	const router = useRouter();
	console.log(router.latestLocation);
	const user = useMe();
	const onSignIn = () => {
		signIn("kakao", {
			redirectTo: router.latestLocation.href,
		});
	};
	return (
		<header className="p-2 flex gap-2 bg-white text-black justify-between">
			<nav className="flex flex-row items-center justify-between w-full">
				<div className="flex flex-row">
					<div className="px-2 font-bold">
						<Link to="/">Home</Link>
					</div>

					<div className="px-2 font-bold">
						<Link to="/demo/start/server-funcs">Start - Server Functions</Link>
					</div>

					<div className="px-2 font-bold">
						<Link to="/demo/start/api-request">Start - API Request</Link>
					</div>

					<div className="px-2 font-bold">
						<Link to="/abc">ABC</Link>
					</div>
				</div>
				<div>
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
						<button onClick={onSignIn} type="button">
							Sign in with kakao
						</button>
					</Unauthenticated>
				</div>
			</nav>
		</header>
	);
}
