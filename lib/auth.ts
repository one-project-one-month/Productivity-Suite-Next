import { db } from "@/database/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/database/auth-schema";
import { resend } from "@/lib/resend";
import SingUpVerificationTemplate from "@/components/resend/sing-up-verification-template";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  // auth setup email and password
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "ProductSuit <noti@noti.pale-edelweiss.tech>",
        to: user.email,
        subject: "Email Verification",
        react: SingUpVerificationTemplate({ url, name: user.name }),
      });
    },
  },
});
