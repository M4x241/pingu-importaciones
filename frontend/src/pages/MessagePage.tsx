import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Phone, Send } from "lucide-react";

export default function MessagePage() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ nombre: "", email: "", mensaje: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen !pt-24" style={{ backgroundColor: "#0F172A" }}>
      <div className="w-full !mx-auto !px-6 !py-8">
        <div className="text-center !space-y-3 !mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Escribenos <span className="text-amber">Directo</span>
          </h1>
          <p className="text-slate max-w-lg !mx-auto">
            Te responderemos en menos de 24 horas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl !mx-auto">
          <div
            className="rounded-2xl !p-6 !md:p-8"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(34, 197, 94, 0.1)" }}
                >
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-lg font-bold text-white">
                  {"¡Mensaje Enviado!"}
                </p>
                <p className="text-slate text-sm text-center">
                  Gracias por escribirnos, te responderemos pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="!space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-light block !mb-1.5">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({ ...form, nombre: e.target.value })
                    }
                    placeholder="Tu nombre"
                    required
                    className="w-full !px-4 !py-3.5 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-light block !mb-1.5">
                    Correo
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="tu@correo.com"
                    required
                    className="w-full !px-4 !py-3.5 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-light block !mb-1.5">
                    Mensaje
                  </label>
                  <textarea
                    value={form.mensaje}
                    onChange={(e) =>
                      setForm({ ...form, mensaje: e.target.value })
                    }
                    placeholder="Escribe tu mensaje..."
                    rows={4}
                    required
                    className="w-full !px-4 !py-3.5 rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-amber/50 resize-none"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold !py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] text-sm"
                  style={{ boxShadow: "0 4px 20px rgba(245, 158, 11, 0.3)" }}
                >
                  <Send className="w-5 h-5" />
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>

          <div
            className="rounded-2xl !p-6 !md:p-8 !space-y-6"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <h3 className="text-lg font-bold text-white">
              Informacion de Contacto
            </h3>
            <div className="!space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@pinguimportaciones.com",
                },
                { icon: Phone, label: "Telefono", value: "+57 300 123 4567" },
                { icon: MapPin, label: "Ubicacion", value: "Bogota, Colombia" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(245, 158, 11, 0.1)" }}
                  >
                    <item.icon className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <p className="text-xs text-slate">{item.label}</p>
                    <p className="text-sm font-medium text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="!pt-4 !border-t"
              style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
            >
              <p className="text-sm text-slate leading-relaxed">
                Estamos disponibles de lunes a viernes de 9:00 AM a 6:00 PM. Te
                atenderemos con la mejor actitud y resolveremos todas tus dudas
                sobre importaciones y compras en colonia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
