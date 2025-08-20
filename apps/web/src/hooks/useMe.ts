import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex-gen/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useMe = () => {
	const { data: user } = useSuspenseQuery(convexQuery(api.me.currentUser, {}));
	return user;
};
