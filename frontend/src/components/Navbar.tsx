import { useState, useEffect } from "react";
import { Menu, X, User, Package, ShoppingCart, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, setCartOpen } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Inicio", to: "/" },
    { label: "Tienda", to: "/tienda" },
    { label: "Redes", to: "/redes" },
    { label: "Escribenos", to: "/message" },
  ];

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  // Bloquear el scroll del cuerpo cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileOpen]);

  return (
    <>
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
        <div className="w-full mx-auto !px-6 py-4 flex justify-between items-center relative z-50">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-3xl">🐧</span>
            <span className="text-xl font-bold text-white tracking-tight">
              Pingu <span className="text-amber">Importaciones</span>
            </span>
          </Link>

          {/* Enlaces de Escritorio (Intactos) */}
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

          {/* Botones de Escritorio */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 text-lg font-medium transition-colors duration-300 hover:text-amber relative"
              style={{ color: "rgba(203, 213, 225, 0.8)" }}
            >
              <ShoppingCart className="w-4 h-4" />
              Carrito
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-4 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "#F59E0B", color: "#0F172A" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* <Link
                  to="/tienda"
                  className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-semibold !px-6 !py-2.5 rounded-full transition-all duration-300 hover:scale-105 text-lg group shadow-2xl"
                  style={{ boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)" }}
                >
                  <Package className="w-4 h-4" />
                  Comprar Ahora
                </Link> */}
                <span className="text-xm text-white/70 ">{user?.nombres}</span>
                {(user?.role === "empresa" || user?.role === "cliente") && (
                  <Link
                    to={user?.role === "empresa" ? "/business" : "/client"}
                    className="text-sm text-amber hover:text-amber-light transition-colors bg-amber/10 !px-4 !py-2 rounded-full font-medium"
                  >
                    Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="flex items-center gap-2 text-lg font-medium transition-colors duration-300 hover:text-red-400 !px-4 !py-2 rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(203, 213, 225, 0.8)",
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Salir
                </button>
              </div>
            ) : (
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
            )}
          </div>

          {/* Botón Hamburguesa Móvil */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white hover:text-amber transition-colors duration-300 p-2 rounded-lg"
            style={{
              background: isMobileOpen
                ? "rgba(255,255,255,0.05)"
                : "transparent",
            }}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </nav>

      {/* --- NUEVO MENÚ MÓVIL (ISLA FLOTANTE) --- */}

      {/* 1. Fondo difuminado oscuro (Overlay) */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
        style={{ top: "80px" }}
      />

      {/* 2. Tarjeta del menú */}
      <div
        className={`md:hidden fixed left-4 right-4 z-50 transition-all duration-300 ease-out transform origin-top ${
          isMobileOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        }`}
        style={{ top: "100px" }}
      >
        <div
          className="p-5 rounded-3xl shadow-2xl border border-white/10"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.98)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Lista de enlaces */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileOpen(false)}
                  className="block font-semibold text-lg px-5 py-3.5 rounded-2xl transition-all duration-300"
                  style={{
                    backgroundColor: active
                      ? "rgba(245, 158, 11, 0.1)"
                      : "transparent",
                    color: active ? "#F59E0B" : "rgba(203, 213, 225, 0.9)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Sección de Botones Inferiores */}
          <div className="pt-5 mt-4 border-t border-white/10 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <div className="text-center text-sm text-white/70 px-4 py-2">
                  {user?.nombres} {user?.apellidos}
                </div>
                {(user?.role === "empresa" || user?.role === "cliente") && (
                  <Link
                    to={user?.role === "empresa" ? "/business" : "/client"}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full text-lg font-bold px-6 py-4 rounded-2xl transition-all duration-300"
                    style={{
                      background: "rgba(245, 158, 11, 0.1)",
                      color: "#F59E0B",
                    }}
                  >
                    {user?.role === "empresa" ? "Panel Empresa" : "Mi Panel"}
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    logout();
                    navigate("/");
                  }}
                  className="flex items-center justify-center gap-2 w-full text-lg font-bold px-6 py-4 rounded-2xl transition-all duration-300 active:scale-[0.98]"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(203, 213, 225, 0.9)",
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full text-lg font-bold px-6 py-4 rounded-2xl transition-all duration-300 active:scale-[0.98]"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "rgba(203, 213, 225, 0.9)",
                }}
              >
                <User className="w-5 h-5" />
                Ingresar a mi cuenta
              </Link>
            )}

            <Link
              to="/tienda"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-amber hover:bg-amber-dark text-slate-950 text-lg font-black px-6 py-4 rounded-2xl transition-all duration-300 active:scale-[0.98] shadow-lg"
              style={{ boxShadow: "0 4px 20px rgba(245, 158, 11, 0.25)" }}
            >
              <Package className="w-5 h-5" />
              Comprar Ahora
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
