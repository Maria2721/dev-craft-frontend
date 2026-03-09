import { Container } from '../Container/Container';
import { Navigation } from '../Navigation/Navigation';
import { Logo } from '../ui';
import { UserControls } from '../UserControls/UserControls';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <Logo />
        <Navigation />
        <UserControls />
      </Container>
    </header>
  );
}

export { Header };
