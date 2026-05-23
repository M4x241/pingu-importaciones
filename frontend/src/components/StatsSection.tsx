import { useState, useEffect, useRef } from "react";

const statsData = [
  { value: 500, suffix: "+", label: "Grupos Completados" },
  { value: 2000, suffix: "+", label: "Clientes Satisfechos" },
  { value: 15, suffix: "+", label: "Importadoras Aliadas" },
  { value: 98, suffix: "%", label: "Entregas a Tiempo" },
];

const AnimatedCounter = ({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();

          const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div
      ref={ref}
      className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 text-amber"
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section
      id="nosotros"
      // Min-height generoso, mucho padding y flexbox para centrar
      className="w-full py-64 md:py-32 lg:py-40 px-6 relative overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#0B0F19" }} // Fondo oscuro sólido
    >
      {/* Background decoration (sutil) */}
      {/* <div
        className="absolute top-10 left-20 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: "#F59E0B" }}
      />
      <div
        className="absolute bottom-10 right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-10"
        style={{ background: "#38BDF8" }}
      /> */}

      {/* Contenedor centralizado con gap grande (80px a 100px) */}
      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col gap-[80px] lg:gap-[100px]">
        {/* BLOQUE 1: Header */}
        <div className="text-center space-y-6">
          <span
            className="inline-block font-bold text-xs tracking-widest uppercase px-5 py-2 rounded-full shadow-sm"
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              color: "#FCD34D",
              border: "1px solid rgba(245, 158, 11, 0.2)",
            }}
          >
            Nuestra Trayectoria
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Números que <span className="text-amber">Hablan</span>
          </h2>
          <div className="w-full flex justify-center mt-6">
            <p
              className="text-lg md:text-xl max-w-2xl leading-relaxed text-center"
              style={{ color: "rgba(148, 163, 184, 0.9)" }}
            >
              Nuestra colonia crece cada día. Estos son los resultados que nos
              respaldan.
            </p>
          </div>
        </div>

        {/* BLOQUE 2: Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statsData.map((stat, index) => {
            return (
              <div
                key={index}
                // Padded amplio, alineado a la izquierda (o centrado, aquí centrado suele verse mejor para números)
                className="rounded-2xl p-10 lg:p-12 text-center transition-transform duration-500 hover:-translate-y-2 flex flex-col justify-center items-center h-full"
                style={{
                  background: "rgba(30, 41, 59, 0.4)", // Fondo consistente con las otras secciones
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />

                <p
                  className="font-semibold text-sm md:text-base uppercase tracking-wider"
                  style={{ color: "rgba(148, 163, 184, 0.9)" }}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
