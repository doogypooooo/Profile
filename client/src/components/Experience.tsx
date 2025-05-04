import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";

const Experience = () => {
  const { t } = useLanguage();
  const [showMore, setShowMore] = useState(false);
  
  const { data: resumeData, isLoading } = useQuery({
    queryKey: ['/api/resume'],
  });

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const visibleExperiences = !resumeData || !resumeData.experience || !Array.isArray(resumeData.experience)
    ? []
    : showMore
      ? resumeData.experience
      : resumeData.experience.slice(0, 5);

  return (
    <section id="experience" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <h2 className="section-title">{t("experience.title")}</h2>
        <p className="text-center text-muted-foreground mb-12">{t("experience.summary")}</p>
        
        <div className="mt-8 relative">
          {/* Timeline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-muted transform -translate-x-1/2"></div>
          
          {/* Experience Items */}
          <div className="timeline-container">
            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-date">
                    <Skeleton className="h-6 w-32" />
                  </div>
                  
                  <div className="timeline-content bg-background p-6 rounded-lg shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <Skeleton className="h-7 w-40 mb-2" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                      <Skeleton className="h-8 w-24 rounded-full" />
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-6 w-16 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {visibleExperiences.map((job, index) => {
                  return job ? (
                    <div key={index} className="timeline-item">
                      <div className="timeline-date">
                        <span className="text-primary font-semibold">{job.period}</span>
                      </div>

                      <div className="timeline-content bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold">{job.company}</h3>
                            <p className="text-primary font-medium">{job.position}</p>
                          </div>
                          <span className="text-foreground bg-primary/20 px-3 py-1 rounded-full text-sm">{job.salary}</span>
                        </div>

                        <div className="mt-4 space-y-3 text-muted-foreground">
                          {job.project && (
                            <p><span className="text-primary font-medium">{job.project}</span></p>
                          )}
                          {job.achievements && Array.isArray(job.achievements) ? (
                            job.achievements.map((achievement) => (
                              <p key={achievement}><Check className="inline text-primary mr-2 h-4 w-4" /> {achievement}</p>
                            ))
                          ) : null}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2"> 
                          {job.technologies && Array.isArray(job.technologies) ? (
                            job.technologies.map((tech) => (
                              <span key={tech} className="tech-tag">{tech}</span>
                            ))
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
                
                {resumeData && resumeData.experience && resumeData.experience.length > 5 && (
                  <div className="flex justify-center mt-10 relative z-10">
                    <div className="bg-card p-2 rounded-full">
                      <button onClick={toggleShowMore} className="btn-secondary">
                        {showMore ? t("experience.showLess") : t("experience.showMore")} 
                        {showMore ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
