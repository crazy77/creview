// convex/schema.ts
import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	...authTables,
	tasks: defineTable({
		text: v.string(),
		isCompleted: v.boolean(),
	}).index("by_text", ["text"]),
});
