import { Ship, Plane, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="w-full relative overflow-hidden pt-32 md:pt-48 pb-10 md:pb-12 px-6 flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#070B14", // Un tono ligeramente más oscuro que el fondo general para "asentar" la página
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        paddingTop: "50px",
      }}
    >
      {/* Brillo sutil de fondo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Columna 1: Marca (Ocupa más espacio en desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl filter drop-shadow-md">🐧</span>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Pingu <span className="text-amber">Importaciones</span>
              </span>
            </div>
            <p
              className="text-base leading-relaxed max-w-sm"
              style={{ color: "rgba(148, 163, 184, 0.8)" }}
            >
              Creamos grupos de importaciones para que tu compra sea segura,
              confiable y al mejor precio. La fuerza de la colonia.
            </p>
            <div className="flex gap-4 pt-4">
              {[Ship, Plane, Mail, MapPin].map((Icon, i) => (
                <Link
                  key={i}
                  to="#"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-amber transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              Navegación
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Inicio", to: "/" },
                { label: "Tienda", to: "/tienda" },
                { label: "Grupos", to: "/#grupos" },
                { label: "Nosotros", to: "/#nosotros" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:text-amber hover:translate-x-1 group"
                    style={{ color: "rgba(148, 163, 184, 0.8)" }}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Ayuda */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              Ayuda
            </h4>
            <ul className="space-y-4">
              {[
                "Centro de Ayuda",
                "Envíos y Devoluciones",
                "Seguimiento de Pedido",
                "Métodos de Pago",
                "Preguntas Frecuentes",
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to="#"
                    className="text-sm font-medium transition-all duration-300 hover:text-amber hover:translate-x-1 inline-block"
                    style={{ color: "rgba(148, 163, 184, 0.8)" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              Contacto
            </h4>
            <ul className="space-y-5">
              {[
                { icon: MapPin, text: "Centro Empresarial Pingu, Oficina 301" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: Mail, text: "contacto@pinguimportaciones.com" },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-amber/10"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <item.icon className="w-4 h-4 text-amber" />
                  </div>
                  <span
                    className="text-sm leading-relaxed mt-1 transition-colors duration-300 group-hover:text-white"
                    style={{ color: "rgba(148, 163, 184, 0.8)" }}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: "rgba(148, 163, 184, 0.6)" }}
          >
            &copy; {new Date().getFullYear()} Pingu Importaciones. Todos los
            derechos reservados.
          </p>
          <div
            className="flex gap-8 text-sm font-medium"
            style={{ color: "rgba(148, 163, 184, 0.6)" }}
          >
            <Link
              to="#"
              className="hover:text-amber transition-colors duration-300"
            >
              Términos
            </Link>
            <Link
              to="#"
              className="hover:text-amber transition-colors duration-300"
            >
              Privacidad
            </Link>
            <Link
              to="#"
              className="hover:text-amber transition-colors duration-300"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
