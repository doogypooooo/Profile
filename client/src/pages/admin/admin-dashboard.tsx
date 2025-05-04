import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Briefcase, Code, GraduationCap, Tag, Settings } from "lucide-react";
import { getQueryFn } from "@/lib/queryClient";
import { Skill, Experience, Education, Project, Keyword } from "@shared/schema";

export default function AdminDashboard() {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/admin/projects"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: experiences } = useQuery<Experience[]>({
    queryKey: ["/api/admin/experiences"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: educations } = useQuery<Education[]>({
    queryKey: ["/api/admin/educations"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: skills } = useQuery<Skill[]>({
    queryKey: ["/api/admin/skills"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: keywords } = useQuery<Keyword[]>({
    queryKey: ["/api/admin/keywords"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-6">관리자 대시보드</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 개인정보 관리 카드 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">개인 정보</CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                이력서에 표시될 개인 정보를 관리합니다.
              </p>
              <Link href="/admin/personal-info">
                <Button variant="outline" className="w-full justify-between">
                  관리하기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 경력 관리 카드 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">경력 사항</CardTitle>
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                경력 사항을 관리합니다. 현재 {experiences?.length || 0}개 등록됨.
              </p>
              <Link href="/admin/experiences">
                <Button variant="outline" className="w-full justify-between">
                  관리하기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 교육 관리 카드 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">교육 정보</CardTitle>
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                교육 이력을 관리합니다. 현재 {educations?.length || 0}개 등록됨.
              </p>
              <Link href="/admin/educations">
                <Button variant="outline" className="w-full justify-between">
                  관리하기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 프로젝트 관리 카드 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">프로젝트</CardTitle>
              <Code className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                프로젝트 정보를 관리합니다. 현재 {projects?.length || 0}개 등록됨.
              </p>
              <Link href="/admin/projects">
                <Button variant="outline" className="w-full justify-between">
                  관리하기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 스킬 관리 카드 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">스킬</CardTitle>
              <Tag className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                기술 스택 및 키워드를 관리합니다. 스킬 {skills?.length || 0}개, 키워드 {keywords?.length || 0}개 등록됨.
              </p>
              <Link href="/admin/skills">
                <Button variant="outline" className="w-full justify-between">
                  관리하기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 설정 카드 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">설정</CardTitle>
              <Settings className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                계정 설정 및 웹사이트 관련 설정을 변경합니다.
              </p>
              <Link href="/admin/settings">
                <Button variant="outline" className="w-full justify-between">
                  관리하기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}