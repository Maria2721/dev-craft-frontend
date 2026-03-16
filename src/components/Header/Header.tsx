import { useMenu } from '@/hooks/useMenu';

import { Container } from '../Container/Container';
import { Logo } from '../ui';
import { BurgerButton } from './BurgerButton/BurgerButton';
import styles from './Header.module.scss';
import { Navigation } from './Navigation/Navigation';

const MOBILE_BREAKPOINT = 768;

function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu(MOBILE_BREAKPOINT);
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Logo onClick={closeMenu} />

        <Navigation isOpen={isMenuOpen} onNavigate={closeMenu} />

        <BurgerButton onClick={toggleMenu} isOpen={isMenuOpen} />
      </Container>
    </header>
  );
}

export { Header };
