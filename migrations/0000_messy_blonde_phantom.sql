DO $$ BEGIN
 CREATE TYPE "status_list" AS ENUM('completed', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama" varchar NOT NULL,
	"catatan" text,
	"gambar_url" text,
	"id_kategori" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kategoris" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama_kategori" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_list" integer NOT NULL,
	"id_item" integer NOT NULL,
	"jumlah" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lists" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama_list" varchar NOT NULL,
	"status_list" status_list DEFAULT 'completed' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "items" ADD CONSTRAINT "items_id_kategori_kategoris_id_fk" FOREIGN KEY ("id_kategori") REFERENCES "kategoris"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_item" ADD CONSTRAINT "list_item_id_list_lists_id_fk" FOREIGN KEY ("id_list") REFERENCES "lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_item" ADD CONSTRAINT "list_item_id_item_items_id_fk" FOREIGN KEY ("id_item") REFERENCES "items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
