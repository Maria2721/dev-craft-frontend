import { Button } from '@/components/ui';

import { useAppDispatch } from '../../hooks/useRedux';
import { logout } from '../../redux/slices/authSlice';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  return (
    <>
      <h1>Dashboard Page</h1>
      <Button onClick={() => dispatch(logout())} variant="secondary">
        Logout
      </Button>
    </>
  );
}
