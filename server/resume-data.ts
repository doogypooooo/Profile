import { Resume } from "@shared/schema";

export const resumeData: Resume = {
  personalInfo: {
    name: "정종현(남, 1977년생)",
    experience: "16년 2개월",
    desiredSalary: "9000만원 ~ 1억원",
    email: "doogypoo@naver.com",
    phone: "010-2186-7777",
    location: "서울 도봉구",
    military: "군필(육군 병장) 1997년 01월 ~ 1999년 03월"
  },
  desiredConditions: {
    field: "게임개발(모바일), 서버",
    employmentType: "정규직",
    location: "서울 전지역"
  },
  introduction: [
    "서버 네트워크 모듈 개발 및 기본 프레임워크 개발이 가능하며, 대용량의 MMORPG 시스템을 개발할 수 있습니다.",
    "오라클 데이터베이스 관련 전공이며 서버 경력 이전에 많은 데이터베이스 작업 경험이 풍부하여 높은 이해도와 활용 능력을 갖추고 있어, 스키마 작업, SQL 작업, 기본적인 튜닝 작업까지 가능합니다.",
    "게임 운영 관련 솔루션 개발에 대한 경험과 이해도를 가지고 있어 해당 업무 또한 가능합니다.",
    "다양한 프로젝트를 통해 쌓은 경험과 문제 해결 능력을 바탕으로 효율적이고 안정적인 서버 시스템을 구축하는 데 기여하고자 합니다."
  ],
  skills: {
    programming: [
      { name: "C++", level: "advanced" },
      { name: "C#", level: "intermediate" },
      { name: "Node.js", level: "intermediate" },
      { name: "SQL", level: "advanced" }
    ],
    server: [
      { name: "TCP/IP Networking", level: "advanced" },
      { name: "IOCP", level: "advanced" },
      { name: "MS-SQL", level: "advanced" },
      { name: "Azure/PlayFab", level: "intermediate" }
    ],
    game: [
      { name: "MMORPG 서버 개발", level: "advanced" },
      { name: "게임 AI 시스템", level: "advanced" },
      { name: "Unity", level: "intermediate" }
    ],
    mobile: [
      { name: "iOS/Android 앱 개발", level: "intermediate" },
      { name: "COCOS-2DX", level: "intermediate" }
    ],
    keywords: [
      "VisualC++", "Win32", "Winsock", "네트워크", "IOCP", "DB", "게임프로그래머"
    ]
  },
  experience: [
    {
      company: "㈜니즈게임즈",
      position: "개발실 실장",
      period: "2022.07 - 2023.10",
      salary: "1억원 이상",
      project: "언디셈버 개발실 총괄",
      achievements: [
        "VTUNE 및 VerySleepy 등 전문 프로파일링 도구를 활용한 성능 최적화",
        "메모리 누수 해결 및 효율적인 메모리 할당 전략 도입으로 응답 시간 30% 단축",
        "서버 아키텍처 개선으로 동시 접속자 수 대폭 증대 및 비용 절감"
      ],
      technologies: ["C++", "MSSQL", "NODE.JS", "VTUNE"]
    },
    {
      company: "엔픽셀",
      position: "개발2본부 사원",
      period: "2020.05 - 2022.05",
      salary: "8000~9000만원",
      project: "크로노 오디세이 개발",
      achievements: [
        "그랑사가 서버의 핵심 기반 코드를 활용하여 기존 코드 전환",
        "효율적인 API 설계로 콘텐츠 개발 속도 향상",
        "자동화된 배포 시스템 구축으로 운영 효율성 증대"
      ],
      technologies: ["C++", "MSSQL", "NODE.JS"]
    },
    {
      company: "베스파",
      position: "피닉스스튜디오 사원",
      period: "2019.06 - 2020.04",
      salary: "9000~1억원",
      achievements: [
        "방치형 게임 서버 로직 개발",
        "Azure와 PlayFab을 이용한 서비스 구현",
        "DevOps 적용 및 운용"
      ],
      technologies: ["C++", "NODE.JS", "AZURE", "PlayFab"]
    },
    {
      company: "엔픽셀",
      position: "개발1실 파트장",
      period: "2017.11 - 2019.05",
      salary: "8000~9000만원",
      achievements: [
        "MMORPG 네트워크 라이브러리 개발",
        "NPC 및 AI 로직 개발",
        "데이터베이스 라이브러리 개발",
        "인증서버 및 빌링서버 개발"
      ],
      technologies: ["C++", "MSSQL", "NODE.JS"]
    },
    {
      company: "넷마블넥서스",
      position: "서버팀 파트장",
      period: "2014.11 - 2017.06",
      salary: "8000~9000만원",
      achievements: [
        "세븐나이츠 중국 서버 개발",
        "세븐나이츠 글로벌 서버팀장",
        "세븐나이츠 일본 서버 팀장",
        "개발2실(중국, 글로벌, 일본) 실장"
      ],
      technologies: ["C++", "MSSQL"]
    },
    {
      company: "라인플레이",
      position: "게임개발실 대리",
      period: "2013.09 - 2014.11",
      salary: "6000~7000만원",
      achievements: [
        "라인플레이앱 내 게임 컨텐츠 개발",
        "so 라이브러리 형태로 관리 유지보수되는 앱내 게임개발"
      ],
      technologies: ["C++", "COCOS-2DX", "IOS", "ANDROID"]
    },
    {
      company: "㈜이야소프트",
      position: "탑스튜디오 팀장",
      period: "2010.04 - 2011.08",
      salary: "4500~5000만원",
      achievements: [
        "포로토타입 서버 개발",
        "기본서버 프레임웍 개선작업",
        "락의 최소화로 패킷전송 및 로직 처리 최적화",
        "몬스터 AI 작업 및 이벤트/인던을 위한 루아 라이브러리 작업"
      ],
      technologies: ["C++", "MSSQL"]
    },
    {
      company: "㈜위메이드",
      position: "창천개발팀 과장",
      period: "2009.04 - 2010.04",
      salary: "4000~4500만원",
      achievements: [
        "퀘스트 리뉴얼 및 외형정보 관련 리뉴얼",
        "기획데이터 관리를 위한 툴 개발",
        "서버모니터링툴 리뉴얼",
        "해외 작업 프로세스 정립 및 패치 성공률 상승"
      ],
      technologies: ["C++", "MSSQL"]
    },
    {
      company: "㈜노리아",
      position: "개발실 대리",
      period: "2008.07 - 2009.01",
      salary: "2200~2400만원",
      achievements: [
        "캐주얼게임서버 구축",
        "네트웍 라이브러리 개발 (IOCP)",
        "DataBase Proxy 개발"
      ],
      technologies: ["C++", "MSSQL"]
    },
    {
      company: "㈜웹젠",
      position: "일기당천스튜디오 대리",
      period: "2005.03 - 2008.05",
      salary: "3000~3500만원",
      achievements: [
        "중국 현지에서 일기당천 MMORPG 서버 개발",
        "서버관련 DB작업",
        "NPC 관련 개발",
        "NPC AI관련 개발 (스킬사용기반의 AI시스템)"
      ],
      technologies: ["C#", "WEBSERVICE", "C++", "MSSQL"]
    }
  ],
  education: [
    {
      institution: "서울사이버대학교",
      type: "university",
      period: "2003년 ~ 2005년 02월",
      department: "자연과학계열",
      major: "게임.에니매이션학과"
    },
    {
      institution: "영진전문대학",
      type: "university",
      period: "1996년 ~ 2000년 02월",
      department: "자연과학계열",
      major: "ORACLE 데이타베이스학과"
    },
    {
      institution: "성광고등학교",
      type: "highschool",
      period: "1993년 ~ 1996년",
      location: "대구"
    }
  ],
  projects: [
    {
      name: "언디셈버",
      company: "니즈게임즈",
      period: "2022 - 2023",
      description: "서버 성능 최적화 및 아키텍처 개선을 통해 응답 시간을 30% 단축하고 동시 접속자 수를 대폭 증대한 MMORPG 게임",
      technologies: ["C++", "MSSQL", "NODE.JS"]
    },
    {
      name: "크로노 오디세이",
      company: "엔픽셀",
      period: "2020 - 2022",
      description: "그랑사가 서버의 핵심 기반 코드를 활용한 서버 개발과 효율적인 API 설계로 콘텐츠 개발 속도를 향상시킨 프로젝트",
      technologies: ["C++", "MSSQL", "NODE.JS"]
    },
    {
      name: "그랑사가",
      company: "엔픽셀",
      period: "2017 - 2019",
      description: "개발1실 파트장으로서 MMORPG 네트워크 라이브러리, NPC 및 AI 로직, 데이터베이스 라이브러리 등 핵심 시스템 개발",
      technologies: ["C++", "MSSQL", "NODE.JS"]
    },
    {
      name: "세븐나이츠",
      company: "넷마블넥서스",
      period: "2014 - 2017",
      description: "세븐나이츠 중국, 글로벌, 일본 서버 팀장으로서 다국어 및 지역화 관련 서버 개발을 주도한 모바일 RPG",
      technologies: ["C++", "MSSQL"]
    },
    {
      name: "창천",
      company: "위메이드",
      period: "2009 - 2010",
      description: "퀘스트 리뉴얼, 외형정보 관련 리뉴얼, 기획데이터 관리 툴 개발, 서버 모니터링 툴 리뉴얼 및 해외 작업 프로세스 정립",
      technologies: ["C++", "MSSQL"]
    },
    {
      name: "일기당천",
      company: "웹젠",
      period: "2005 - 2008",
      description: "중국 현지에서 MMORPG 서버 개발, NPC 관련 개발, 스킬사용 기반의 AI 시스템 구현 및 DB 작업 수행",
      technologies: ["C#", "C++", "MSSQL", "WEBSERVICE"]
    }
  ],
  portfolio: [
    "SampleCode_Cplusplus_1.zip",
    "SameCode_csharp_1.zip"
  ]
};
