import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
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
