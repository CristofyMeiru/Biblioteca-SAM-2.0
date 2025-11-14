CREATE TYPE "public"."week_day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');--> statement-breakpoint
CREATE TABLE "attendance_records" (
	"id" uuid PRIMARY KEY NOT NULL,
	"week_day" "week_day" NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_attendance_day" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"week_day" "week_day" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_attendance" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"attendance_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_attendance" ADD CONSTRAINT "user_attendance_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_attendance" ADD CONSTRAINT "user_attendance_attendance_id_attendance_records_id_fk" FOREIGN KEY ("attendance_id") REFERENCES "public"."attendance_records"("id") ON DELETE cascade ON UPDATE cascade;

ALTER TABLE "user_attendance_day"
  DROP CONSTRAINT IF EXISTS user_attendance_day_user_id_user_id_fk;

ALTER TABLE "user_attendance_day"
  ADD CONSTRAINT user_attendance_day_user_id_user_id_fk
  FOREIGN KEY (user_id) REFERENCES "user"(id)
  ON DELETE CASCADE ON UPDATE CASCADE;