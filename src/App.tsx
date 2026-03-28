import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AIAssistantProvider } from './components/AIAssistant/AIAssistantProvider';
import { Layout } from './components/Layout/Layout';
import ProtectedRoute from './components/routes/ProtectedRoute/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute/PublicRoute';
import { ROUTES } from './constants';
import { useAppDispatch } from './hooks/useRedux';
import InterviewPage from './pages/InterviewPage/InterviewPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MapPage from './pages/MapPage/MapPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProgressPage from './pages/ProgressPage/ProgressPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { login } from './redux/slices/authSlice';
import { getAccessToken } from './utils/tokenStorage';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      dispatch(login());
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.MAP} replace />} />
          <Route path={ROUTES.MAP} element={<MapPage />} />

          <Route
            path={ROUTES.PROGRESS}
            element={
              <ProtectedRoute>
                <ProgressPage />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.INTERVIEW}
            element={
              <ProtectedRoute>
                <InterviewPage />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />

          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path={ROUTES.REGISTER}
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop
        pauseOnFocusLoss
      />
      <AIAssistantProvider />
    </>
  );
}
