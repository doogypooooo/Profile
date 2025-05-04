import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { eq } from "drizzle-orm";
import { users, personalInfos, desiredConditions, skills, keywords, projects, educations, experiences } from "@shared/schema";


const defaultPersonalInfo = {
  name: "홍길동",
  experience: "신입",
  desiredSalary: "연봉 협의",
  email: "test@gmail.com",
  phone: "010-1234-5678",
  location: "",
  military: "",
  introduction: "",
};

const defaultDesiredCondition = {
  field: "",
  employmentType: "정규직",
  location: "서울",
};

// 관리자 권한 확인 미들웨어
const isAdmin = (req: Request, res: Response, next: Function) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized", message: "인증이 필요합니다." });
  }

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized", message: "인증이 필요합니다." });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Forbidden", message: "관리자 권한이 필요합니다." });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Forbidden", message: "관리자 권한이 필요합니다." });
  }

  next();
};

// 파라미터 id를 숫자로 변환하고, 유효하지 않으면 에러를 반환하는 함수
function parseId(id: string, res: Response): number {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    res.status(400).json({ error: "Bad Request", message: "유효하지 않은 ID입니다." });
    throw new Error("Invalid ID");
    throw new Error("Invalid ID");
  }
  return parsedId;
}

// try-catch 로직을 담당하는 함수
const handleApiRequest = async (
  res: Response,
  action: () => Promise<any>,
  successMessage: string,
  errorMessage: string,
  statusCode: number = 500,
) => {
  try {
    const result = await action();
    if(result) res.json(result);
    else res.status(404).json({error: "Not Found", message: "데이터를 찾을 수 없습니다."})
  } catch (error) {
    console.error(errorMessage, error);
    res.status(statusCode).json({ error: error.name, message: error.message });
  }
};

