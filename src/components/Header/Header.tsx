import { useState } from 'react';

import { Container } from '../Container/Container';
import { Logo } from '../ui';
import { BurgerButton } from './BurgerButton/BurgerButton';
import styles from './Header.module.scss';
import { HeaderActions } from './HeaderActions/HeaderActions';
import { Navigation } from './Navigation/Navigation';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <Container>
        <Logo />

        <Navigation isOpen={isMenuOpen} onNavigate={closeMenu} />
        <HeaderActions />

        <BurgerButton onClick={toggleMenu} isOpen={isMenuOpen} />
      </Container>
    </header>
  );
}

export { Header };
