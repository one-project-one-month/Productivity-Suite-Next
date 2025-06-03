CREATE TYPE "public"."todo_priority" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'IMPORTANT');--> statement-breakpoint
DROP TABLE "todo" CASCADE;--> statement-breakpoint
DROP TYPE "public"."todo_status_enum";--> statement-breakpoint
CREATE TYPE "public"."todo_status_enum" AS ENUM('PENDING', 'COMPLETE');