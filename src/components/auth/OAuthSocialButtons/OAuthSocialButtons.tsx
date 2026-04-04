import { Button } from '@/components/ui';

import styles from './OAuthSocialButtons.module.scss';

function oauthStartUrl(path: string): string {
  const base = import.meta.env.VITE_API_URL;
  if (!base) {
    return path;
  }
  const trimmed = base.replace(/\/$/, '');
  return `${trimmed}${path}`;
}

function OAuthSocialButtons() {
  const apiBase = import.meta.env.VITE_API_URL;
  if (!apiBase) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.hint}>Or continue with</p>
      <div className={styles.row}>
        <Button
          type="button"
          variant="secondary"
          className={styles.btn}
          onClick={() => {
            window.location.href = oauthStartUrl('/auth/google');
          }}
        >
          Google
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={styles.btn}
          onClick={() => {
            window.location.href = oauthStartUrl('/auth/github');
          }}
        >
          GitHub
        </Button>
      </div>
    </div>
  );
}

export default OAuthSocialButtons;
