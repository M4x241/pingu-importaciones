import { ArrowRight, Shield, Users } from 'lucide-react';
import penguinHero from '../assets/penguin-hero.png';

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        background: 'linear-gradient(135deg, #F0F7F9 0%, #E2E8F0 30%, #F0F7F9 60%, #DBEAFE 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse-glow"
          style={{ background: 'rgba(245, 158, 11, 0.1)' }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(15, 23, 42, 0.05)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ width: '600px', height: '600px', background: 'rgba(245, 158, 11, 0.05)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 w-full flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-8 animate-fade-in-left">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-oxford"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
            }}
          >
            <Shield className="w-4 h-4 text-amber" />
            Importaciones 100% Seguras
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="text-oxford">Creamos </span>
            <span className="gradient-text">Grupos de</span>
            <br />
            <span className="gradient-text">Importación</span>
            <br />
            <span className="text-oxford">para </span>
            <span className="text-amber">Ti</span>
          </h1>

          <p className="text-slate text-lg md:text-xl leading-relaxed max-w-lg">
            Que tu grupo de importaciones llene con <strong className="text-oxford">seguridad</strong> y{' '}
            <strong className="text-oxford">confianza</strong>. Contamos con contratos con las mejores
            importadoras del mercado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#grupos"
              className="inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg group"
              style={{ boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)' }}
            >
              ¡Ya No Esperes!
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#nosotros"
              className="inline-flex items-center justify-center gap-2 text-oxford font-semibold px-8 py-4 rounded-full transition-all duration-300 text-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(15, 23, 42, 0.2)',
              }}
            >
              <Users className="w-5 h-5" />
              Conoce Más
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 pt-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-slate">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              +500 Grupos Completados
            </div>
            <div className="flex items-center gap-2 text-sm text-slate">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              +2,000 Clientes Satisfechos
            </div>
          </div>
        </div>

        {/* Right Content - Penguin Illustration */}
        <div className="md:w-1/2 flex justify-center items-center animate-fade-in-right">
          <div className="relative">
            {/* Glow ring */}
            <div
              className="absolute rounded-full blur-2xl animate-pulse-glow"
              style={{
                inset: '-20px',
                background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(15,23,42,0.1))',
              }}
            />

            {/* Penguin image */}
            <img
              src={penguinHero}
              alt="Pingu - Mascota de Pingu Importaciones"
              className="relative z-10 w-80 md:w-96 lg:w-[420px] animate-float drop-shadow-2xl"
            />

            {/* Floating card 1 */}
            <div
              className="absolute top-8 -left-6 glass-card px-4 py-3 animate-slide-up flex items-center gap-2 text-sm font-semibold text-oxford"
              style={{ animationDelay: '0.5s' }}
            >
              <Shield className="w-4 h-4 text-amber" />
              100% Seguro
            </div>

            {/* Floating card 2 */}
            <div
              className="absolute bottom-12 -right-4 glass-card px-4 py-3 animate-slide-up flex items-center gap-2 text-sm font-semibold text-oxford"
              style={{ animationDelay: '0.8s' }}
            >
              <Users className="w-4 h-4 text-amber" />
              Grupos Activos
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60 L1440,120 L0,120 Z"
            fill="#F0F7F9"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;