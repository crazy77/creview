import Kakao from "@auth/core/providers/kakao";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		Kakao({
			profile(profile) {
				return {
					id: `kakao_${profile.id}`,
					name: profile.properties.nickname,
					image: profile.properties.profile_image,
				};
			},
		}),
	],
});
