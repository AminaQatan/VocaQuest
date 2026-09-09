CREATE TABLE `profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `runs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`unit` integer NOT NULL,
	`mode` text NOT NULL,
	`question_ids` text NOT NULL,
	`answers` text,
	`score` integer,
	`writing` text,
	`feedback` text,
	`rubric` text,
	`teacher_comment` text,
	`created_at` text NOT NULL,
	`completed_at` text
);
--> statement-breakpoint
CREATE INDEX `idx_runs_user_completed` ON `runs` (`user_id`,`completed_at`);--> statement-breakpoint
CREATE INDEX `idx_runs_completed` ON `runs` (`completed_at`);