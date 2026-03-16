import 'react-toastify/dist/ReactToastify.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header } from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from './constants';
import InterviewPage from './pages/InterviewPage/InterviewPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MapPage from './pages/MapPage/MapPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProgressPage from './pages/ProgressPage/ProgressPage';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.MAP} replace />}></Route>
        <Route path={ROUTES.MAP} element={<MapPage />}></Route>
        <Route path={ROUTES.LOGIN} element={<LoginPage />}></Route>
        <Route
          path={ROUTES.PROGRESS}
          element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={ROUTES.INTERVIEW}
          element={
            <ProtectedRoute>
              <InterviewPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop
        pauseOnFocusLoss
      />
    </div>
  );
}
