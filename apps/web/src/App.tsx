import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Messages from './pages/Messages';
import UserProfile from './pages/UserProfile';
import Users from './pages/Users';
import CommunityLayout from './layouts/CommunityLayout';
import CommunityHome from './pages/community/CommunityHome';
import CommunityDashboard from './pages/community/CommunityDashboard';
import CommunityDetail from './pages/community/CommunityDetail';
import CareerHub from './pages/community/CareerHub';
import AIAssistant from './pages/community/AIAssistant';
import CommunityProfile from './pages/community/CommunityProfile';

// Protected Route Wrapper
import PendingApproval from './pages/PendingApproval';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Enforce email verification (if requested)
  if (!currentUser.emailVerified) {
    return <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Please verify your email</h2>
      <p className="text-muted-foreground max-w-md">We sent a verification link to {currentUser.email}. Please check your inbox and click the link to continue.</p>
    </div>;
  }

  if (userProfile && userProfile.status === 'Pending') {
    return <PendingApproval />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="messages" element={<Messages />} />
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      <Route 
        path="/community" 
        element={
          <ProtectedRoute>
            <CommunityLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CommunityDashboard />} />
        <Route path="explore" element={<CommunityHome />} />
        <Route path="career" element={<CareerHub />} />
        <Route path="ai" element={<AIAssistant />} />
        <Route path="profile" element={<CommunityProfile />} />
        <Route path=":id" element={<CommunityDetail />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
