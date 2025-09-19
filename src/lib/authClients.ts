import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, usernameClient } from "better-auth/client/plugins";
import z from "zod";
import { auth } from "./auth";
const string = '';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  plugins: [
    usernameClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});

