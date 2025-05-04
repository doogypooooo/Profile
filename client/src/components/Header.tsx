import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { href: "#about", label: t("nav.about") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#education", label: t("nav.education") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 shadow-md transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold font-sans">
              <span className="text-primary">정종현</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className="nav-item"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-primary"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card absolute w-full">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className="mobile-nav-item" 
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
