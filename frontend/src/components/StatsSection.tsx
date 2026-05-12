import { useState, useEffect, useRef } from 'react';

const statsData = [
    { value: 500, suffix: '+', label: 'Grupos Completados' },
    { value: 2000, suffix: '+', label: 'Clientes Satisfechos' },
    { value: 15, suffix: '+', label: 'Importadoras Aliadas' },
    { value: 98, suffix: '%', label: 'Entregas a Tiempo' },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
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
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, hasAnimated]);

    return (
        <div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {count.toLocaleString()}{suffix}
        </div>
    );
};

const StatsSection = () => {
    return (
        <section id="nosotros" className="py-20 md:py-28 px-6 bg-arctic relative overflow-hidden">
            {/* Decorative blobs */}
            <div
                className="absolute top-10 left-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(245, 158, 11, 0.1)' }}
            />
            <div
                className="absolute bottom-10 right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(15, 23, 42, 0.05)' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <span
                        className="inline-block font-semibold text-sm px-4 py-1.5 rounded-full text-oxford"
                        style={{ background: 'rgba(15, 23, 42, 0.1)' }}
                    >
                        Nuestra Trayectoria
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-oxford tracking-tight">
                        Números que <span className="text-amber">Hablan</span>
                    </h2>
                    <p className="text-slate text-lg max-w-2xl mx-auto">
                        Nuestra colonia crece cada día. Estos son los resultados que nos respaldan.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, index) => {
                        const isDark = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                className="rounded-2xl p-8 text-center transition-transform duration-500 hover:-translate-y-1"
                                style={{
                                    background: isDark
                                        ? 'linear-gradient(135deg, #0F172A, #1E293B)'
                                        : 'linear-gradient(135deg, #F59E0B, #D97706)',
                                    color: isDark ? '#FFFFFF' : '#0F172A',
                                }}
                            >
                                <div style={{ color: isDark ? '#F59E0B' : '#FFFFFF' }}>
                                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                </div>
                                <p className="mt-3 font-medium text-sm opacity-80">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
