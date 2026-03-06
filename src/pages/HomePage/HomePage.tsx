import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';

import { useAppDispatch } from '../../hooks/useRedux';
import { login } from '../../redux/slices/authSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginButton = () => {
    dispatch(login());
    void navigate('/dashboard');
  };
  return (
    <>
      <h1>Home Page</h1>
      <Button onClick={handleLoginButton}>Login</Button>
    </>
  );
}
