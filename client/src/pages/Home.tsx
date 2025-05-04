import { useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { useLanguage } from "@/hooks/use-language";

const Home = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === 'ko' 
      ? '정종현 - 서버 개발자 포트폴리오' 
      : 'Jonghyun Jung - Server Developer Portfolio';
  }, [language]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
