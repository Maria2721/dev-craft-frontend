import { Button } from '@/components/ui';

import { logout } from '@/redux/slices/authSlice';

import { clearTokens } from '@/utils/tokenStorage';

import { useAppDispatch } from '@/hooks/useRedux';

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const handleLogoutButton = () => {
    clearTokens();
    dispatch(logout());
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