// try-catch 로직을 담당하는 함수 (id 필요한 api)
const handleApiRequestWithId = async (
  req: Request,
  res: Response,
  action: (id: number) => Promise<any>,
  successMessage: string,
  errorMessage: string,
) => {
  try {
    const id = parseId(req.params.id, res);
    const result = await action(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.name, message: error.message });
    console.error(errorMessage, error);
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // 인증 설정
  setupAuth(app);
  
  // ==================== 클라이언트용 API ====================
  
  app.get("/api/resume", async (req: Request, res: Response) => {
    try {
      const personalInfo = await storage.getLastPersonalInfo();
      const desiredCondition = await storage.getLastDesiredCondition();

      const programmingSkills = await storage.getSkillsByCategory("programming");
      const serverSkills = await storage.getSkillsByCategory("server");
      const gameSkills = await storage.getSkillsByCategory("game");

      const mobileSkills = await storage.getSkillsByCategory("mobile");
      const mobileSkills = await storage.getSkillsByCategory("mobile");
      const keywordList = await storage.getKeywords();
      
      const experienceList = await storage.getExperiences();
      const educationList = await storage.getEducations();
      const projectList = await storage.getProjects();

      // personalInfo와 desiredCondition이 없는 경우 기본 데이터 반환
      if (!personalInfo && !desiredCondition) {
        return res.json({personalInfo:defaultPersonalInfo, desiredConditions: defaultDesiredCondition});
      }
      // 데이터 변환하여 응답
      const response = {
        personalInfo: personalInfo || {
          name: personalInfo.name,
          experience: personalInfo.experience,
          desiredSalary: personalInfo.desiredSalary,
          email: personalInfo.email,
          phone: personalInfo.phone,
          military: personalInfo.military,
        },  
        desiredConditions: !desiredCondition ? {
          field: desiredCondition.field,
          employmentType : desiredCondition.employmentType,
          location : desiredCondition.location
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
      console.error(error);
      res.status(500).json(error);
      res.status(500).json(error);
    }
  });
  
  // ==================== 관리자용 API ====================
  
  // 프로젝트 관련 API  
  app.get("/api/admin/projects", async (req, res) => {
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
      const id = parseId(req.params.id, res);
      await handleApiRequestWithId(req, res, (id) => storage.getProject(id), "프로젝트 목록을 가져오는데 성공했습니다.", "프로젝트를 가져오는데 실패했습니다.");
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "프로젝트를 가져오는데 실패했습니다." });
    }
  });
  
  app.post("/api/admin/projects", isAdmin, async (req, res) => {
    await handleApiRequest(res, () => storage.createProject(req.body), "프로젝트 생성 성공", "프로젝트 생성 실패", 201);
  });
  
  app.put("/api/admin/projects/:id", isAdmin, async (req, res) => {
    await handleApiRequestWithId(req, res, (id) => storage.updateProject(id, req.body), "프로젝트 업데이트 성공", "프로젝트 업데이트 실패");
  });
  
  app.delete("/api/admin/projects/:id", isAdmin, async (req, res) => {
    await handleApiRequestWithId(req, res, (id) => storage.deleteProject(id), "프로젝트 삭제 성공", "프로젝트 삭제 실패");
  });
  
  // 교육 관련 API
  app.get("/api/admin/educations/:id", isAdmin, async (req, res) => {
  app.get("/api/admin/educations", async (req, res) => {
    try {
      const educationList = await storage.getEducations();
      res.json(educationList);
    } catch (error) {
      console.error("교육 목록을 가져오는데 실패했습니다.", error);
      res.status(500).json({ error: error.name, message: error.message });
    }
  });
    await handleApiRequestWithId(req, res, (id) => storage.getEducation(id), "교육 목록을 가져오는데 성공했습니다.", "교육 목록을 가져오는데 실패했습니다.");
      const education = await storage.getEducation(id);
      res.json(education);
    } catch (error) {
      console.error("Error fetching education:", error);
      res.status(500).json({ message: "교육 정보를 가져오는데 실패했습니다." });
    }
  });
  
  app.post("/api/admin/educations", isAdmin, async (req, res) => {    
    await handleApiRequest(res, () => storage.createEducation(req.body), "교육 생성 성공", "교육 생성 실패", 201);
  });
  
  app.put("/api/admin/educations/:id", isAdmin, async (req, res) => {
    await handleApiRequestWithId(req, res, (id) => storage.updateEducation(id, req.body), "교육 업데이트 성공", "교육 업데이트 실패");
  });
  
  app.delete("/api/admin/educations/:id", isAdmin, async (req, res) => {
    await handleApiRequestWithId(req, res, (id) => storage.deleteEducation(id), "교육 삭제 성공", "교육 삭제 실패");
  });
  
  // 경력 관련 API
  app.get("/api/admin/experiences/:id", isAdmin, async (req, res) => {
  app.get("/api/admin/experiences", async (req, res) => {
    try {
      const experienceList = await storage.getExperiences();
      res.json(experienceList);
    } catch (error) {
      console.error("경력 목록을 가져오는데 실패했습니다.", error);
      res.status(500).json({ error: error.name, message: error.message });
    }
  });
    await handleApiRequestWithId(req, res, (id) => storage.getExperience(id), "경력 목록을 가져오는데 성공했습니다.", "경력 목록을 가져오는데 실패했습니다.");
      const experience = await storage.getExperience(id);
      res.json(experience);
    } catch (error) {
      console.error("Error fetching experience:", error);
      res.status(500).json({ message: "경력 정보를 가져오는데 실패했습니다." });
    }
  });
  
  app.post("/api/admin/experiences", isAdmin, async (req, res) => {
    await handleApiRequest(res, () => storage.createExperience(req.body), "경력 생성 성공", "경력 생성 실패", 201);
  });
  
  app.put("/api/admin/experiences/:id", isAdmin, async (req, res) => {
    await handleApiRequestWithId(req, res, (id) => storage.updateExperience(id, req.body), "경력 업데이트 성공", "경력 업데이트 실패");
  });
  
  app.delete("/api/admin/experiences/:id", isAdmin, async (req, res) => {
    await handleApiRequestWithId(req, res, (id) => storage.deleteExperience(id), "경력 삭제 성공", "경력 삭제 실패");
  });
  
  // 개인정보 관련 API
  app.get("/api/admin/personal-info", isAdmin, async (req, res) => {
    await handleApiRequest(
      res, () => storage.getLastPersonalInfo(), "개인정보 가져오기 성공", "개인정보 가져오기 실패",
    );
  });
  

  app.post("/api/admin/personal-info", isAdmin, async (req, res) => {
    await handleApiRequest(res, () => storage.createPersonalInfo(req.body), "개인정보 생성 성공", "개인정보 생성 실패", 201);
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
    await handleApiRequest(
      res, () => storage.getLastDesiredCondition(), "희망조건 가져오기 성공", "희망조건 가져오기 실패",
    );
  });
  

  app.post("/api/admin/desired-conditions", isAdmin, async (req, res) => {
    await handleApiRequest(res, () => storage.createDesiredCondition(req.body), "희망조건 생성 성공", "희망조건 생성 실패", 201);
  });
  
  app.put("/api/admin/desired-conditions/:id", isAdmin, async (req, res) => {
    await handleApiRequestWithId(req, res, (id) => storage.updateDesiredCondition(id, req.body), "희망조건 업데이트 성공", "희망조건 업데이트 실패");
  });
  
  // 스킬 관련 API
  app.get("/api/admin/skills", isAdmin, async (req, res) => {
    await handleApiRequest(res, () => storage.getSkills(), "스킬 목록 가져오기 성공", "스킬 목록 가져오기 실패");
  });
  app.get("/api/admin/skills/:category", isAdmin, async (req, res) => {
    try {      
      const skillList = await storage.getSkillsByCategory(req.params.category);
      if(skillList.length === 0) res.status(404).json({error: "Not Found", message: "데이터를 찾을 수 없습니다."});
    } catch (error) {
      console.error("카테고리별 스킬 목록을 가져오는데 실패했습니다.", error);
      res.status(500).json({ error: error.name, message: error.message });
    }
  });
  
  app.post("/api/admin/skills", isAdmin, async (req, res) => {
    await handleApiRequest(res, () => storage.createSkill(req.body), "스킬 생성 성공", "스킬 생성 실패", 201);
  });
  
  app.put("/api/admin/skills/:id", isAdmin, async (req, res) => {
    await handleApiRequestWithId(req, res, (id) => storage.updateSkill(id, req.body), "스킬 업데이트 성공", "스킬 업데이트 실패");
  });
  
  app.delete("/api/admin/skills/:id", isAdmin, async (req, res) => {
    await handleApiRequestWithId(req, res, (id) => storage.deleteSkill(id), "스킬 삭제 성공", "스킬 삭제 실패");
  });
  
  // 키워드 관련 API
  app.get("/api/admin/keywords", isAdmin, async (req, res) => {
    await handleApiRequest(
      res, () => storage.getKeywords(), "키워드 가져오기 성공", "키워드 가져오기 실패",
    );
  });
  
  app.post("/api/admin/keywords", isAdmin, async (req, res) => {
    try {
      const keyword = await storage.createKeyword(req.body);
      res.status(201).json(keyword);
    } catch (error) {
      console.error("키워드 생성 실패.", error);
      res.status(500).json({ error: error.name, message: error.message });
    }
  });
  
  app.delete("/api/admin/keywords/:id", isAdmin, async (req, res) => {
    await handleApiRequestWithId(req, res, (id) => storage.deleteKeyword(id), "키워드 삭제 성공", "키워드 삭제 실패");
  });

  const httpServer = createServer(app);
  return httpServer;
}
