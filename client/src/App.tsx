import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LanguageProvider } from "./hooks/use-language";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={AdminDashboard} adminOnly />
      <ProtectedRoute path="/admin/:rest*" component={AdminDashboard} adminOnly />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");
  const isAuthRoute = location === "/auth";

  if (isAdminRoute || isAuthRoute) {
    return (
      <main className="min-h-screen">
        <Router />
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Router />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <AppContent />
            </TooltipProvider>
          </LanguageProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
