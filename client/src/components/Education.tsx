import { useQuery } from "@tanstack/react-query";
import { GraduationCap, School } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";

const Education = () => {
  const { t } = useLanguage();
  const { data: resumeData, isLoading } = useQuery({
    queryKey: ['/api/resume'],
  });

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title">{t("education.title")}</h2>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-7 w-48 mx-auto mb-2" />
                <Skeleton className="h-5 w-32 mx-auto mb-2" />
                <Skeleton className="h-5 w-36 mx-auto mb-2" />
                <Skeleton className="h-5 w-40 mx-auto" />
              </div>
            ))
          ) : (
            resumeData?.education.map((edu, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {edu.type === "university" ? (
                    <GraduationCap className="text-primary h-8 w-8" />
                  ) : (
                    <School className="text-primary h-8 w-8" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{edu.institution}</h3>
                <p className="text-center text-primary mb-2">{edu.period}</p>
                <p className="text-center text-muted-foreground">
                  {edu.department && `${edu.department}`}
                </p>
                <p className="text-center font-medium">
                  {edu.major && `${edu.major} ${t("education.graduate")}`}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
