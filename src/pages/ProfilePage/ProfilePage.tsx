import { Button } from '@/components/ui';

import { logout } from '@/redux/slices/authSlice';

import { useAppDispatch } from '@/hooks/useRedux';

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Profile Page</h1>
      <Button onClick={() => dispatch(logout())} variant="secondary">
        Logout
      </Button>
    </>
  );
}
