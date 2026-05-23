import { Shield, Handshake, FileCheck, Users, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Seguridad Garantizada",
    description:
      "Cada importación está respaldada por contratos seguros y un equipo profesional que cuida tu inversión de principio a fin.",
    highlights: ["Seguimiento en tiempo real", "Protección total"],
  },
  {
    icon: Handshake,
    title: "Confianza en Nosotros",
    description:
      "Más de 2,000 clientes satisfechos avalan nuestra trayectoria. Tu compra está en las mejores manos.",
    highlights: ["Transparencia total", "Historial comprobado"],
  },
  {
    icon: FileCheck,
    title: "Contratos con Importadoras",
    description:
      "Tenemos alianzas estratégicas con las mejores importadoras del mercado para garantizar los mejores precios y tiempos de entrega.",
    highlights: ["Mejores precios", "Envío garantizado"],
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description:
      "Forma parte de una comunidad que crece cada día. Juntos somos más fuertes y conseguimos mejores resultados.",
    highlights: ["Soporte 24/7", "Grupo exclusivo"],
  },
];

const TrustSection = () => {
  return (
    <section
      id="servicios"
      // Aseguramos que ocupe todo el alto, con mucho padding superior e inferior
      className="w-full py-24 md:py-32 lg:py-40 px-6 relative overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#0F172A" }}
    >
      {/* Background decoration (muy sutiles) */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-50"
        style={{ background: "rgba(245, 158, 11, 0.05)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-50"
        style={{ background: "rgba(245, 158, 11, 0.03)" }}
      />

      {/* Contenedor central con gap masivo entre cabecera y cuadrícula */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-[100px] lg:gap-[140px]">
        {/* BLOQUE 1: Section Header */}
        <div className="text-center space-y-6">
          <span
            className="inline-flex items-center gap-2 font-bold text-lg tracking-widest uppercase !px-5 !py-2 rounded-full shadow-sm"
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              color: "#FCD34D",
              border: "1px solid rgba(245, 158, 11, 0.2)",
            }}
          >
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight !pt-16">
            Tu Importación,{" "}
            <span className="text-amber">Nuestra Prioridad</span>
          </h2>
          <div className="w-full flex justify-center mt-6">
            <p
              className="text-lg md:text-xl max-w-3xl leading-relaxed text-center"
              style={{ color: "rgba(148, 163, 184, 0.9)" }}
            >
              En Pingu Importaciones trabajamos para que cada grupo de
              importación sea una experiencia segura, confiable y sin
              complicaciones.
            </p>
          </div>
        </div>

        {/* BLOQUE 2: Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              // Convertimos la tarjeta a flex-col para forzar alturas iguales
              // Alineamos el texto a la izquierda y damos padding masivo (p-10)
              className="relative group flex flex-col p-10 lg:p-12 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full lg:gap-6"
              style={{
                background: "rgba(30, 41, 59, 0.4)", // Un slate-800 sutil
                border: "1px solid rgba(255, 255, 255, 0.06)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                padding: "30px",
              }}
            >
              <div>
                {/* Icono a la izquierda */}
                <div
                  className="w-14 h-14 mb-8 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-md"
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "1px solid rgba(245, 158, 11, 0.2)",
                  }}
                >
                  <feature.icon className="w-6 h-6 text-amber" />
                </div>

                {/* Título */}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-amber transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Descripción (alineada a la izquierda) */}
                <p
                  className="text-sm lg:text-xl leading-relaxed mb-8"
                  style={{ color: "rgba(148, 163, 184, 0.85)" }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Highlight tags: el 'mt-auto' asegura que si hay diferencia de texto, los tags queden siempre pegados al fondo */}
              <div className="flex flex-col gap-3 mt-auto">
                {feature.highlights.map((hl, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: "#CBD5E1" }}
                  >
                    <CheckCircle className="w-4 h-4 text-amber opacity-80" />
                    {hl}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
