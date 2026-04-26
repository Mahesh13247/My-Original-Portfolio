import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ProjectDetail from './pages/ProjectDetail';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { useScroll, useSpring, motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import FloatingScrollToTop from './components/FloatingScrollToTop';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AnimatePresence mode="wait">
          {isInitializing && <Loader key="loader" />}
        </AnimatePresence>

        <Router>
          <ScrollToTop />
          <FloatingScrollToTop />
          <div className="flex flex-col min-h-screen overflow-x-hidden relative">
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left shadow-[0_0_10px_var(--neon-glow)]"
              style={{ scaleX }}
            />
            <div className="bg-grid fixed inset-0 pointer-events-none z-0 opacity-20" />
            <div className="bg-mesh" />
            <div className="relative z-10 flex flex-col min-h-screen">
              <Toaster position="top-right" />
              <Navbar />
              <main className="flex-grow pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsConditions />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>

                  <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
