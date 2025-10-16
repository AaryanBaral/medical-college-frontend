import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { RequireAuth } from "./components/RequireAuth";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Admissions from "./pages/Admissions";
import Faculty from "./pages/Faculty";
import StudentPortal from "./pages/StudentPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/login" element={<Auth />} />
              <Route path="/auth/register" element={<Auth />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route
                path="/portal"
                element={
                  <RequireAuth roles={['student']}>
                    <StudentPortal />
                  </RequireAuth>
                }
              />
              <Route
                path="/portal/timetable"
                element={
                  <RequireAuth roles={['student']}>
                    <div className="min-h-screen p-8">
                      <h1 className="text-3xl font-heading font-bold">Timetable</h1>
                      <p className="text-muted-foreground mt-2">Your class schedule will appear here.</p>
                    </div>
                  </RequireAuth>
                }
              />
              <Route
                path="/portal/attendance"
                element={
                  <RequireAuth roles={['student']}>
                    <div className="min-h-screen p-8">
                      <h1 className="text-3xl font-heading font-bold">Attendance</h1>
                      <p className="text-muted-foreground mt-2">Your attendance records will appear here.</p>
                    </div>
                  </RequireAuth>
                }
              />
              <Route
                path="/portal/grades"
                element={
                  <RequireAuth roles={['student']}>
                    <div className="min-h-screen p-8">
                      <h1 className="text-3xl font-heading font-bold">Grades</h1>
                      <p className="text-muted-foreground mt-2">Your grades will appear here.</p>
                    </div>
                  </RequireAuth>
                }
              />
              <Route
                path="/portal/assignments"
                element={
                  <RequireAuth roles={['student']}>
                    <div className="min-h-screen p-8">
                      <h1 className="text-3xl font-heading font-bold">Assignments</h1>
                      <p className="text-muted-foreground mt-2">Your assignments will appear here.</p>
                    </div>
                  </RequireAuth>
                }
              />
              <Route
                path="/portal/materials"
                element={
                  <RequireAuth roles={['student']}>
                    <div className="min-h-screen p-8">
                      <h1 className="text-3xl font-heading font-bold">Course Materials</h1>
                      <p className="text-muted-foreground mt-2">Course materials will appear here.</p>
                    </div>
                  </RequireAuth>
                }
              />
              <Route path="/programs" element={<div className="min-h-screen p-8"><h1 className="text-3xl font-heading font-bold">Programs</h1></div>} />
              <Route path="/courses" element={<div className="min-h-screen p-8"><h1 className="text-3xl font-heading font-bold">Courses</h1></div>} />
              <Route path="/departments" element={<div className="min-h-screen p-8"><h1 className="text-3xl font-bold">Departments</h1></div>} />
              <Route path="/research" element={<div className="min-h-screen p-8"><h1 className="text-3xl font-heading font-bold">Research</h1></div>} />
              <Route path="/library" element={<div className="min-h-screen p-8"><h1 className="text-3xl font-heading font-bold">Digital Library</h1></div>} />
              <Route path="/notices" element={<div className="min-h-screen p-8"><h1 className="text-3xl font-heading font-bold">Notices</h1></div>} />
              <Route path="/alumni" element={<div className="min-h-screen p-8"><h1 className="text-3xl font-heading font-bold">Alumni</h1></div>} />
              <Route path="/grievances" element={<div className="min-h-screen p-8"><h1 className="text-3xl font-heading font-bold">Grievances</h1></div>} />
              <Route path="/payments" element={<div className="min-h-screen p-8"><h1 className="text-3xl font-heading font-bold">Payments</h1></div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
