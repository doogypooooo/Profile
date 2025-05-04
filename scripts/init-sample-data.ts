import { db } from "../server/db";
import {
  personalInfos, desiredConditions, skills, experiences, educations, projects
} from "../shared/schema";
import { resumeData } from "../server/resume-data";

async function createSampleData() {
  const adminUserId = 4;
  try {
    console.log("샘플 데이터 생성 시작...");

    // 개인정보 추가
    await db
      .insert(personalInfos)
      .values({
        name: resumeData.personalInfo.name,
        title: "게임서버 개발자",
        experience: resumeData.personalInfo.experience,
        desiredSalary: resumeData.personalInfo.desiredSalary,
        email: resumeData.personalInfo.email,
        phone: resumeData.personalInfo.phone,
        location: resumeData.personalInfo.location,
        military: resumeData.personalInfo.military,
        introduction: resumeData.introduction.join(", "),
      })
      .returning()
      .then((data) => console.log("개인정보 생성 완료:", data[0].id));

    // 희망조건 추가
    await db
      .insert(desiredConditions)
      .values({
        field: resumeData.desiredConditions.field,
        employmentType: resumeData.desiredConditions.employmentType,
        location: resumeData.desiredConditions.location,
      })
      .returning()
      .then((data) => console.log("희망조건 생성 완료:", data[0].id));

    // 프로그래밍 스킬 추가
    for (const skill of resumeData.skills.programming) {
      await db
        .insert(skills)
        .values({
          category: "programming",
          name: skill.name,
          level: skill.level,
        })
        .then(() => console.log("프로그래밍 스킬 생성 완료"));
    }

    // 서버 스킬 추가
    for (const skill of resumeData.skills.server) {
      await db
        .insert(skills)
        .values({
          category: "server",
          name: skill.name,
          level: skill.level,
        })
        .then(() => console.log("서버 스킬 생성 완료"));
    }

    // 게임 스킬 추가
    for (const skill of resumeData.skills.game) {
      await db
        .insert(skills)
        .values({
          category: "game",
          name: skill.name,
          level: skill.level,
        })
        .then(() => console.log("게임 스킬 생성 완료"));
    }

    // 모바일 스킬 추가
    for (const skill of resumeData.skills.mobile) {
      await db
        .insert(skills)
        .values({
          category: "mobile",
          name: skill.name,
          level: skill.level,
        })
        .then(() => console.log("모바일 스킬 생성 완료"));
    }

    // 경력 추가
    for (let i = 0; i < resumeData.experience.length; i++) {
      const exp = resumeData.experience[i];
      await db
        .insert(experiences)
        .values({
          userId: adminUserId,
          company: exp.company,
          position: exp.position,
          period: exp.period,
          salary: exp.salary,
          project: exp.project || null,
          achievements: exp.achievements.join(", "),
          technologies: exp.technologies.join(", "),
          order: i,
        })
        .then(() => console.log(`경력 ${i + 1} 생성 완료`));
    }

    // 교육 추가
    for (let i = 0; i < resumeData.education.length; i++) {
      const edu = resumeData.education[i];
      await db
        .insert(educations)
        .values({
          userId: adminUserId,
          institution: edu.institution,
          type: edu.type,
          period: edu.period,
          department: edu.department || null,
          major: edu.major || null,
          location: edu.location || null,
          order: i,
        })
        .then(() => console.log(`교육 ${i + 1} 생성 완료`));
    }

    // 프로젝트 추가
    for (let i = 0; i < resumeData.projects.length; i++) {
      const proj = resumeData.projects[i];
      const imagePath =
        proj.name === "언디셈버"
          ? "/assets/projects/screenshots/undecember.jpg"
          : proj.name === "크로노 오디세이"
          ? "/assets/projects/screenshots/chronoodyssey.jpg"
          : proj.name === "그랑사가"
          ? "/assets/projects/screenshots/gransaga.jpg"
          : proj.name === "세븐나이츠"
          ? "/assets/projects/screenshots/sevenknights.jpg"
          : proj.name === "일기당천"
          ? "/assets/projects/screenshots/ilgidangcheon.jpg"
          : proj.name === "창천"
          ? "/assets/projects/screenshots/changcheon.jpg"
          : "/assets/projects/project-placeholder.svg";
      await db.insert(projects).values({
        userId: adminUserId,
        name: proj.name,
        company: proj.company,
        period: proj.period,
        description: proj.description,
        technologies: proj.technologies.join(", "),
        imagePath,
        order: i,
      }).then(() => console.log(`프로젝트 ${i + 1} 생성 완료`));
    }
    console.log("모든 샘플 데이터가 성공적으로 생성되었습니다.");
  } catch (error) {
    console.error("샘플 데이터 생성 중 오류가 발생했습니다:", error);
  }finally {
      process.exit(0);
  } 
}

// 스크립트 실행