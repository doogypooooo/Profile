import { useLanguage } from "@/hooks/use-language";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-card">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-primary mb-2">정종현</h2>
            <p className="text-muted-foreground">{t("hero.jobTitle")}</p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Github Profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:doogypoo@naver.com" 
              className="social-link"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-muted text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
