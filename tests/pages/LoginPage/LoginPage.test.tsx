import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import LoginPage from '@/pages/LoginPage/LoginPage';

import { ROUTES } from '@/constants';

const mockLoginAccount = vi.fn();
const mockNavigate = vi.fn();

vi.mock('@/hooks/useLogin', () => ({
  useLogin: () => ({
    loginAccount: mockLoginAccount,
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('submits form, calls API and navigates to home', async () => {
    const user = userEvent.setup();

    mockLoginAccount.mockResolvedValueOnce({});

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), 'test@test.com');
    await user.type(screen.getByLabelText(/password/i), '123456');

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(mockLoginAccount).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
    });

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME);
  });
});
