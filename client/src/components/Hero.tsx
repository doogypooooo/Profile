import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Briefcase } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  const { t, language } = useLanguage();
  
  const { data: resumeData, isLoading } = useQuery({
    queryKey: ['/api/resume'],
  });

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute w-96 h-96 bg-secondary rounded-full blur-3xl -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-primary rounded-full blur-3xl bottom-0 right-0"></div>
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-3/4 mb-4" />
                <Skeleton className="h-8 w-1/2 mb-6" />
                <Skeleton className="h-28 w-full mb-8" />
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-32" />
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
                  <span className="text-primary">{t("hero.greeting")}</span><br />
                  {t("hero.introduction", { name: resumeData?.personalInfo.name.split('(')[0] || "" })}
                </h1>
                <p className="text-xl md:text-2xl mb-6 text-muted-foreground">
                  {t("hero.jobTitle")}
                </p>
                <p className="text-lg mb-8 leading-relaxed">
                  {t("hero.summary", { 
                    years: resumeData?.personalInfo.experience || "16", 
                  })}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#contact" className="btn-primary">
                    {t("hero.contactButton")} <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                  <a href="#experience" className="btn-secondary">
                    {t("hero.experienceButton")} <Briefcase className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </>
            )}
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="w-64 h-64 md:w-80 md:h-80 relative mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-lg opacity-20"></div>
              <div className="rounded-full w-full h-full overflow-hidden border-4 border-card">
                <img 
                  src="/assets/profile.jpg"
                  alt={t("hero.profileImageAlt")}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
