ALTER TABLE "transaction" RENAME COLUMN "category_id" TO "budget_id";--> statement-breakpoint
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_category_id_category_id_fk";
--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_budget_id_budget_id_fk" FOREIGN KEY ("budget_id") REFERENCES "public"."budget"("id") ON DELETE no action ON UPDATE no action;