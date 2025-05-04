import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";

const Projects = () => {
  const { t } = useLanguage();
  const { data: resumeData, isLoading } = useQuery({
    queryKey: ['/api/resume'],
  });

  return (
    <section id="projects" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <h2 className="section-title">{t("projects.title")}</h2>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="project-card">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/30"></div>
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="p-6 bg-background rounded-b-lg">
                  <Skeleton className="h-7 w-40 mb-2" />
                  <Skeleton className="h-5 w-48 mb-4" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            (resumeData && resumeData.projects && Array.isArray(resumeData.projects)) ? (
                resumeData.projects.map((project) => (
                  <div key={project.name} className="project-card">
                    <div className="relative h-56 overflow-hidden rounded-t-lg">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
                      <img 
                        src={
                          project.name === "언디셈버" 
                            ? "/assets/projects/screenshots/undecember.jpg" 
                            : project.name === "크로노 오디세이"
                            ? "/assets/projects/screenshots/chronoodyssey.jpg"
                            : project.name === "그랑사가"
                            ? "/assets/projects/screenshots/gransaga.jpg"
                            : project.name === "세븐나이츠"
                            ? "/assets/projects/screenshots/sevenknights.jpg"
                            : project.name === "일기당천"
                            ? "/assets/projects/screenshots/ilgidangcheon.jpg"
                            : project.name === "창천"
                            ? "/assets/projects/screenshots/changcheon.jpg"
                            : "/assets/projects/project-placeholder.svg"
                        }
                        alt={`${project.name} ${t("projects.projectImage")}`}
                        className="w-full h-full object-cover p-0"
                        loading="lazy"
                        onError={(e) => { 
                          const target = e.target as HTMLImageElement;
                          if (project.name === "언디셈버") target.src = "/assets/projects/undecember.svg";
                          else if (project.name === "크로노 오디세이") target.src = "/assets/projects/chronoodyssey.svg";
                          else if (project.name === "그랑사가") target.src = "/assets/projects/gransaga.svg";
                          else if (project.name === "세븐나이츠") target.src = "/assets/projects/sevenknights.svg";
                          else if (project.name === "일기당천") target.src = "/assets/projects/ilgidangcheon.svg";
                          else if (project.name === "창천") target.src = "/assets/projects/changcheon.svg";
                          else target.src = "/assets/projects/project-placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="p-6 bg-background rounded-b-lg">
                      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                      <p className="text-muted-foreground mb-4">{project.company} | {project.period}</p>
                      <p className="text-sm mb-4">{project.description}</p>
                      {project.technologies && Array.isArray(project.technologies) ? (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      ): null}
                    </div>
                  </div>
                ))
              ) : (
                <p>No project data available.</p>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
