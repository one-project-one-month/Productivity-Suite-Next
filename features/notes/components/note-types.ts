import { notes } from "@/database/schema";
import { z } from "zod";

export const linkSchema = z.object({
  // url: z.string().min(1, {message: "required"}).url({message: "invalid URL"}),
  url: z
    .string()
    .refine(
      (value) =>
        /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value),
      {
        message: "Invalid URL",
      },
    ),
});
export type TLinkSchema = z.infer<typeof linkSchema>;

export type TNoteType = {
  id: string;
  title: string;
  body: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};

export type INoteType = typeof notes.$inferInsert;
