CREATE TABLE `attempt_answers` (
	`id` text PRIMARY KEY NOT NULL,
	`attempt_question_id` text NOT NULL,
	`selected_options_json` text NOT NULL,
	`is_correct` integer,
	`answered_at` text,
	FOREIGN KEY (`attempt_question_id`) REFERENCES `attempt_questions`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "answers_boolean_check" CHECK("attempt_answers"."is_correct" IS NULL OR "attempt_answers"."is_correct" IN (0, 1)),
	CONSTRAINT "answers_json_check" CHECK(json_valid("attempt_answers"."selected_options_json") AND json_type("attempt_answers"."selected_options_json") = 'array')
);
--> statement-breakpoint
CREATE UNIQUE INDEX `answers_question_unique` ON `attempt_answers` (`attempt_question_id`);--> statement-breakpoint
CREATE TABLE `attempt_questions` (
	`id` text PRIMARY KEY NOT NULL,
	`attempt_id` text NOT NULL,
	`exam_version_id` text NOT NULL,
	`question_id` text,
	`ordinal` integer NOT NULL,
	`question_snapshot_json` text NOT NULL,
	`answer_key_snapshot_json` text NOT NULL,
	FOREIGN KEY (`attempt_id`,`exam_version_id`) REFERENCES `exam_attempts`(`id`,`exam_version_id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`question_id`,`exam_version_id`) REFERENCES `questions`(`id`,`exam_version_id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "attempt_questions_ordinal_check" CHECK("attempt_questions"."ordinal" > 0),
	CONSTRAINT "attempt_questions_json_check" CHECK(json_valid("attempt_questions"."question_snapshot_json") AND json_valid("attempt_questions"."answer_key_snapshot_json"))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `attempt_questions_ordinal_unique` ON `attempt_questions` (`attempt_id`,`ordinal`);--> statement-breakpoint
CREATE INDEX `attempt_questions_source_idx` ON `attempt_questions` (`question_id`,`exam_version_id`);--> statement-breakpoint
CREATE TABLE `certifications` (
	`id` text PRIMARY KEY NOT NULL,
	`provider_id` text NOT NULL,
	`code` text NOT NULL,
	`title` text NOT NULL,
	`level` text,
	`status` text DEFAULT 'active' NOT NULL,
	FOREIGN KEY (`provider_id`) REFERENCES `providers`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "certifications_code_normalized" CHECK("certifications"."code" = upper(trim("certifications"."code")) AND length("certifications"."code") > 0),
	CONSTRAINT "certifications_title_nonempty" CHECK(length(trim("certifications"."title")) > 0),
	CONSTRAINT "certifications_status_check" CHECK("certifications"."status" IN ('active', 'archived'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `certifications_provider_code_unique` ON `certifications` (`provider_id`,`code`);--> statement-breakpoint
CREATE INDEX `certifications_provider_idx` ON `certifications` (`provider_id`);--> statement-breakpoint
CREATE TABLE `exam_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`exam_version_id` text NOT NULL,
	`mode` text NOT NULL,
	`status` text DEFAULT 'in_progress' NOT NULL,
	`started_at` text NOT NULL,
	`submitted_at` text,
	`correct_count` integer,
	`graded_count` integer,
	FOREIGN KEY (`exam_version_id`) REFERENCES `exam_versions`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "attempts_mode_check" CHECK("exam_attempts"."mode" IN ('practice', 'timed')),
	CONSTRAINT "attempts_state_check" CHECK(("exam_attempts"."status" = 'in_progress' AND "exam_attempts"."submitted_at" IS NULL AND "exam_attempts"."correct_count" IS NULL AND "exam_attempts"."graded_count" IS NULL) OR ("exam_attempts"."status" = 'submitted' AND "exam_attempts"."submitted_at" IS NOT NULL AND "exam_attempts"."correct_count" IS NOT NULL AND "exam_attempts"."graded_count" IS NOT NULL AND "exam_attempts"."graded_count" > 0 AND "exam_attempts"."correct_count" BETWEEN 0 AND "exam_attempts"."graded_count" AND "exam_attempts"."submitted_at" >= "exam_attempts"."started_at"))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `attempts_id_version_unique` ON `exam_attempts` (`id`,`exam_version_id`);--> statement-breakpoint
CREATE INDEX `attempts_version_started_idx` ON `exam_attempts` (`exam_version_id`,`started_at`);--> statement-breakpoint
CREATE TABLE `exam_domains` (
	`id` text PRIMARY KEY NOT NULL,
	`exam_version_id` text NOT NULL,
	`title` text NOT NULL,
	`weight_min` integer,
	`weight_max` integer,
	`sort_order` integer NOT NULL,
	FOREIGN KEY (`exam_version_id`) REFERENCES `exam_versions`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "domains_weights_check" CHECK(("exam_domains"."weight_min" IS NULL OR "exam_domains"."weight_min" BETWEEN 0 AND 100) AND ("exam_domains"."weight_max" IS NULL OR "exam_domains"."weight_max" BETWEEN 0 AND 100) AND ("exam_domains"."weight_min" IS NULL OR "exam_domains"."weight_max" IS NULL OR "exam_domains"."weight_min" <= "exam_domains"."weight_max")),
	CONSTRAINT "domains_order_check" CHECK("exam_domains"."sort_order" >= 0),
	CONSTRAINT "domains_title_nonempty" CHECK(length(trim("exam_domains"."title")) > 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `domains_version_order_unique` ON `exam_domains` (`exam_version_id`,`sort_order`);--> statement-breakpoint
CREATE UNIQUE INDEX `domains_id_version_unique` ON `exam_domains` (`id`,`exam_version_id`);--> statement-breakpoint
CREATE TABLE `exam_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`certification_id` text NOT NULL,
	`label` text NOT NULL,
	`effective_from` text,
	`retired_at` text,
	`official_url` text,
	`verified_at` text,
	`status` text DEFAULT 'draft' NOT NULL,
	FOREIGN KEY (`certification_id`) REFERENCES `certifications`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "versions_status_check" CHECK("exam_versions"."status" IN ('draft', 'active', 'retired')),
	CONSTRAINT "versions_label_nonempty" CHECK(length(trim("exam_versions"."label")) > 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `versions_certification_label_unique` ON `exam_versions` (`certification_id`,`label`);--> statement-breakpoint
CREATE UNIQUE INDEX `versions_id_certification_unique` ON `exam_versions` (`id`,`certification_id`);--> statement-breakpoint
CREATE TABLE `learning_resources` (
	`id` text PRIMARY KEY NOT NULL,
	`certification_id` text,
	`exam_version_id` text,
	`domain_id` text,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`kind` text NOT NULL,
	`verified_at` text,
	FOREIGN KEY (`certification_id`) REFERENCES `certifications`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`exam_version_id`) REFERENCES `exam_versions`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`domain_id`) REFERENCES `exam_domains`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "resources_one_scope" CHECK(("learning_resources"."certification_id" IS NOT NULL) + ("learning_resources"."exam_version_id" IS NOT NULL) + ("learning_resources"."domain_id" IS NOT NULL) = 1),
	CONSTRAINT "resources_kind_check" CHECK("learning_resources"."kind" IN ('documentation', 'course', 'lab', 'other'))
);
--> statement-breakpoint
CREATE INDEX `resources_certification_idx` ON `learning_resources` (`certification_id`);--> statement-breakpoint
CREATE INDEX `resources_version_idx` ON `learning_resources` (`exam_version_id`);--> statement-breakpoint
CREATE INDEX `resources_domain_idx` ON `learning_resources` (`domain_id`);--> statement-breakpoint
CREATE TABLE `providers` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	CONSTRAINT "providers_name_nonempty" CHECK(length(trim("providers"."name")) > 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `providers_slug_unique` ON `providers` (`slug`);--> statement-breakpoint
CREATE TABLE `question_options` (
	`id` text PRIMARY KEY NOT NULL,
	`question_id` text NOT NULL,
	`body` text NOT NULL,
	`is_correct` integer NOT NULL,
	`sort_order` integer NOT NULL,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "options_boolean_check" CHECK("question_options"."is_correct" IN (0, 1)),
	CONSTRAINT "options_order_check" CHECK("question_options"."sort_order" >= 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `options_question_order_unique` ON `question_options` (`question_id`,`sort_order`);--> statement-breakpoint
CREATE TABLE `questions` (
	`id` text PRIMARY KEY NOT NULL,
	`exam_version_id` text NOT NULL,
	`domain_id` text NOT NULL,
	`stem` text NOT NULL,
	`explanation` text NOT NULL,
	`question_type` text NOT NULL,
	`review_status` text DEFAULT 'draft' NOT NULL,
	`source_url` text,
	`verified_at` text,
	FOREIGN KEY (`exam_version_id`) REFERENCES `exam_versions`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`domain_id`,`exam_version_id`) REFERENCES `exam_domains`(`id`,`exam_version_id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "questions_type_check" CHECK("questions"."question_type" IN ('single', 'multiple')),
	CONSTRAINT "questions_review_check" CHECK("questions"."review_status" IN ('draft', 'reviewed', 'published', 'archived')),
	CONSTRAINT "questions_content_check" CHECK(length(trim("questions"."stem")) > 0 AND length(trim("questions"."explanation")) > 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `questions_id_version_unique` ON `questions` (`id`,`exam_version_id`);--> statement-breakpoint
CREATE INDEX `questions_version_review_idx` ON `questions` (`exam_version_id`,`review_status`);--> statement-breakpoint
CREATE INDEX `questions_domain_idx` ON `questions` (`domain_id`,`exam_version_id`);--> statement-breakpoint
CREATE TABLE `study_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`certification_id` text NOT NULL,
	`exam_version_id` text,
	`name` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`timezone` text NOT NULL,
	`status` text DEFAULT 'planned' NOT NULL,
	FOREIGN KEY (`certification_id`) REFERENCES `certifications`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`exam_version_id`,`certification_id`) REFERENCES `exam_versions`(`id`,`certification_id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "plans_dates_check" CHECK("study_plans"."start_date" GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]' AND "study_plans"."end_date" GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]' AND "study_plans"."start_date" <= "study_plans"."end_date"),
	CONSTRAINT "plans_status_check" CHECK("study_plans"."status" IN ('planned', 'active', 'completed', 'archived'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `plans_id_version_unique` ON `study_plans` (`id`,`exam_version_id`);--> statement-breakpoint
CREATE INDEX `plans_certification_idx` ON `study_plans` (`certification_id`);--> statement-breakpoint
CREATE INDEX `plans_version_idx` ON `study_plans` (`exam_version_id`);--> statement-breakpoint
CREATE TABLE `study_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`study_plan_id` text NOT NULL,
	`exam_version_id` text,
	`exam_domain_id` text,
	`title` text NOT NULL,
	`due_date` text NOT NULL,
	`estimated_minutes` integer,
	`actual_minutes` integer,
	`status` text DEFAULT 'not_started' NOT NULL,
	`resource_id` text,
	`notes` text,
	FOREIGN KEY (`study_plan_id`) REFERENCES `study_plans`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`resource_id`) REFERENCES `learning_resources`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`study_plan_id`,`exam_version_id`) REFERENCES `study_plans`(`id`,`exam_version_id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`exam_domain_id`,`exam_version_id`) REFERENCES `exam_domains`(`id`,`exam_version_id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "tasks_domain_version_check" CHECK("study_tasks"."exam_domain_id" IS NULL OR "study_tasks"."exam_version_id" IS NOT NULL),
	CONSTRAINT "tasks_minutes_check" CHECK(("study_tasks"."estimated_minutes" IS NULL OR "study_tasks"."estimated_minutes" >= 0) AND ("study_tasks"."actual_minutes" IS NULL OR "study_tasks"."actual_minutes" >= 0)),
	CONSTRAINT "tasks_status_check" CHECK("study_tasks"."status" IN ('not_started', 'in_progress', 'completed')),
	CONSTRAINT "tasks_date_check" CHECK("study_tasks"."due_date" GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]')
);
--> statement-breakpoint
CREATE INDEX `tasks_plan_due_idx` ON `study_tasks` (`study_plan_id`,`due_date`);--> statement-breakpoint
CREATE INDEX `tasks_domain_idx` ON `study_tasks` (`exam_domain_id`,`exam_version_id`);--> statement-breakpoint
CREATE INDEX `tasks_resource_idx` ON `study_tasks` (`resource_id`);