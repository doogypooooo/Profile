tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin/admin-layout";
import { getQueryFn } from "@/lib/queryClient";
import { PersonalInfo } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "wouter";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  location: z.string().optional(),
  military: z.string().optional(),
  introduction: z.string().optional(),
  experience: z.string().optional(),
  desiredSalary: z.string().optional(),
});

export default function PersonalInfoPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: personalInfo } = useQuery<PersonalInfo>({
    queryKey: ["/api/admin/personal-info"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      military: "",
      introduction: "",
      experience: "",
      desiredSalary: "",
    },
  });

  const updatePersonalInfoMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch(`/api/admin/personal-info/${personalInfo?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to update personal info");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/personal-info"] });
      toast({
        title: "개인 정보 업데이트 성공",
        description: "개인 정보가 성공적으로 업데이트되었습니다.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "개인 정보 업데이트 실패",
        description: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updatePersonalInfoMutation.mutate(values);
  }

  const deletePersonalInfoMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/admin/personal-info/${personalInfo?.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete personal info");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/personal-info"] });
      toast({
        title: "개인 정보 삭제 성공",
        description: "개인 정보가 성공적으로 삭제되었습니다.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "개인 정보 삭제 실패",
        description: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
      });
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-6">개인 정보 수정</h1>
        {personalInfo && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={personalInfo?.name}
                        placeholder="이름을 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                  <div className="flex justify-end gap-2">
                <Button type="button" variant="destructive" onClick={deletePersonalInfoMutation.mutate}>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={personalInfo?.email}
                        placeholder="이메일을 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>연락처</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={personalInfo?.phone}
                        placeholder="연락처를 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>거주지</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={personalInfo?.location}
                        placeholder="거주지를 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="military"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>군필 여부</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={personalInfo?.military}
                        placeholder="군필 여부를 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="introduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자기소개</FormLabel>
                    <FormControl>
                      <Textarea
                        defaultValue={personalInfo?.introduction}
                        placeholder="자기소개를 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>경력</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={personalInfo?.experience}
                        placeholder="경력을 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>희망 연봉</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={personalInfo?.desiredSalary}
                        placeholder="희망 연봉을 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
                  취소
                </Button>
                <Button type="submit">저장</Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </AdminLayout>
  );
}