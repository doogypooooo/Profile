import { users, projects, educations, experiences, personalInfos, desiredConditions, skills, keywords } from "@shared/schema";
import type { User, InsertUser, Project, InsertProject, Education, InsertEducation, Experience, InsertExperience, PersonalInfo, InsertPersonalInfo, DesiredCondition, InsertDesiredCondition, Skill, InsertSkill, Keyword, InsertKeyword } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // 유저 관련 함수
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // 프로젝트 관련 함수
  getProject(id: number): Promise<Project | undefined>;
  getProjects(): Promise<Project[]>;
  getProjectsByUserId(userId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // 교육 관련 함수
  getEducation(id: number): Promise<Education | undefined>;
  getEducations(): Promise<Education[]>;
  getEducationsByUserId(userId: number): Promise<Education[]>;
  createEducation(education: InsertEducation): Promise<Education>;
  updateEducation(id: number, education: Partial<InsertEducation>): Promise<Education | undefined>;
  deleteEducation(id: number): Promise<boolean>;
  
  // 경력 관련 함수
  getExperience(id: number): Promise<Experience | undefined>;
  getExperiences(): Promise<Experience[]>;
  getExperiencesByUserId(userId: number): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;
  
  // 개인정보 관련 함수
  getPersonalInfo(id: number): Promise<PersonalInfo | undefined>;
  getPersonalInfos(): Promise<PersonalInfo[]>;
  getLastPersonalInfo(): Promise<PersonalInfo | undefined>;
  createPersonalInfo(personalInfo: InsertPersonalInfo): Promise<PersonalInfo>;
  updatePersonalInfo(id: number, personalInfo: Partial<InsertPersonalInfo>): Promise<PersonalInfo | undefined>;
  
  // 희망조건 관련 함수
  getDesiredCondition(id: number): Promise<DesiredCondition | undefined>;
  getDesiredConditions(): Promise<DesiredCondition[]>;
  getLastDesiredCondition(): Promise<DesiredCondition | undefined>;
  createDesiredCondition(desiredCondition: InsertDesiredCondition): Promise<DesiredCondition>;
  updateDesiredCondition(id: number, desiredCondition: Partial<InsertDesiredCondition>): Promise<DesiredCondition | undefined>;
  
  // 스킬 관련 함수
  getSkill(id: number): Promise<Skill | undefined>;
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // 키워드 관련 함수
  getKeyword(id: number): Promise<Keyword | undefined>;
  getKeywords(): Promise<Keyword[]>;
  createKeyword(keyword: InsertKeyword): Promise<Keyword>;
  deleteKeyword(id: number): Promise<boolean>;
  
}

export class DatabaseStorage implements IStorage {
  
