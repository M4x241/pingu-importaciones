import { useState, useEffect } from 'react';
import { Menu, X, User, Package, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Inicio', to: '/' },
    { label: 'Tienda', to: '/tienda' },
    { label: 'Grupos', to: '/#grupos' },
    { label: 'Empresas', to: '/business' },
    { label: 'Contacto', to: '/#contacto' },
  ];

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <nav
      id="main-nav"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 !p-4"
      style={{
        backgroundColor: isScrolled
          ? "rgba(15, 23, 42, 0.95)"
          : "rgba(15, 23, 42, 0.80)",
        backdropFilter: "blur(16px)",
        boxShadow: isScrolled ? "0 4px 20px rgba(15,23,42,0.15)" : "none",
      }}
    >
      <div className="w-full mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-3xl">🐧</span>
          <span className="text-xl font-bold text-white tracking-tight">
            Pingu <span className="text-amber">Importaciones</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="font-medium text-lg tracking-wide transition-colors duration-300 hover:text-amber"
                style={{
                  color: isActive(link.to)
                    ? "#F59E0B"
                    : "rgba(203, 213, 225, 0.8)",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/tienda"
            className="flex items-center gap-2 text-lg font-medium transition-colors duration-300 hover:text-amber"
            style={{ color: "rgba(203, 213, 225, 0.8)" }}
          >
            <ShoppingCart className="w-4 h-4" />
            Tienda
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 text-lg font-medium transition-colors duration-300 hover:text-amber !px-4 !py-2 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "rgba(203, 213, 225, 0.8)",
            }}
          >
            <User className="w-4 h-4" />
            Ingresar
          </Link>
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-semibold !px-6 !py-2.5 rounded-full transition-all duration-300 hover:scale-105 text-lg group shadow-2xl"
            style={{ boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)" }}
          >
            <Package className="w-4 h-4" />
            Comprar Ahora
          </Link>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-white hover:text-amber transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isMobileOpen ? "500px" : "0px",
          opacity: isMobileOpen ? 1 : 0,
        }}
      >
        <div
          className="px-6 pb-6 space-y-4"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(16px)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block font-medium transition-colors duration-300 py-2 hover:text-amber"
              style={{
                color: isActive(link.to)
                  ? "#F59E0B"
                  : "rgba(203, 213, 225, 0.8)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="block text-center font-semibold px-6 py-3 rounded-full transition-all duration-300 mt-4"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "rgba(203, 213, 225, 0.8)",
            }}
          >
            Ingresar
          </Link>
          <Link
            to="/tienda"
            className="block text-center font-semibold px-6 py-3 rounded-full transition-all duration-300 mt-4"
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              color: "#F59E0B",
            }}
          >
            Comprar Ahora
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
