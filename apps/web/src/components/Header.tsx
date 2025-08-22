import { useAuthActions } from "@convex-dev/auth/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@creview/ui/src/components/dropdown-menu";
import { Link, useRouter } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";

import { useMe } from "@/hooks/useMe";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
	const { signIn, signOut } = useAuthActions();
	const router = useRouter();
	const user = useMe();
	const onSignIn = () => {
		signIn("kakao", {
			redirectTo: router.latestLocation.href,
		});
	};
	const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
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
				<div className="flex items-center gap-2">
					<Authenticated>
						{user?.name}
						<DropdownMenu>
							<DropdownMenuTrigger>
								<img
									src={user?.image}
									alt={user?.name}
									className="w-10 h-10 rounded-full"
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>dkdkd</DropdownMenuItem>
								<DropdownMenuItem onClick={handleItemClick}>
									<ThemeToggle />
								</DropdownMenuItem>
								<DropdownMenuItem>
									<button onClick={() => void signOut()} type="button">
										Sign out
									</button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
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
