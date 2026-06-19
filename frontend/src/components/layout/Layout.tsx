import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from './Footer';
import CartDrawer from '../CartDrawer';

declare const Tawk_API: { showWidget: () => void; hideWidget: () => void } | undefined;

const EXCLUDED_PATHS = ['/tienda'];

function toggleTawk(visible: boolean) {
  if (typeof Tawk_API !== 'undefined') {
    if (visible) {
      Tawk_API.showWidget();
    } else {
      Tawk_API.hideWidget();
    }
  }
}

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://embed.tawk.to/6a34a7529c74b11d4c6f433a/1jreqr76f';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src*="tawk.to"]');
      if (existingScript) existingScript.remove();
    };
  }, []);

  useEffect(() => {
    const visible = !EXCLUDED_PATHS.includes(pathname);

    toggleTawk(visible);

    const interval = setInterval(() => {
      if (typeof Tawk_API !== 'undefined') {
        toggleTawk(visible);
        clearInterval(interval);
      }
    }, 200);

    setTimeout(() => clearInterval(interval), 5000);

    return () => clearInterval(interval);
  }, [pathname]);

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col" style={{ backgroundColor: '#0F172A' }}>
      <Navbar />
      <Outlet />
      <Footer />
      <CartDrawer />
    </div>
  );
}
