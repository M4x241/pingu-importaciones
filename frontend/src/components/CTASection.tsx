import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
    return (
      <section
        id="contacto"
        className="py-20 md:py-28 px-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
        }}
      >
        {/* Animated background glows */}
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl animate-pulse-glow pointer-events-none"
          style={{ background: "rgba(245, 158, 11, 0.15)" }}
        />
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(245, 158, 11, 0.10)" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-amber"
            style={{
              background: "rgba(245, 158, 11, 0.2)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
            }}
          >
            <Sparkles className="w-4 h-4" />
            ¡Únete Hoy!
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            ¿Ya No Esperes Más?
            <br />
            <span className="text-amber">Tu Grupo Te Espera</span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(203, 213, 225, 0.6)" }}
          >
            Cada día se abren nuevos grupos de importación. No dejes pasar la
            oportunidad de importar seguro, confiable y{" "}
            <strong className="text-white">al mejor precio del mercado</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 bg-amber hover:bg-amber-dark text-oxford font-bold px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 text-lg group animate-pulse-glow"
            >
              Comenzar Ahora
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-10 py-5 rounded-full transition-all duration-300 hover:text-amber text-lg"
              style={{ border: "2px solid rgba(255, 255, 255, 0.2)" }}
            >
              Contáctanos
            </a>
          </div>

          {/* Trust line */}
          <p
            className="text-sm pt-4"
            style={{ color: "rgba(203, 213, 225, 0.4)" }}
          >
            🐧 Únete a la colonia de más de 2,000 importadores felices
          </p>
        </div>
      </section>
    );
};

export default CTASection;
