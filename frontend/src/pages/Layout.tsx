import type { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import '../css/Layout.css';


function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout-container">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
