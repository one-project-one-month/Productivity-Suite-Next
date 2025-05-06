"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
    return await auth.api.getSession({
        headers: await headers(),
    });
};
