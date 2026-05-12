import { Shield, Handshake, FileCheck, Users, CheckCircle } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Seguridad Garantizada',
        description:
            'Cada importación está respaldada por contratos seguros y un equipo profesional que cuida tu inversión de principio a fin.',
        highlights: ['Seguimiento en tiempo real', 'Protección total'],
    },
    {
        icon: Handshake,
        title: 'Confianza en Nosotros',
        description:
            'Más de 2,000 clientes satisfechos avalan nuestra trayectoria. Tu compra está en las mejores manos.',
        highlights: ['Transparencia total', 'Historial comprobado'],
    },
    {
        icon: FileCheck,
        title: 'Contratos con Importadoras',
        description:
            'Tenemos alianzas estratégicas con las mejores importadoras del mercado para garantizar los mejores precios y tiempos de entrega.',
        highlights: ['Mejores precios', 'Envío garantizado'],
    },
    {
        icon: Users,
        title: 'Comunidad Activa',
        description:
            'Forma parte de una comunidad que crece cada día. Juntos somos más fuertes y conseguimos mejores resultados.',
        highlights: ['Soporte 24/7', 'Grupo exclusivo'],
    },
];

const TrustSection = () => {
    return (
        <section id="servicios" className="py-20 md:py-28 px-6 bg-arctic relative overflow-hidden">
            {/* Background decoration */}
            <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(245, 158, 11, 0.05)' }}
            />
            <div
                className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(15, 23, 42, 0.05)' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <span
                        className="inline-block font-semibold text-sm px-4 py-1.5 rounded-full"
                        style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#D97706' }}
                    >
                        ¿Por qué elegirnos?
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-oxford tracking-tight">
                        Tu Importación, <span className="text-amber">Nuestra Prioridad</span>
                    </h2>
                    <p className="text-slate text-lg max-w-2xl mx-auto">
                        En Pingu Importaciones trabajamos para que cada grupo de importación sea una experiencia segura, confiable y sin complicaciones.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card p-8 text-center group cursor-pointer"
                        >
                            {/* Icon */}
                            <div
                                className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                                style={{
                                    background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                                }}
                            >
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="text-xl font-bold text-oxford mb-3 group-hover:text-amber transition-colors duration-300">
                                {feature.title}
                            </h3>

                            <p className="text-slate text-sm leading-relaxed mb-4">
                                {feature.description}
                            </p>

                            {/* Highlight tags */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {feature.highlights.map((hl, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full"
                                        style={{ color: 'rgba(15, 23, 42, 0.7)', background: '#F8FBFC' }}
                                    >
                                        <CheckCircle className="w-3 h-3 text-amber" />
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
