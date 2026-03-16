import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';

import { logout } from '@/redux/slices/authSlice';

import { clearTokens } from '@/utils/tokenStorage';

import { useAppDispatch } from '@/hooks/useRedux';

import { ROUTES } from '@/constants';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    clearTokens();
    dispatch(logout());
    void navigate(ROUTES.HOME);
  };

  return (
    <>
      <h1>Profile Page</h1>
      <Button onClick={handleLogoutButton} variant="secondary">
        Logout
      </Button>
    </>
  );
}
