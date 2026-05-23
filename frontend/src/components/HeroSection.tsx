import { ArrowRight, Shield, Users } from "lucide-react";
import penguinHero from "../assets/penguin-hero.png";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      // MANTENEMOS min-h-screen.
      // Añadimos justify-center para que TODO el bloque interior flote exactamente en el medio.
      // pt-24 compensa el espacio del Navbar superior, y pb-32 compensa la ola del fondo.
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-32 items-center "
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #0B0F19 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[150px] opacity-20"
          style={{ background: "#F59E0B", transform: "translate(-30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-10"
          style={{ background: "#38BDF8", transform: "translate(30%, 30%)" }}
        />
      </div>

      {/* Contenedor centralizado responsivo */}
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 relative z-10">
        {/* Left Content (Texto) - Centrado en móvil, a la izquierda en PC */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 lg:gap-10 items-center lg:items-start text-center lg:text-left animate-fade-in-left">
          {/* Badge */}
          <div>
            <span
              className="inline-flex items-center gap-2 font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full shadow-sm"
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                color: "#FCD34D",
                border: "1px solid rgba(245, 158, 11, 0.2)",
              }}
            >
              <Shield className="w-4 h-4 text-amber" />
              Importaciones 100% Seguras
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white">
            Creamos <span className="text-amber">Grupos de Importación</span>
            <br className="hidden lg:block" /> para Ti
          </h1>

          {/* Descripción */}
          <p
            className="text-lg md:text-xl leading-relaxed max-w-xl"
            style={{ color: "rgba(148, 163, 184, 0.9)" }}
          >
            Que tu grupo de importaciones se llene con{" "}
            <strong className="text-white font-bold">seguridad</strong> y{" "}
            <strong className="text-white font-bold">confianza</strong>.
            Contamos con contratos con las mejores importadoras del mercado.
          </p>

          {/* Botones - Centrados en móvil, a la izquierda en PC */}
          <div className="flex flex-col sm:flex-row gap-5 pt-2 justify-center lg:justify-start w-full sm:w-auto">
            <a
              href="#grupos"
              className="inline-flex items-center justify-center gap-3 bg-amber hover:bg-amber-600 text-slate-950 font-black !px-8 !py-5 rounded-full transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-lg group shadow-2xl"
              style={{ boxShadow: "0 12px 40px rgba(245, 158, 11, 0.35)" }}
            >
              ¡Ya No Esperes!
              <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
            </a>
            <a
              href="#nosotros"
              className="inline-flex items-center justify-center gap-3 text-white font-bold !px-10 !py-5 rounded-full transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 text-lg"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <Users className="w-5 h-5 text-amber" />
              Conoce Más
            </a>
          </div>

          {/* Trust badges - Centrados en móvil, a la izquierda en PC */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
            <div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "rgba(148, 163, 184, 0.8)" }}
            >
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              +500 Grupos Completados
            </div>
            <div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "rgba(148, 163, 184, 0.8)" }}
            >
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              +2,000 Clientes Satisfechos
            </div>
          </div>
        </div>

        {/* Right Content (Imagen Pingüino) */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0 animate-fade-in-right">
          <div className="relative">
            {/* Glow ring sutil para el pingüino */}
            <div
              className="absolute rounded-full blur-[80px]"
              style={{
                inset: "-40px",
                background: "rgba(245, 158, 11, 0.15)",
              }}
            />

            {/* Penguin image */}
            <img
              src={penguinHero}
              alt="Pingu - Mascota de Pingu Importaciones"
              className="relative z-10 w-64 sm:w-80 md:w-96 lg:w-[480px] animate-float drop-shadow-2xl"
            />

            {/* Floating card 1 */}
            {/* Floating cards posicionadas debajo de la imagen */}
            <div
              className="absolute px-4 sm:px-5 py-3 sm:py-3.5 animate-slide-up flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-white rounded-2xl shadow-xl z-20"
              style={{
                animationDelay: "0.5s",
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                left: "60%",
                transform: "translateX(-50%)",
                bottom: "-56px",
              }}
            >
              <div className="bg-amber/20 p-1.5 sm:p-2 rounded-lg">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber" />
              </div>
              100% Seguro
            </div>

            <div
              className="absolute px-4 sm:px-5 py-3 sm:py-3.5 animate-slide-up flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-white rounded-2xl shadow-xl z-20"
              style={{
                animationDelay: "0.8s",
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                left: "10%",
                transform: "translateX(10%)",
                bottom: "-56px",
              }}
            >
              <div className="bg-amber/20 p-1.5 sm:p-2 rounded-lg">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber" />
              </div>
              Grupos Activos
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60 L1440,120 L0,120 Z"
            fill="#0F172A"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
