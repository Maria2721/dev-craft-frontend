import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loader } from '@/components/ui';

import { login } from '@/redux/slices/authSlice';

import { saveTokens } from '@/utils/tokenStorage';

import { useAppDispatch } from '@/hooks/useRedux';

import { exchangeOAuthCode } from '@/api/authApi';
import { ROUTES } from '@/constants';

/** Prevents double /auth/oauth/exchange in React Strict Mode (dev), which would consume the one-time code twice. */
const oauthExchangeInFlight = new Set<string>();

function oauthErrorMessage(code: string | null): string {
  switch (code) {
    case 'oauth_denied':
      return 'Sign-in was cancelled';
    case 'oauth_invalid_state':
    case 'oauth_missing_params':
      return 'Invalid sign-in session. Please try again';
    case 'oauth_no_email':
      return 'Your account did not provide an email';
    case 'oauth_account_conflict':
      return 'This email is already linked to another sign-in method';
    case 'oauth_provider_error':
      return 'Sign-in with the provider failed. Please try again';
    default:
      return 'Sign-in failed';
  }
}

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const error = searchParams.get('error');
    const code = searchParams.get('code');

    if (error) {
      toast.error(oauthErrorMessage(error));
      void navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    if (!code) {
      toast.error(oauthErrorMessage('oauth_missing_params'));
      void navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    if (oauthExchangeInFlight.has(code)) {
      return;
    }
    oauthExchangeInFlight.add(code);

    void (async () => {
      try {
        const res = await exchangeOAuthCode(code);
        saveTokens(res.accessToken, res.refreshToken);
        dispatch(login());
        void navigate(ROUTES.HOME, { replace: true });
      } catch {
        oauthExchangeInFlight.delete(code);
        toast.error('Could not complete sign-in');
        void navigate(ROUTES.LOGIN, { replace: true });
      }
    })();
  }, [searchParams, dispatch, navigate]);

  return <Loader size="lg" />;
}
