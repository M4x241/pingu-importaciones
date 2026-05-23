import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="font-sans antialiased min-h-screen flex flex-col" style={{ backgroundColor: '#0F172A' }}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
