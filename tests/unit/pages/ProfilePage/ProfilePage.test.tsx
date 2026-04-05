import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProfilePage from '@/pages/ProfilePage/ProfilePage';

import { createTestStore, withProviders } from '../../test-utils';

describe('ProfilePage', () => {
  it('dispatches logout when Logout button is clicked', async () => {
    const user = userEvent.setup();
    const store = createTestStore({ auth: { isAuthenticated: true } });

    render(withProviders(<ProfilePage />, { store }));

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await user.click(logoutButton);

    expect(store.getState().auth.isAuthenticated).toBe(false);
  });
});
