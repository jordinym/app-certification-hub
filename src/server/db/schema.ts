import { sql } from "drizzle-orm";
import { check, foreignKey, index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const providers = sqliteTable("providers", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
}, (t) => [uniqueIndex("providers_slug_unique").on(t.slug), check("providers_name_nonempty", sql`length(trim(${t.name})) > 0`)]);

export const certifications = sqliteTable("certifications", {
  id: text("id").primaryKey(),
  providerId: text("provider_id").notNull().references(() => providers.id, { onDelete: "restrict" }),
  code: text("code").notNull(),
  title: text("title").notNull(),
  level: text("level"),
  status: text("status", { enum: ["active", "archived"] }).notNull().default("active"),
}, (t) => [
  uniqueIndex("certifications_provider_code_unique").on(t.providerId, t.code),
  index("certifications_provider_idx").on(t.providerId),
  check("certifications_code_normalized", sql`${t.code} = upper(trim(${t.code})) AND length(${t.code}) > 0`),
  check("certifications_title_nonempty", sql`length(trim(${t.title})) > 0`),
  check("certifications_status_check", sql`${t.status} IN ('active', 'archived')`),
]);


export const examVersions = sqliteTable("exam_versions", {
  id: text("id").primaryKey(),
  certificationId: text("certification_id").notNull().references(() => certifications.id, { onDelete: "restrict" }),
  label: text("label").notNull(),
  effectiveFrom: text("effective_from"),
  retiredAt: text("retired_at"),
  officialUrl: text("official_url"),
  verifiedAt: text("verified_at"),
  status: text("status", { enum: ["draft", "active", "retired"] }).notNull().default("draft"),
}, (t) => [
  uniqueIndex("versions_certification_label_unique").on(t.certificationId, t.label),
  uniqueIndex("versions_id_certification_unique").on(t.id, t.certificationId),
  check("versions_status_check", sql`${t.status} IN ('draft', 'active', 'retired')`),
  check("versions_label_nonempty", sql`length(trim(${t.label})) > 0`),
]);

export const examDomains = sqliteTable("exam_domains", {
  id: text("id").primaryKey(),
  examVersionId: text("exam_version_id").notNull().references(() => examVersions.id, { onDelete: "restrict" }),
  title: text("title").notNull(),
  weightMin: integer("weight_min"),
  weightMax: integer("weight_max"),
  sortOrder: integer("sort_order").notNull(),
}, (t) => [
  uniqueIndex("domains_version_order_unique").on(t.examVersionId, t.sortOrder),
  uniqueIndex("domains_id_version_unique").on(t.id, t.examVersionId),
  check("domains_weights_check", sql`(${t.weightMin} IS NULL OR ${t.weightMin} BETWEEN 0 AND 100) AND (${t.weightMax} IS NULL OR ${t.weightMax} BETWEEN 0 AND 100) AND (${t.weightMin} IS NULL OR ${t.weightMax} IS NULL OR ${t.weightMin} <= ${t.weightMax})`),
  check("domains_order_check", sql`${t.sortOrder} >= 0`),
  check("domains_title_nonempty", sql`length(trim(${t.title})) > 0`),
]);

