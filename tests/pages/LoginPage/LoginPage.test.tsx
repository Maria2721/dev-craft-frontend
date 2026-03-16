import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginPage from '@/pages/LoginPage/LoginPage';

import { createTestStore, withProviders } from '../../test-utils';

describe('LoginPage', () => {
  it('dispatches login when Login button is clicked', async () => {
    const user = userEvent.setup();
    const store = createTestStore({ auth: { isAuthenticated: false } });

    render(withProviders(<LoginPage />, { store }));

    const loginButton = screen.getByRole('button', { name: /login/i });
    await user.click(loginButton);

    expect(store.getState().auth.isAuthenticated).toBe(true);
  });
});
