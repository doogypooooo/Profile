import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { resumeData } from "./resume-data";
import { setupAuth } from "./auth";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { users, personalInfos, desiredConditions, skills, keywords, projects, educations, experiences } from "@shared/schema";

// 관리자 권한 확인 미들웨어
const isAdmin = (req: Request, res: Response, next: Function) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "인증이 필요합니다." });
  }
  
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "관리자 권한이 필요합니다." });
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // 인증 설정
  setupAuth(app);
  
  // ==================== 클라이언트용 API ====================
  
  // 이력서 데이터 가져오기
  app.get("/api/resume", async (req, res) => {
    try {
      // 데이터베이스에서 데이터 가져오기
      const personalInfo = await storage.getLastPersonalInfo();
      const desiredCondition = await storage.getLastDesiredCondition();
      
      const programmingSkills = await storage.getSkillsByCategory("programming");
      const serverSkills = await storage.getSkillsByCategory("server");
      const gameSkills = await storage.getSkillsByCategory("game");
      const mobileSkills = await storage.getSkillsByCategory("mobile");
      const keywordList = await storage.getKeywords();
      
      const experienceList = await storage.getExperiences();
      const educationList = await storage.getEducations();
      const projectList = await storage.getProjects();
      
      // 데이터베이스에 데이터가 없으면 기존 resumeData 리턴
      if (!personalInfo || !desiredCondition) {
        return res.json(resumeData);
      }
      
      // 데이터 변환하여 응답
      const response = {
        personalInfo: {
          name: personalInfo.name,
          experience: personalInfo.experience,
          desiredSalary: personalInfo.desiredSalary,
          email: personalInfo.email,
          phone: personalInfo.phone,
          location: personalInfo.location,
          military: personalInfo.military,
        },
        desiredConditions: {
          field: desiredCondition.field,
          employmentType: desiredCondition.employmentType,
          location: desiredCondition.location,
        },
        introduction: personalInfo.introduction,
        skills: {
          programming: programmingSkills,
          server: serverSkills,
          game: gameSkills,
          mobile: mobileSkills,
          keywords: keywordList.map(k => k.keyword),
        },
        experience: experienceList.map(e => ({
          company: e.company,
          position: e.position,
          period: e.period,
          salary: e.salary,
          project: e.project || undefined,
          achievements: e.achievements,
          technologies: e.technologies,
        })),
        education: educationList.map(e => ({
          institution: e.institution,
          type: e.type,
          period: e.period,
          department: e.department || undefined,
          major: e.major || undefined,
          location: e.location || undefined,
        })),
        projects: projectList.map(p => ({
          name: p.name,
          company: p.company,
          period: p.period,
          description: p.description,
          technologies: p.technologies,
        })),
        portfolio: [], // 포트폴리오 속성이 필요하면 여기에 구현
      };
      
      res.json(response);
    } catch (error) {
      console.error("Error fetching resume data:", error);
      res.status(500).json({ message: "Failed to fetch resume data" });
    }
  });
  
  // ==================== 관리자용 API ====================
  
  // 프로젝트 관련 API
  app.get("/api/admin/projects", isAdmin, async (req, res) => {
    try {
      const projectList = await storage.getProjects();
      res.json(projectList);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "프로젝트 목록을 가져오는데 실패했습니다." });
    }
  });
  
  app.get("/api/admin/projects/:id", isAdmin, async (req, res) => {
    try {
      const project = await storage.getProject(parseInt(req.params.id));
      if (!project) {
        return res.status(404).json({ message: "프로젝트를 찾을 수 없습니다." });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "프로젝트를 가져오는데 실패했습니다." });
    }
  });
  
  app.post("/api/admin/projects", isAdmin, async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "프로젝트 생성에 실패했습니다." });
    }
  });
  
  app.put("/api/admin/projects/:id", isAdmin, async (req, res) => {
    try {
      const project = await storage.updateProject(parseInt(req.params.id), req.body);
      if (!project) {
        return res.status(404).json({ message: "프로젝트를 찾을 수 없습니다." });
      }
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "프로젝트 업데이트에 실패했습니다." });
    }
  });
  
  app.delete("/api/admin/projects/:id", isAdmin, async (req, res) => {
    try {
      const result = await storage.deleteProject(parseInt(req.params.id));
      res.json({ success: result });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "프로젝트 삭제에 실패했습니다." });
    }
  });
  
  // 교육 관련 API
  app.get("/api/admin/educations", isAdmin, async (req, res) => {
    try {
      const educationList = await storage.getEducations();
      res.json(educationList);
    } catch (error) {
      console.error("Error fetching educations:", error);
      res.status(500).json({ message: "교육 목록을 가져오는데 실패했습니다." });
    }
  });
  
  app.get("/api/admin/educations/:id", isAdmin, async (req, res) => {
    try {
      const education = await storage.getEducation(parseInt(req.params.id));
      if (!education) {
        return res.status(404).json({ message: "교육 정보를 찾을 수 없습니다." });
      }
      res.json(education);
    } catch (error) {
      console.error("Error fetching education:", error);
      res.status(500).json({ message: "교육 정보를 가져오는데 실패했습니다." });
    }
  });
  
  app.post("/api/admin/educations", isAdmin, async (req, res) => {
    try {
      const education = await storage.createEducation(req.body);
      res.status(201).json(education);
    } catch (error) {
      console.error("Error creating education:", error);
      res.status(500).json({ message: "교육 정보 생성에 실패했습니다." });
    }
  });
  
  app.put("/api/admin/educations/:id", isAdmin, async (req, res) => {
    try {
      const education = await storage.updateEducation(parseInt(req.params.id), req.body);
      if (!education) {
        return res.status(404).json({ message: "교육 정보를 찾을 수 없습니다." });
      }
      res.json(education);
    } catch (error) {
      console.error("Error updating education:", error);
      res.status(500).json({ message: "교육 정보 업데이트에 실패했습니다." });
    }
  });
  
  app.delete("/api/admin/educations/:id", isAdmin, async (req, res) => {
    try {
      const result = await storage.deleteEducation(parseInt(req.params.id));
      res.json({ success: result });
    } catch (error) {
      console.error("Error deleting education:", error);
      res.status(500).json({ message: "교육 정보 삭제에 실패했습니다." });
    }
  });
  
  // 경력 관련 API
  app.get("/api/admin/experiences", isAdmin, async (req, res) => {
    try {
      const experienceList = await storage.getExperiences();
      res.json(experienceList);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      res.status(500).json({ message: "경력 목록을 가져오는데 실패했습니다." });
    }
  });
  
  app.get("/api/admin/experiences/:id", isAdmin, async (req, res) => {
    try {
      const experience = await storage.getExperience(parseInt(req.params.id));
      if (!experience) {
        return res.status(404).json({ message: "경력 정보를 찾을 수 없습니다." });
      }
      res.json(experience);
    } catch (error) {
      console.error("Error fetching experience:", error);
      res.status(500).json({ message: "경력 정보를 가져오는데 실패했습니다." });
    }
  });
  
  app.post("/api/admin/experiences", isAdmin, async (req, res) => {
    try {
      const experience = await storage.createExperience(req.body);
      res.status(201).json(experience);
    } catch (error) {
      console.error("Error creating experience:", error);
      res.status(500).json({ message: "경력 정보 생성에 실패했습니다." });
    }
  });
  
  app.put("/api/admin/experiences/:id", isAdmin, async (req, res) => {
    try {
      const experience = await storage.updateExperience(parseInt(req.params.id), req.body);
      if (!experience) {
        return res.status(404).json({ message: "경력 정보를 찾을 수 없습니다." });
      }
      res.json(experience);
    } catch (error) {
      console.error("Error updating experience:", error);
      res.status(500).json({ message: "경력 정보 업데이트에 실패했습니다." });
    }
  });
  
  app.delete("/api/admin/experiences/:id", isAdmin, async (req, res) => {
    try {
      const result = await storage.deleteExperience(parseInt(req.params.id));
      res.json({ success: result });
    } catch (error) {
      console.error("Error deleting experience:", error);
      res.status(500).json({ message: "경력 정보 삭제에 실패했습니다." });
    }
  });
  
  // 개인정보 관련 API
  app.get("/api/admin/personal-info", isAdmin, async (req, res) => {
    try {
      const personalInfo = await storage.getLastPersonalInfo();
      res.json(personalInfo);
    } catch (error) {
      console.error("Error fetching personal info:", error);
      res.status(500).json({ message: "개인정보를 가져오는데 실패했습니다." });
    }
  });
  
  app.post("/api/admin/personal-info", isAdmin, async (req, res) => {
    try {
      const personalInfo = await storage.createPersonalInfo(req.body);
      res.status(201).json(personalInfo);
    } catch (error) {
      console.error("Error creating personal info:", error);
      res.status(500).json({ message: "개인정보 생성에 실패했습니다." });
    }
  });
  
  app.put("/api/admin/personal-info/:id", isAdmin, async (req, res) => {
    try {
      const personalInfo = await storage.updatePersonalInfo(parseInt(req.params.id), req.body);
      if (!personalInfo) {
        return res.status(404).json({ message: "개인정보를 찾을 수 없습니다." });
      }
      res.json(personalInfo);
    } catch (error) {
      console.error("Error updating personal info:", error);
      res.status(500).json({ message: "개인정보 업데이트에 실패했습니다." });
    }
  });
  
  // 희망조건 관련 API
  app.get("/api/admin/desired-conditions", isAdmin, async (req, res) => {
    try {
      const desiredCondition = await storage.getLastDesiredCondition();
      res.json(desiredCondition);
    } catch (error) {
      console.error("Error fetching desired conditions:", error);
      res.status(500).json({ message: "희망조건을 가져오는데 실패했습니다." });
    }
  });
  
  app.post("/api/admin/desired-conditions", isAdmin, async (req, res) => {
    try {
      const desiredCondition = await storage.createDesiredCondition(req.body);
      res.status(201).json(desiredCondition);
    } catch (error) {
      console.error("Error creating desired condition:", error);
      res.status(500).json({ message: "희망조건 생성에 실패했습니다." });
    }
  });
  
  app.put("/api/admin/desired-conditions/:id", isAdmin, async (req, res) => {
    try {
      const desiredCondition = await storage.updateDesiredCondition(parseInt(req.params.id), req.body);
      if (!desiredCondition) {
        return res.status(404).json({ message: "희망조건을 찾을 수 없습니다." });
      }
      res.json(desiredCondition);
    } catch (error) {
      console.error("Error updating desired condition:", error);
      res.status(500).json({ message: "희망조건 업데이트에 실패했습니다." });
    }
  });
  
  // 스킬 관련 API
  app.get("/api/admin/skills", isAdmin, async (req, res) => {
    try {
      const skillList = await storage.getSkills();
      res.json(skillList);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "스킬 목록을 가져오는데 실패했습니다." });
    }
  });
  
  app.get("/api/admin/skills/:category", isAdmin, async (req, res) => {
    try {
      const skillList = await storage.getSkillsByCategory(req.params.category);
      res.json(skillList);
    } catch (error) {
      console.error("Error fetching skills by category:", error);
      res.status(500).json({ message: "카테고리별 스킬 목록을 가져오는데 실패했습니다." });
    }
  });
  
  app.post("/api/admin/skills", isAdmin, async (req, res) => {
    try {
      const skill = await storage.createSkill(req.body);
      res.status(201).json(skill);
    } catch (error) {
      console.error("Error creating skill:", error);
      res.status(500).json({ message: "스킬 생성에 실패했습니다." });
    }
  });
  
  app.put("/api/admin/skills/:id", isAdmin, async (req, res) => {
    try {
      const skill = await storage.updateSkill(parseInt(req.params.id), req.body);
      if (!skill) {
        return res.status(404).json({ message: "스킬을 찾을 수 없습니다." });
      }
      res.json(skill);
    } catch (error) {
      console.error("Error updating skill:", error);
      res.status(500).json({ message: "스킬 업데이트에 실패했습니다." });
    }
  });
  
  app.delete("/api/admin/skills/:id", isAdmin, async (req, res) => {
    try {
      const result = await storage.deleteSkill(parseInt(req.params.id));
      res.json({ success: result });
    } catch (error) {
      console.error("Error deleting skill:", error);
      res.status(500).json({ message: "스킬 삭제에 실패했습니다." });
    }
  });
  
  // 키워드 관련 API
  app.get("/api/admin/keywords", isAdmin, async (req, res) => {
    try {
      const keywordList = await storage.getKeywords();
      res.json(keywordList);
    } catch (error) {
      console.error("Error fetching keywords:", error);
      res.status(500).json({ message: "키워드 목록을 가져오는데 실패했습니다." });
    }
  });
  
  app.post("/api/admin/keywords", isAdmin, async (req, res) => {
    try {
      const keyword = await storage.createKeyword(req.body);
      res.status(201).json(keyword);
    } catch (error) {
      console.error("Error creating keyword:", error);
      res.status(500).json({ message: "키워드 생성에 실패했습니다." });
    }
  });
  
  app.delete("/api/admin/keywords/:id", isAdmin, async (req, res) => {
    try {
      const result = await storage.deleteKeyword(parseInt(req.params.id));
      res.json({ success: result });
    } catch (error) {
      console.error("Error deleting keyword:", error);
      res.status(500).json({ message: "키워드 삭제에 실패했습니다." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
