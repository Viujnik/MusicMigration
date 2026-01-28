import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Layout/Header';
import { ProtectedRoute } from './components/Layout/ProtectedRoute';
import { AuthModal } from './components/Auth/AuthModal';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { isAuthModalOpen, authModalMode, closeAuthModal } = useAuth();

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-60px)] pt-6 md:pt-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Routes>
      </main>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialMode={authModalMode} />
      <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: 'rgba(17, 24, 39, 0.95)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px' }, success: { iconTheme: { primary: '#0ea5e9', secondary: '#fff' } }, error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } } }} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;