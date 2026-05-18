import "../App.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TrustSection from "../components/TrustSection";
import GroupsSection from "../components/GroupsSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import { Ship, Plane, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

const MainPage = () => {
  return (
    <ErrorBoundary>
      <div className="font-sans antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <TrustSection />
          <GroupsSection />
          <StatsSection />
          <CTASection />
        </main>

        {/* Footer */}
        <footer style={{ backgroundColor: "#0F172A", color: "#FFFFFF" }}>
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🐧</span>
                  <span className="text-xl font-bold">
                    Pingu <span className="text-amber">Importaciones</span>
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(203, 213, 225, 0.5)" }}
                >
                  Creamos grupos de importaciones para que tu compra sea segura,
                  confiable y al mejor precio. La fuerza de la colonia.
                </p>
                <div className="flex gap-3 pt-2">
                  {[Ship, Plane, Mail, MapPin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-amber hover:text-oxford"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-amber font-semibold mb-4">Navegación</h4>
                <ul className="space-y-3">
                  {[
                    "Inicio",
                    "Servicios",
                    "Grupos",
                    "Nosotros",
                    "Contacto",
                  ].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="text-sm transition-colors duration-300 hover:text-amber"
                        style={{ color: "rgba(203, 213, 225, 0.5)" }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-amber font-semibold mb-4">Servicios</h4>
                <ul
                  className="space-y-3 text-sm"
                  style={{ color: "rgba(203, 213, 225, 0.5)" }}
                >
                  <li>Importación Marítima</li>
                  <li>Importación Aérea</li>
                  <li>Grupos de Compra</li>
                  <li>Asesoría Aduanera</li>
                  <li>Rastreo en Tiempo Real</li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-amber font-semibold mb-4">Contacto</h4>
                <ul className="space-y-4">
                  {[
                    {
                      icon: MapPin,
                      text: "Centro Empresarial Pingu, Oficina 301",
                    },
                    { icon: Phone, text: "+1 (555) 123-4567" },
                    { icon: Mail, text: "contacto@pinguimportaciones.com" },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "rgba(203, 213, 225, 0.5)" }}
                    >
                      <item.icon className="w-4 h-4 text-amber mt-0.5 flex-shrink-0" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
              style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
            >
              <p
                className="text-sm"
                style={{ color: "rgba(203, 213, 225, 0.4)" }}
              >
                © 2026 Pingu Importaciones. Todos los derechos reservados.
              </p>
              <div
                className="flex gap-6 text-sm"
                style={{ color: "rgba(203, 213, 225, 0.4)" }}
              >
                <a
                  href="#"
                  className="hover:text-amber transition-colors duration-300"
                >
                  Términos
                </a>
                <a
                  href="#"
                  className="hover:text-amber transition-colors duration-300"
                >
                  Privacidad
                </a>
                <a
                  href="#"
                  className="hover:text-amber transition-colors duration-300"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default MainPage;
