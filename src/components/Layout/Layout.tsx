import { Outlet } from 'react-router-dom';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import styles from './Layout.module.scss';

function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export { Layout };
