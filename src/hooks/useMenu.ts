import { useCallback, useEffect, useState } from 'react';

const useMenu = (breakpoint: number) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleResize = () => {
      if (window.innerWidth > breakpoint) {
        closeMenu();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint, isMenuOpen, closeMenu]);

  return { isMenuOpen, toggleMenu, closeMenu };
};

export { useMenu };
