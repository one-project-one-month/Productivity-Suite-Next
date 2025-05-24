ALTER TABLE "budget" ALTER COLUMN "duration_from" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "budget" ALTER COLUMN "currency" SET DEFAULT 'USD';