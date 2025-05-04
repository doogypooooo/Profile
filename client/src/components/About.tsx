import { useQuery } from "@tanstack/react-query";
import { IdCard, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";

const About = () => {
  const { t } = useLanguage();
  
  const { data: resumeData, isLoading } = useQuery({
    queryKey: ['/api/resume'],
  });

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <h2 className="section-title">{t("about.title")}</h2>
        
        <div className="flex flex-col lg:flex-row gap-12 mt-12">
          <div className="lg:w-1/2">
            <div className="bg-background p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-primary">{t("about.personalInfo")}</h3>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex">
                      <Skeleton className="w-32 h-6 mr-4" />
                      <Skeleton className="flex-1 h-6" />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="w-32 text-muted-foreground">{t("about.name")}</div>
                    <div>{resumeData?.personalInfo.name}</div>
                  </li>
                  <li className="flex">
                    <div className="w-32 text-muted-foreground">{t("about.experience")}</div>
                    <div>{resumeData?.personalInfo.experience}</div>
                  </li>
                  <li className="flex">
                    <div className="w-32 text-muted-foreground">{t("about.salary")}</div>
                    <div>{resumeData?.personalInfo.desiredSalary}</div>
                  </li>
                  <li className="flex">
                    <div className="w-32 text-muted-foreground">{t("about.email")}</div>
                    <div>{resumeData?.personalInfo.email}</div>
                  </li>
                  <li className="flex">
                    <div className="w-32 text-muted-foreground">{t("about.location")}</div>
                    <div>{resumeData?.personalInfo.location}</div>
                  </li>
                  <li className="flex">
                    <div className="w-32 text-muted-foreground">{t("about.military")}</div>
                    <div>{resumeData?.personalInfo.military}</div>
                  </li>
                </ul>
              )}
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-lg mt-6">
              <h3 className="text-xl font-bold mb-4 text-primary">{t("about.desiredConditions")}</h3>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex">
                      <Skeleton className="w-32 h-6 mr-4" />
                      <Skeleton className="flex-1 h-6" />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="w-32 text-muted-foreground">{t("about.field")}</div>
                    <div>{resumeData?.desiredConditions.field}</div>
                  </li>
                  <li className="flex">
                    <div className="w-32 text-muted-foreground">{t("about.employmentType")}</div>
                    <div>{resumeData?.desiredConditions.employmentType}</div>
                  </li>
                  <li className="flex">
                    <div className="w-32 text-muted-foreground">{t("about.workLocation")}</div>
                    <div>{resumeData?.desiredConditions.location}</div>
                  </li>
                </ul>
              )}
            </div>
          </div>
          
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div className="bg-background p-6 rounded-lg shadow-lg h-full">
              <h3 className="text-xl font-bold mb-4 text-primary">{t("about.introduction")}</h3>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : (
                resumeData?.introduction && Array.isArray(resumeData.introduction) ? (
                  resumeData.introduction.map((paragraph, index) => (
                    <p key={paragraph} className="leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="leading-relaxed mb-4">No introduction available.</p>
                )
              )}
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-lg shadow-lg text-center">
                <Globe className="text-primary h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold">{t("about.overseas.title")}</h4>
                <p className="text-sm text-muted-foreground">{t("about.overseas.content")}</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-lg text-center">
                <IdCard className="text-primary h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold">{t("about.certification.title")}</h4>
                <p className="text-sm text-muted-foreground">{t("about.certification.content")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
