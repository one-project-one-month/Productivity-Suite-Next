CREATE TYPE "public"."todo_status_enum" AS ENUM('PENDING', 'COMPLETE', 'OVERDUE');--> statement-breakpoint
CREATE TABLE "todo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"user_id" text NOT NULL,
	"status" "todo_status_enum" DEFAULT 'PENDING' NOT NULL,
	"priority" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"due_at" timestamp with time zone,
	CONSTRAINT "todo_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "todo" ADD CONSTRAINT "todo_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;