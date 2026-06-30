import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';

// Placeholder for the main dashboard layout
function Dashboard() {
  const { currentUser, signOut } = useAuth();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">VaultWork Dashboard</h1>
      <p>Welcome, {currentUser?.email}</p>
      <button 
        onClick={signOut}
        className="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg"
      >
        Sign Out
      </button>
    </div>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
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
