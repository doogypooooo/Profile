import { useQuery } from "@tanstack/react-query";
import { Code, Server, Gamepad2, Smartphone, Check } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";

const Skills = () => {
  const { t } = useLanguage();
  
  const { data: resumeData, isLoading } = useQuery({
    queryKey: ['/api/resume'],
  });

  // Skill bar component with proper typing
  const SkillBar = ({ 
    skill, 
    level, 
    category 
  }: { 
    skill: string; 
    level: "basic" | "intermediate" | "advanced"; 
    category: "programming" | "server" | "game" | "mobile";
  }) => {
    const percentMap = {
      basic: "60%",
      intermediate: "75%",
      advanced: "95%"
    };
    
    const colorClass = category === "programming" || category === "game" 
      ? "bg-primary" 
      : "bg-secondary";
    
    return (
      <div className="skill-item">
        <div className="flex justify-between mb-1">
          <span className="font-medium">{skill}</span>
          <span>{t(`skills.levels.${level}`)}</span>
        </div>
        <div className="w-full bg-accent rounded-full h-2">
          <div 
            className={`${colorClass} h-2 rounded-full`} 
            style={{ width: percentMap[level] }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title">{t("skills.title")}</h2>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Programming Languages */}
          <div className="skill-category">
            <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
              <Code className="mr-2 h-5 w-5" /> {t("skills.programming.title")}
            </h3>
            
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">                
                {resumeData?.skills && resumeData.skills.programming && Array.isArray(resumeData.skills.programming) ? (
                    resumeData.skills.programming.map((skill) => (
                      <SkillBar 
                        key={skill.name} 
                        skill={skill.name} 
                        level={skill.level as "basic" | "intermediate" | "advanced"} 
                        category="programming"
                      />
                    ))
                  ) : (
                    <p>No programming skills available.</p>
                  )}
              </div>
            )}
          </div>
          
          {/* Server Technologies */}
          <div className="skill-category">
            <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
              <Server className="mr-2 h-5 w-5" /> {t("skills.server.title")}
            </h3>
            
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">                
                {resumeData?.skills && resumeData.skills.server && Array.isArray(resumeData.skills.server) ? (
                    resumeData.skills.server.map((skill) => (
                      <SkillBar 
                        key={skill.name} 
                        skill={skill.name} 
                        level={skill.level as "basic" | "intermediate" | "advanced"} 
                        category="server"
                      />
                    ))
                  ) : (
                    <p>No server skills available.</p>
                  )}
              </div>
            )}
          </div>
          
          {/* Game Development */}
          <div className="skill-category">
            <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
              <Gamepad2 className="mr-2 h-5 w-5" /> {t("skills.game.title")}
            </h3>
            
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">                
                {resumeData?.skills && resumeData.skills.game && Array.isArray(resumeData.skills.game) ? (
                    resumeData.skills.game.map((skill) => (
                      <SkillBar 
                        key={skill.name} 
                        skill={skill.name} 
                        level={skill.level as "basic" | "intermediate" | "advanced"} 
                        category="game"
                      />
                    ))
                  ) : (
                    <p>No game skills available.</p>
                  )}
              </div>
            )}
          </div>
          
          {/* Mobile Development */}
          <div className="skill-category">
            <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
              <Smartphone className="mr-2 h-5 w-5" /> {t("skills.mobile.title")}
            </h3>
            
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">                
                {resumeData?.skills && resumeData.skills.mobile && Array.isArray(resumeData.skills.mobile) ? (
                    resumeData.skills.mobile.map((skill) => (
                      <SkillBar 
                        key={skill.name} 
                        skill={skill.name} 
                        level={skill.level as "basic" | "intermediate" | "advanced"} 
                        category="mobile"
                      />
                    ))
                  ) : (
                    <p>No mobile skills available.</p>
                  )}
              </div>
            )}
            
            <div className="mt-8 p-4 bg-background rounded-lg border border-muted">
              <h4 className="font-semibold mb-2 text-primary">{t("skills.keywords.title")}</h4>
              {isLoading ? (
                <div className="flex flex-wrap gap-2">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">                  
                  {resumeData?.skills && resumeData.skills.keywords && Array.isArray(resumeData.skills.keywords) ? (
                      resumeData.skills.keywords.map((keyword) => (
                        <span key={keyword} className="keyword-tag">{keyword}</span>
                      ))
                    ) : (
                      <p>No keywords available.</p>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
