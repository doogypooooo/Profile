import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// 사용자 테이블
export const users = sqliteTable("users", {
  id: integer("id").primaryKey().notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(), 
  isAdmin: integer("is_admin", { mode: "boolean" }).default(0),
  createdAt: text("created_at").default(new Date().toLocaleString('sv-SE')),
});


export type User = typeof users.$inferSelect;

// 개인정보 테이블
export const personalInfos = sqliteTable("personal_info", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  experience: text("experience").notNull(),
  desiredSalary: text("desired_salary").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(), 
  location: text("location").notNull(),
  military: text("military").notNull(),
  introduction: text("introduction"), 
  createdAt: text("created_at").default(new Date().toLocaleString('sv-SE')),
  updatedAt: text("updated_at").default(new Date().toLocaleString('sv-SE')),
});

export type InsertPersonalInfo = typeof personalInfos.$inferInsert;
export type PersonalInfo = typeof personalInfos.$inferSelect;

// 희망 조건 테이블
export const desiredConditions = sqliteTable("desired_conditions", {
  id: integer("id").primaryKey().notNull(),
  field: text("field").notNull(),
  employmentType: text("employment_type").notNull(),
  location: text("location").notNull(),
  createdAt: text("created_at").default(new Date().toLocaleString('sv-SE')),
  updatedAt: text("updated_at").default(new Date().toLocaleString('sv-SE')),
});

export type InsertDesiredCondition = typeof desiredConditions.$inferInsert;
export type DesiredCondition = typeof desiredConditions.$inferSelect;

// 스킬 테이블
export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey().notNull(),
  category: text("category").notNull(), // programming, server, game, mobile
  name: text("name").notNull(),
  level: text('level').notNull(),
  createdAt: text("created_at").default(new Date().toLocaleString('sv-SE')),
  updatedAt: text("updated_at").default(new Date().toLocaleString('sv-SE')),
});

export type InsertSkill = typeof skills.$inferInsert;
export type Skill = typeof skills.$inferSelect;

// 키워드 테이블
export const keywords = sqliteTable("keywords", {
  id: integer("id").primaryKey().notNull(),
  keyword: text("keyword").notNull(),
  createdAt: text("created_at").default(new Date().toLocaleString('sv-SE')),
  updatedAt: text("updated_at").default(new Date().toLocaleString('sv-SE')), 
});

export type InsertKeyword = typeof keywords.$inferInsert;
export type Keyword = typeof keywords.$inferSelect;

// 경력 테이블
export const experiences = sqliteTable("experiences", {
  id: integer("id").primaryKey().notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  period: text("period").notNull(),
  salary: text("salary").notNull(),
  project: text("project"),
  achievements: text("achievements"), 
  technologies: text("technologies"), 
  order: integer("order").notNull(), 
  createdAt: text("created_at").default(new Date().toLocaleString('sv-SE')),
  updatedAt: text("updated_at").default(new Date().toLocaleString('sv-SE')),
});

export const experiencesRelations = relations(experiences, ({ one }) => ({
  user: one(users, {
    fields: [experiences.userId],
    references: [users.id],
  }),
}));

export type InsertExperience = typeof experiences.$inferInsert;
export type Experience = typeof experiences.$inferSelect;

// 교육 테이블
export const educations = sqliteTable("educations", {
  id: integer("id").primaryKey().notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  institution: text("institution").notNull(),
  type: text('type').notNull(),
  period: text("period").notNull(), 
  department: text("department"), 
  major: text("major"),
  location: text("location").default(""),
  order: integer("order").notNull(),  
  createdAt: text("created_at").default(new Date().toLocaleString('sv-SE')),
  updatedAt: text("updated_at").default(new Date().toLocaleString('sv-SE')),
  });

export const educationsRelations = relations(educations, ({ one }) => ({
  user: one(users, {
    fields: [educations.userId],
    references: [users.id],
  }),
}));

export type InsertEducation = typeof educations.$inferInsert;
export type Education = typeof educations.$inferSelect;

// 프로젝트 테이블
export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey().notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies"), 
  imagePath: text("image_path").notNull().default("/assets/projects/project-placeholder.svg"),
  createdAt: text("created_at").default(new Date().toLocaleString('sv-SE')),
  updatedAt: text("updated_at").default(new Date().toLocaleString('sv-SE')),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));


export type InsertProject = typeof projects.$inferInsert;
export type Project = typeof projects.$inferSelect;

// relation export
export const usersRelations = relations(users, ({ many }) => ({
  educations: many(educations),
  experiences: many(experiences), 
  projects: many(projects),
}));

