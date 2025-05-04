import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
      className="px-3 py-1 rounded-full text-primary border border-primary hover:bg-primary hover:text-primary-foreground"
    >
      {language === 'ko' ? 'EN' : 'KR'}
    </Button>
  );
};

export default LanguageToggle;
