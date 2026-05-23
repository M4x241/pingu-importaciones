import { ShoppingBag, Tag, Truck, ArrowRight } from 'lucide-react';
import penguinHero from '../assets/penguin-hero.png';

const PenguinHero = () => {
  return (
    <section
      className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden pt-16"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #0F172A 70%, #1E293B 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
          style={{ background: 'rgba(245, 158, 11, 0.08)' }}
        />
        <div
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'rgba(245, 158, 11, 0.05)' }}
        />
      </div>

      <div className="w-full mx-auto px-6 py-12 md:py-20 w-full flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="md:w-1/2 space-y-6 animate-fade-in-left">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              color: '#FCD34D',
            }}
          >
            <Tag className="w-4 h-4 text-amber" />
            Tienda Oficial Pingu
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
            Compra en{' '}
            <span className="text-amber">Colonia</span>
            <br />
            <span className="text-white/70">Ahorra en </span>
            <span className="text-amber">Grande</span>
          </h1>

          <p className="text-slate text-lg md:text-xl leading-relaxed max-w-lg">
            Productos seleccionados al mejor precio, con la seguridad y confianza
            que solo Pingu Importaciones te ofrece.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#productos"
              className="inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-oxford font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg group"
              style={{ boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)' }}
            >
              Ver Productos
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#ofertas"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 text-lg text-white"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <ShoppingBag className="w-5 h-5 text-amber" />
              Ofertas Especiales
            </a>
          </div>

          <div className="flex items-center gap-6 pt-2 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-slate">
              <Truck className="w-4 h-4 text-amber" />
              Envío seguro
            </div>
            <div className="flex items-center gap-2 text-sm text-slate">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              +500 productos
            </div>
            <div className="flex items-center gap-2 text-sm text-slate">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              +2,000 clientes
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center items-center animate-fade-in-right">
          <div className="relative">
            <div
              className="absolute rounded-full blur-2xl animate-pulse-glow"
              style={{
                inset: '-20px',
                background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(15,23,42,0.1))',
              }}
            />
            <img
              src={penguinHero}
              alt="Pingu Store"
              className="relative z-10 w-64 md:w-72 lg:w-80 animate-float drop-shadow-2xl"
            />
            <div
              className="absolute top-4 -left-6 glass-card px-4 py-3 flex items-center gap-2 text-sm font-semibold text-oxford"
              style={{ animationDelay: '0.5s' }}
            >
              <Tag className="w-4 h-4 text-amber" />
              Mejores Precios
            </div>
            <div
              className="absolute bottom-12 -right-4 glass-card px-4 py-3 flex items-center gap-2 text-sm font-semibold text-oxford"
              style={{ animationDelay: '0.8s' }}
            >
              <ShoppingBag className="w-4 h-4 text-amber" />
              Envío Rápido
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PenguinHero;
