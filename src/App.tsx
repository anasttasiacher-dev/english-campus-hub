import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import StudentLayout from "./components/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import ProgramPage from "./pages/student/ProgramPage";
import LessonPage from "./pages/student/LessonPage";
import TrainerPage from "./pages/student/TrainerPage";
import LibraryPage from "./pages/student/LibraryPage";
import ProfilePage from "./pages/student/ProfilePage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProgram from "./pages/admin/AdminProgram";
import AdminLessons from "./pages/admin/AdminLessons";
import AdminTrainer from "./pages/admin/AdminTrainer";
import AdminLibrary from "./pages/admin/AdminLibrary";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/app" element={<StudentLayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path="program" element={<ProgramPage />} />
              <Route path="lesson/:lessonId" element={<LessonPage />} />
              <Route path="trainer" element={<TrainerPage />} />
              <Route path="library" element={<LibraryPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="program" element={<AdminProgram />} />
              <Route path="lessons" element={<AdminLessons />} />
              <Route path="trainer" element={<AdminTrainer />} />
              <Route path="library" element={<AdminLibrary />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
