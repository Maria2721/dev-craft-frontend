import { login, logout } from '@/redux/slices/authSlice';
import authReducer from '@/redux/slices/authSlice';

describe('authSlice', () => {
  it('has initial state with isAuthenticated false', () => {
    const state = authReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({ isAuthenticated: false });
  });

  it('sets isAuthenticated to true on login', () => {
    const state = authReducer({ isAuthenticated: false }, login());
    expect(state.isAuthenticated).toBe(true);
  });

  it('sets isAuthenticated to false on logout', () => {
    const state = authReducer({ isAuthenticated: true }, logout());
    expect(state.isAuthenticated).toBe(false);
  });
});
