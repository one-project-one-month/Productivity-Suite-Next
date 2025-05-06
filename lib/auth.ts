import { db } from "@/database/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    user: {
        additionalFields: {
            userName: {
                type: "string",
                fieldName: "user_name",
                required: true,
                input: true,
            },
            password: {
                type: "string",
                fieldName: "password",
                required: true,
                input: true,
            },
        },
    },
});
