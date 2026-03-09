import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
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
        <Route path="/" element={<Navigate to="/map" replace />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}