export const learningResources = sqliteTable("learning_resources", {
  id: text("id").primaryKey(),
  certificationId: text("certification_id").references(() => certifications.id, { onDelete: "restrict" }),
  examVersionId: text("exam_version_id").references(() => examVersions.id, { onDelete: "restrict" }),
  domainId: text("domain_id").references(() => examDomains.id, { onDelete: "restrict" }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  kind: text("kind", { enum: ["documentation", "course", "lab", "other"] }).notNull(),
  verifiedAt: text("verified_at"),
}, (t) => [
  // Exactly one scope; its ancestors are derived by joins, avoiding contradictions.
  check("resources_one_scope", sql`(${t.certificationId} IS NOT NULL) + (${t.examVersionId} IS NOT NULL) + (${t.domainId} IS NOT NULL) = 1`),
  check("resources_kind_check", sql`${t.kind} IN ('documentation', 'course', 'lab', 'other')`),
  index("resources_certification_idx").on(t.certificationId),
  index("resources_version_idx").on(t.examVersionId),
  index("resources_domain_idx").on(t.domainId),
]);

export const studyPlans = sqliteTable("study_plans", {
  id: text("id").primaryKey(),
  certificationId: text("certification_id").notNull().references(() => certifications.id, { onDelete: "restrict" }),
  examVersionId: text("exam_version_id"),
  name: text("name").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  timezone: text("timezone").notNull(),
  status: text("status", { enum: ["planned", "active", "completed", "archived"] }).notNull().default("planned"),
}, (t) => [
  foreignKey({ columns: [t.examVersionId, t.certificationId], foreignColumns: [examVersions.id, examVersions.certificationId] }).onDelete("restrict"),
  uniqueIndex("plans_id_version_unique").on(t.id, t.examVersionId),
  index("plans_certification_idx").on(t.certificationId),
  index("plans_version_idx").on(t.examVersionId),
  check("plans_dates_check", sql`${t.startDate} GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]' AND ${t.endDate} GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]' AND ${t.startDate} <= ${t.endDate}`),
  check("plans_status_check", sql`${t.status} IN ('planned', 'active', 'completed', 'archived')`),
]);

export const studyTasks = sqliteTable("study_tasks", {
  id: text("id").primaryKey(),
  studyPlanId: text("study_plan_id").notNull().references(() => studyPlans.id, { onDelete: "restrict" }),
  // Required when assigning a domain; enforces the plan/domain version match.
  examVersionId: text("exam_version_id"),
  examDomainId: text("exam_domain_id"),
  title: text("title").notNull(),
  dueDate: text("due_date").notNull(),
  estimatedMinutes: integer("estimated_minutes"),
  actualMinutes: integer("actual_minutes"),
  status: text("status", { enum: ["not_started", "in_progress", "completed"] }).notNull().default("not_started"),
  resourceId: text("resource_id").references(() => learningResources.id, { onDelete: "restrict" }),
  notes: text("notes"),
}, (t) => [
  foreignKey({ columns: [t.studyPlanId, t.examVersionId], foreignColumns: [studyPlans.id, studyPlans.examVersionId] }).onDelete("restrict"),
  foreignKey({ columns: [t.examDomainId, t.examVersionId], foreignColumns: [examDomains.id, examDomains.examVersionId] }).onDelete("restrict"),
  check("tasks_domain_version_check", sql`${t.examDomainId} IS NULL OR ${t.examVersionId} IS NOT NULL`),
  check("tasks_minutes_check", sql`(${t.estimatedMinutes} IS NULL OR ${t.estimatedMinutes} >= 0) AND (${t.actualMinutes} IS NULL OR ${t.actualMinutes} >= 0)`),
  check("tasks_status_check", sql`${t.status} IN ('not_started', 'in_progress', 'completed')`),
  check("tasks_date_check", sql`${t.dueDate} GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'`),
  index("tasks_plan_due_idx").on(t.studyPlanId, t.dueDate),
  index("tasks_domain_idx").on(t.examDomainId, t.examVersionId),
  index("tasks_resource_idx").on(t.resourceId),
]);

export const questions = sqliteTable("questions", {
  id: text("id").primaryKey(),
  examVersionId: text("exam_version_id").notNull().references(() => examVersions.id, { onDelete: "restrict" }),
  domainId: text("domain_id").notNull(),
  stem: text("stem").notNull(),
  explanation: text("explanation").notNull(),
  questionType: text("question_type", { enum: ["single", "multiple"] }).notNull(),
  reviewStatus: text("review_status", { enum: ["draft", "reviewed", "published", "archived"] }).notNull().default("draft"),
  sourceUrl: text("source_url"),
  verifiedAt: text("verified_at"),
}, (t) => [
  foreignKey({ columns: [t.domainId, t.examVersionId], foreignColumns: [examDomains.id, examDomains.examVersionId] }).onDelete("restrict"),
  uniqueIndex("questions_id_version_unique").on(t.id, t.examVersionId),
  index("questions_version_review_idx").on(t.examVersionId, t.reviewStatus),
  index("questions_domain_idx").on(t.domainId, t.examVersionId),
  check("questions_type_check", sql`${t.questionType} IN ('single', 'multiple')`),
  check("questions_review_check", sql`${t.reviewStatus} IN ('draft', 'reviewed', 'published', 'archived')`),
  check("questions_content_check", sql`length(trim(${t.stem})) > 0 AND length(trim(${t.explanation})) > 0`),
]);

export const questionOptions = sqliteTable("question_options", {
  id: text("id").primaryKey(),
  questionId: text("question_id").notNull().references(() => questions.id, { onDelete: "restrict" }),
  body: text("body").notNull(),
  isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
  sortOrder: integer("sort_order").notNull(),
}, (t) => [
  uniqueIndex("options_question_order_unique").on(t.questionId, t.sortOrder),
  check("options_boolean_check", sql`${t.isCorrect} IN (0, 1)`),
  check("options_order_check", sql`${t.sortOrder} >= 0`),
]);

export const examAttempts = sqliteTable("exam_attempts", {
  id: text("id").primaryKey(),
  examVersionId: text("exam_version_id").notNull().references(() => examVersions.id, { onDelete: "restrict" }),
  mode: text("mode", { enum: ["practice", "timed"] }).notNull(),
  status: text("status", { enum: ["in_progress", "submitted"] }).notNull().default("in_progress"),
  startedAt: text("started_at").notNull(),
  submittedAt: text("submitted_at"),
  correctCount: integer("correct_count"),
  gradedCount: integer("graded_count"),
}, (t) => [
  uniqueIndex("attempts_id_version_unique").on(t.id, t.examVersionId),
  index("attempts_version_started_idx").on(t.examVersionId, t.startedAt),
  check("attempts_mode_check", sql`${t.mode} IN ('practice', 'timed')`),
  check("attempts_state_check", sql`(${t.status} = 'in_progress' AND ${t.submittedAt} IS NULL AND ${t.correctCount} IS NULL AND ${t.gradedCount} IS NULL) OR (${t.status} = 'submitted' AND ${t.submittedAt} IS NOT NULL AND ${t.correctCount} IS NOT NULL AND ${t.gradedCount} IS NOT NULL AND ${t.gradedCount} > 0 AND ${t.correctCount} BETWEEN 0 AND ${t.gradedCount} AND ${t.submittedAt} >= ${t.startedAt})`),
]);

export const attemptQuestions = sqliteTable("attempt_questions", {
  id: text("id").primaryKey(),
  attemptId: text("attempt_id").notNull(),
  examVersionId: text("exam_version_id").notNull(),
  questionId: text("question_id"),
  ordinal: integer("ordinal").notNull(),
  questionSnapshotJson: text("question_snapshot_json").notNull(),
  answerKeySnapshotJson: text("answer_key_snapshot_json").notNull(),
}, (t) => [
  foreignKey({ columns: [t.attemptId, t.examVersionId], foreignColumns: [examAttempts.id, examAttempts.examVersionId] }).onDelete("restrict"),
  foreignKey({ columns: [t.questionId, t.examVersionId], foreignColumns: [questions.id, questions.examVersionId] }).onDelete("restrict"),
  uniqueIndex("attempt_questions_ordinal_unique").on(t.attemptId, t.ordinal),
  index("attempt_questions_source_idx").on(t.questionId, t.examVersionId),
  check("attempt_questions_ordinal_check", sql`${t.ordinal} > 0`),
  check("attempt_questions_json_check", sql`json_valid(${t.questionSnapshotJson}) AND json_valid(${t.answerKeySnapshotJson})`),
]);

export const attemptAnswers = sqliteTable("attempt_answers", {
  id: text("id").primaryKey(),
  attemptQuestionId: text("attempt_question_id").notNull().references(() => attemptQuestions.id, { onDelete: "restrict" }),
  selectedOptionsJson: text("selected_options_json").notNull(),
  isCorrect: integer("is_correct", { mode: "boolean" }),
  answeredAt: text("answered_at"),
}, (t) => [
  uniqueIndex("answers_question_unique").on(t.attemptQuestionId),
  check("answers_boolean_check", sql`${t.isCorrect} IS NULL OR ${t.isCorrect} IN (0, 1)`),
  check("answers_json_check", sql`json_valid(${t.selectedOptionsJson}) AND json_type(${t.selectedOptionsJson}) = 'array'`),
]);
