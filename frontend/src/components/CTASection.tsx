import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section
      id="contacto"
      // Altura mínima, padding gigante y centrado absoluto
      className="w-full min-h-[60vh] py-32 md:py-48 px-6 relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #0B0F19 0%, #0F172A 100%)", // Invertimos el degradado para fluir desde la sección anterior
      }}
    >
      {/* Animated background glows (muy sutiles para no distraer) */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: "#F59E0B" }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-[150px] pointer-events-none opacity-10"
        style={{ background: "#38BDF8" }}
      />

      {/* Usamos flex-col y gap para un control perfecto del espaciado vertical */}
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-10 lg:gap-12">
        {/* Badge */}
        {/* <div
          className="inline-flex items-center gap-2 font-bold text-xl tracking-widest uppercase !px-6 !py-2.5 rounded-full shadow-sm"
          style={{
            background: "rgba(245, 158, 11, 0.1)",
            color: "#FCD34D",
            border: "1px solid rgba(245, 158, 11, 0.2)",
          }}
        >
          <Sparkles className="w-4 h-4 text-amber" />
          ¡Únete Hoy!
        </div> */}

        {/* Título Principal */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
          ¿Qué Esperas?
          <br />
          <span className="text-amber">Tu Grupo Te Espera</span>
        </h2>

        {/* Descripción */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: "rgba(148, 163, 184, 0.9)" }}
        >
          Cada día se abren nuevos grupos de importación. No dejes pasar la
          oportunidad de importar seguro, confiable y{" "}
          <strong className="text-white font-bold">
            al mejor precio del mercado
          </strong>
          .
        </p>

        {/* Contenedor de Botones (con más separación entre ellos en móvil) */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto pt-4">
          {/* Botón Principal (Ámbar) */}
          <a
            href="#"
            className="inline-flex items-center justify-center gap-4 bg-amber hover:bg-amber-600 text-slate-950 font-black !px-12 !py-5 rounded-full transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-lg group shadow-2xl"
            style={{ boxShadow: "0 12px 40px rgba(245, 158, 11, 0.35)" }}
          >
            Comenzar Ahora
            <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
          </a>

          {/* Botón Secundario (Outline) */}
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 text-white font-bold !px-12 !py-5 rounded-full transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 text-lg"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            Contáctanos
          </a>
        </div>

        {/* Trust line (Prueba Social final) */}
        <p
          className="text-sm font-medium mt-4 tracking-wide"
          style={{ color: "rgba(148, 163, 184, 0.6)" }}
        >
          🐧 Únete a la colonia de más de 2,000 importadores felices
        </p>
      </div>
    </section>
  );
};

export default CTASection;
