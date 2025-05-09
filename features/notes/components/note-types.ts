import { z } from "zod";

  export const linkSchema = z.object({
    url: z.string().min(1, {message: "required"}).url({message: "invalid URL"}),
  });
  export type TLinkSchema = z.infer<typeof linkSchema>;