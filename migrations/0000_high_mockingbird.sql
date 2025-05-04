CREATE TABLE `desired_conditions` (
	`id` integer PRIMARY KEY NOT NULL,
	`field` text NOT NULL,
	`employment_type` text NOT NULL,
	`location` text NOT NULL,
	`created_at` text DEFAULT '2025-05-04 08:31:34',
	`updated_at` text DEFAULT '2025-05-04 08:31:34'
);
--> statement-breakpoint
CREATE TABLE `educations` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`institution` text NOT NULL,
	`type` text NOT NULL,
	`period` text NOT NULL,
	`department` text,
	`major` text,
	`location` text DEFAULT '',
	`order` integer NOT NULL,
	`created_at` text DEFAULT '2025-05-04 08:31:34',
	`updated_at` text DEFAULT '2025-05-04 08:31:34',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `experiences` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`company` text NOT NULL,
	`position` text NOT NULL,
	`period` text NOT NULL,
	`salary` text NOT NULL,
	`project` text,
	`achievements` text,
	`technologies` text,
	`order` integer NOT NULL,
	`created_at` text DEFAULT '2025-05-04 08:31:34',
	`updated_at` text DEFAULT '2025-05-04 08:31:34',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `keywords` (
	`id` integer PRIMARY KEY NOT NULL,
	`keyword` text NOT NULL,
	`created_at` text DEFAULT '2025-05-04 08:31:34',
	`updated_at` text DEFAULT '2025-05-04 08:31:34'
);
--> statement-breakpoint
CREATE TABLE `personal_info` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`experience` text NOT NULL,
	`desired_salary` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`location` text NOT NULL,
	`military` text NOT NULL,
	`introduction` text,
	`created_at` text DEFAULT '2025-05-04 08:31:34',
	`updated_at` text DEFAULT '2025-05-04 08:31:34'
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`company` text NOT NULL,
	`period` text NOT NULL,
	`description` text NOT NULL,
	`technologies` text,
	`image_path` text DEFAULT '/assets/projects/project-placeholder.svg' NOT NULL,
	`created_at` text DEFAULT '2025-05-04 08:31:34',
	`updated_at` text DEFAULT '2025-05-04 08:31:34',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` integer PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`name` text NOT NULL,
	`level` text NOT NULL,
	`created_at` text DEFAULT '2025-05-04 08:31:34',
	`updated_at` text DEFAULT '2025-05-04 08:31:34'
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`is_admin` integer DEFAULT 0,
	`created_at` text DEFAULT '2025-05-04 08:31:34'
);
