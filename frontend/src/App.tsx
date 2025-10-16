import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagementDashboard from "./pages/ManagementDashboard";
import TimeclockEntry from "./pages/TimeclockEntry";
import TimekeepingHistory from "./pages/TimekeepingHistory";
import Requests from "./pages/Requests";
import EmployeeManagement from "./pages/EmployeeManagement";
import EmployeeDetail from "./pages/EmployeeDetail";
import TimeclockApprovals from "./pages/TimeclockApprovals";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            <Route path="/timeclock" element={<TimeclockEntry />} />
            <Route path="/history" element={<TimekeepingHistory />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/management" element={<ManagementDashboard />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/employees/:id" element={<EmployeeDetail />} />
            <Route path="/approvals" element={<TimeclockApprovals />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
