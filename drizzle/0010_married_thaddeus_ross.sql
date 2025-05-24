CREATE TABLE "user_category" (
	"user_id" text NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "user_category_category_id_user_id_pk" PRIMARY KEY("category_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "user_category" ADD CONSTRAINT "user_category_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_category" ADD CONSTRAINT "user_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;