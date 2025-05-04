import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: resumeData, isLoading } = useQuery({
    queryKey: ['/api/resume'],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t("contact.form.success"),
        description: t("contact.form.successMessage"),
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title">{t("contact.title")}</h2>
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-background p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-primary">{t("contact.form.title")}</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.name")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t("contact.form.namePlaceholder")} 
                          {...field} 
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.email")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t("contact.form.emailPlaceholder")} 
                          {...field} 
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.subject")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t("contact.form.subjectPlaceholder")} 
                          {...field} 
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.message")}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t("contact.form.messagePlaceholder")} 
                          rows={4} 
                          className="form-input" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.send")} 
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="space-y-8">
            <div className="bg-background p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-primary">{t("contact.info.title")}</h3>
              
              {isLoading ? (
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                        <Skeleton className="h-5 w-5 rounded-full" />
                      </div>
                      <div>
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-6 w-40" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <Mail className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">{t("contact.info.email")}</p>
                      <p className="font-medium">{resumeData?.personalInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <Phone className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">{t("contact.info.phone")}</p>
                      <p className="font-medium">{resumeData?.personalInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">{t("contact.info.location")}</p>
                      <p className="font-medium">{resumeData?.personalInfo.location}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