  // 유저 관련 함수 구현
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // 프로젝트 관련 함수 구현
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.order);
  }
  
  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return await db.select().from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(projects.order);
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db.update(projects)
      .set({...project, updatedAt: new Date()})
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return true;
  }
  
  // 교육 관련 함수 구현
  async getEducation(id: number): Promise<Education | undefined> {
    const [education] = await db.select().from(educations).where(eq(educations.id, id));
    return education;
  }
  
  async getEducations(): Promise<Education[]> {
    return await db.select().from(educations).orderBy(educations.order);
  }
  
  async getEducationsByUserId(userId: number): Promise<Education[]> {
    return await db.select().from(educations)
      .where(eq(educations.userId, userId))
      .orderBy(educations.order);
  }
  
  async createEducation(education: InsertEducation): Promise<Education> {
    const [newEducation] = await db.insert(educations).values(education).returning();
    return newEducation;
  }
  
  async updateEducation(id: number, education: Partial<InsertEducation>): Promise<Education | undefined> {
    const [updatedEducation] = await db.update(educations)
      .set({...education, updatedAt: new Date()})
      .where(eq(educations.id, id))
      .returning();
    return updatedEducation;
  }
  
  async deleteEducation(id: number): Promise<boolean> {
    await db.delete(educations).where(eq(educations.id, id));
    return true;
  }
  
  // 경력 관련 함수 구현
  async getExperience(id: number): Promise<Experience | undefined> {
    const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
    return experience;
  }
  
  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(experiences.order);
  }
  
  async getExperiencesByUserId(userId: number): Promise<Experience[]> {
    return await db.select().from(experiences)
      .where(eq(experiences.userId, userId))
      .orderBy(experiences.order);
  }
  
  async createExperience(experience: InsertExperience): Promise<Experience> {
    const [newExperience] = await db.insert(experiences).values(experience).returning();
    return newExperience;
  }
  
  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const [updatedExperience] = await db.update(experiences)
      .set({...experience, updatedAt: new Date()})
      .where(eq(experiences.id, id))
      .returning();
    return updatedExperience;
  }
  
  async deleteExperience(id: number): Promise<boolean> {
    await db.delete(experiences).where(eq(experiences.id, id));
    return true;
  }
  
  // 개인정보 관련 함수 구현
  async getPersonalInfo(id: number): Promise<PersonalInfo | undefined> {
    const [personalInfo] = await db.select().from(personalInfos).where(eq(personalInfos.id, id));
    return personalInfo;
  }
  
  async getPersonalInfos(): Promise<PersonalInfo[]> {
    return await db.select().from(personalInfos);
  }
  
  async getLastPersonalInfo(): Promise<PersonalInfo | undefined> {
    const [personalInfo] = await db.select().from(personalInfos).orderBy(desc(personalInfos.id)).limit(1);
    return personalInfo;
  }
  
  async createPersonalInfo(personalInfo: InsertPersonalInfo): Promise<PersonalInfo> {
    const [newPersonalInfo] = await db.insert(personalInfos).values(personalInfo).returning();
    return newPersonalInfo;
  }
  
  async updatePersonalInfo(id: number, personalInfo: Partial<InsertPersonalInfo>): Promise<PersonalInfo | undefined> {
    const [updatedPersonalInfo] = await db.update(personalInfos)
      .set({...personalInfo, updatedAt: new Date()})
      .where(eq(personalInfos.id, id))
      .returning();
    return updatedPersonalInfo;
  }
  
  // 희망조건 관련 함수 구현
  async getDesiredCondition(id: number): Promise<DesiredCondition | undefined> {
    const [desiredCondition] = await db.select().from(desiredConditions).where(eq(desiredConditions.id, id));
    return desiredCondition;
  }
  
  async getDesiredConditions(): Promise<DesiredCondition[]> {
    return await db.select().from(desiredConditions);
  }
  
  async getLastDesiredCondition(): Promise<DesiredCondition | undefined> {
    const [desiredCondition] = await db.select().from(desiredConditions).orderBy(desc(desiredConditions.id)).limit(1);
    return desiredCondition;
  }
  
  async createDesiredCondition(desiredCondition: InsertDesiredCondition): Promise<DesiredCondition> {
    const [newDesiredCondition] = await db.insert(desiredConditions).values(desiredCondition).returning();
    return newDesiredCondition;
  }
  
  async updateDesiredCondition(id: number, desiredCondition: Partial<InsertDesiredCondition>): Promise<DesiredCondition | undefined> {
    const [updatedDesiredCondition] = await db.update(desiredConditions)
      .set({...desiredCondition, updatedAt: new Date()})
      .where(eq(desiredConditions.id, id))
      .returning();
    return updatedDesiredCondition;
  }
  
  // 스킬 관련 함수 구현
  async getSkill(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select().from(skills).where(eq(skills.id, id));
    return skill;
  }
  
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }
  
  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return await db.select().from(skills).where(eq(skills.category, category));
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }
  
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updatedSkill] = await db.update(skills)
      .set({...skill, updatedAt: new Date()})
      .where(eq(skills.id, id))
      .returning();
    return updatedSkill;
  }
  
  async deleteSkill(id: number): Promise<boolean> {
    await db.delete(skills).where(eq(skills.id, id));
    return true;
  }
  
  // 키워드 관련 함수 구현
  async getKeyword(id: number): Promise<Keyword | undefined> {
    const [keyword] = await db.select().from(keywords).where(eq(keywords.id, id));
    return keyword;
  }
  
  async getKeywords(): Promise<Keyword[]> {
    return await db.select().from(keywords);
  }
  
  async createKeyword(keyword: InsertKeyword): Promise<Keyword> {
    const [newKeyword] = await db.insert(keywords).values(keyword).returning();
    return newKeyword;
  }
  
  async deleteKeyword(id: number): Promise<boolean> {
    await db.delete(keywords).where(eq(keywords.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
