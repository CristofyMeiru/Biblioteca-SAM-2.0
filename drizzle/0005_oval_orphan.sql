CREATE TYPE "public"."book_loans_status" AS ENUM('ACTIVE', 'INACTIVE', 'RETURNED', 'LATE', 'CANCELED', 'LOST');--> statement-breakpoint
ALTER TABLE "book_loans" RENAME COLUMN "enrollment" TO "roll_number";--> statement-breakpoint
ALTER TABLE "book_loans" ADD COLUMN "loan_date" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "book_loans" ADD COLUMN "due_date" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "book_loans" ADD COLUMN "return_date" timestamp;--> statement-breakpoint
ALTER TABLE "book_loans" ADD COLUMN "status" "book_loans_status" DEFAULT 'ACTIVE' NOT NULL;--> statement-breakpoint
ALTER TABLE "book_loans" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "book_loans" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;