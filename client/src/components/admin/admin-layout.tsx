import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

function SidebarLink({ href, label, icon, isActive, onClick }: SidebarLinkProps) {
  return (
    <Link href={href}>
      <Button
        variant={isActive ? "default" : "ghost"}
        className={cn(
          "w-full justify-start gap-2",
          isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
        )}
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderSidebarLinks = (closeFn?: () => void) => (
    <div className="flex flex-col gap-1">
      <SidebarLink
        href="/admin"
        label="대시보드"
        icon={<LayoutDashboard className="h-4 w-4" />}
        isActive={location === "/admin"}
        onClick={closeFn}
      />
      <SidebarLink
        href="/admin/personal-info"
        label="개인 정보"
        icon={<FileText className="h-4 w-4" />}
        isActive={location === "/admin/personal-info"}
        onClick={closeFn}
      />
      <SidebarLink
        href="/admin/experiences"
        label="경력 사항"
        icon={<Briefcase className="h-4 w-4" />}
        isActive={location === "/admin/experiences"}
        onClick={closeFn}
      />
      <SidebarLink
        href="/admin/educations"
        label="교육 정보"
        icon={<GraduationCap className="h-4 w-4" />}
        isActive={location === "/admin/educations"}
        onClick={closeFn}
      />
      <SidebarLink
        href="/admin/projects"
        label="프로젝트"
        icon={<Code className="h-4 w-4" />}
        isActive={location === "/admin/projects"}
        onClick={closeFn}
      />
      <SidebarLink
        href="/admin/settings"
        label="설정"
        icon={<Settings className="h-4 w-4" />}
        isActive={location === "/admin/settings"}
        onClick={closeFn}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 상단 헤더 */}
      <header className="bg-white border-b sticky top-0 z-30 h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          {/* 모바일 메뉴 */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">관리자 메뉴</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {renderSidebarLinks(closeMobileMenu)}
              <div className="mt-auto pt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>로그아웃</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/admin">
            <h1 className="text-xl font-bold">포트폴리오 관리자</h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden md:inline-block">
            {user?.username} 님
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden md:inline-block">로그아웃</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* 사이드바 */}
        <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 bg-white border-r p-4 flex-col">
          <nav className="flex flex-col gap-1 flex-1">
            {renderSidebarLinks()}
          </nav>
          <div className="pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>로그아웃</span>
            </Button>
          </div>
        </aside>

        {/* 메인 컨텐츠 */}
        <main className="flex-1 lg:ml-64 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}