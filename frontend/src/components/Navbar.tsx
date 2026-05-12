import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Grupos', href: '#grupos' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav
      id="main-nav"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.80)',
        backdropFilter: 'blur(16px)',
        boxShadow: isScrolled ? '0 4px 20px rgba(15,23,42,0.15)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <span className="text-3xl">🐧</span>
          <span className="text-xl font-bold text-white tracking-tight">
            Pingu <span className="text-amber">Importaciones</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-medium text-sm tracking-wide transition-colors duration-300 hover:text-amber"
                style={{ color: 'rgba(203, 213, 225, 0.8)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(203, 213, 225, 0.8)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#grupos"
          className="hidden md:inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 text-sm"
          style={{ boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)' }}
        >
          Únete a la Colonia
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-white hover:text-amber transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isMobileOpen ? '400px' : '0px',
          opacity: isMobileOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-6 space-y-4" style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(16px)' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="block font-medium transition-colors duration-300 py-2 hover:text-amber"
              style={{ color: 'rgba(203, 213, 225, 0.8)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#grupos"
            onClick={() => setIsMobileOpen(false)}
            className="block text-center bg-amber hover:bg-amber-dark text-oxford font-semibold px-6 py-3 rounded-full transition-all duration-300 mt-4"
          >
            Únete a la Colonia
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;