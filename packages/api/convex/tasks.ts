import { query } from "./_generated/server";

export const get = query({
	handler: async (ctx) => {
		const result = await ctx.db.query("tasks").collect();
		console.log(result);
		return result;
	},
});
