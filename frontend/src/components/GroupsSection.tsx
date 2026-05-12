import { Package, Globe, Truck, Clock, ArrowRight } from 'lucide-react';

const steps = [
    {
        step: '01',
        icon: Package,
        title: 'Elige tu Producto',
        description: 'Selecciona los productos que deseas importar de nuestro catálogo de proveedores verificados.',
        gradient: 'linear-gradient(135deg, #0F172A, #1E293B)',
    },
    {
        step: '02',
        icon: Globe,
        title: 'Únete a un Grupo',
        description: 'Te asignamos a un grupo de importación activo para optimizar costos y tiempos de envío.',
        gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    },
    {
        step: '03',
        icon: Truck,
        title: 'Seguimiento Total',
        description: 'Monitorea tu pedido en tiempo real desde el proveedor hasta tu puerta con total transparencia.',
        gradient: 'linear-gradient(135deg, #0F172A, #1E293B)',
    },
    {
        step: '04',
        icon: Clock,
        title: 'Recibe tu Pedido',
        description: 'Tu producto llega seguro y a tiempo. Nosotros nos encargamos de toda la logística y aduanas.',
        gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    },
];

const GroupsSection = () => {
    return (
        <section
            id="grupos"
            className="py-20 md:py-28 px-6 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)' }}
        >
            {/* Background glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
                style={{ width: '800px', height: '800px', background: 'rgba(245, 158, 11, 0.05)' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <span
                        className="inline-block font-semibold text-sm px-4 py-1.5 rounded-full text-amber"
                        style={{ background: 'rgba(245, 158, 11, 0.2)' }}
                    >
                        ¿Cómo Funciona?
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                        Grupos de Importación <span className="text-amber">Inteligentes</span>
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(203, 213, 225, 0.6)' }}>
                        Creamos grupos de importaciones para que tu compra sea segura, confiable y al mejor precio. Un proceso simple en 4 pasos.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {steps.map((item, index) => (
                        <div key={index} className="relative group">
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div
                                    className="hidden lg:block absolute top-12 z-0"
                                    style={{
                                        left: 'calc(50% + 40px)',
                                        width: 'calc(100% - 40px)',
                                        height: '2px',
                                        background: 'linear-gradient(to right, rgba(245,158,11,0.4), transparent)',
                                    }}
                                />
                            )}

                            <div
                                className="relative z-10 rounded-2xl p-8 text-center transition-all duration-500 group-hover:-translate-y-2 cursor-pointer"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                {/* Step number */}
                                <span
                                    className="font-extrabold text-6xl absolute top-4 right-6 select-none"
                                    style={{ color: 'rgba(245, 158, 11, 0.3)' }}
                                >
                                    {item.step}
                                </span>

                                {/* Icon */}
                                <div
                                    className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                    style={{ background: item.gradient }}
                                >
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(203, 213, 225, 0.6)' }}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <a
                        href="#contacto"
                        className="inline-flex items-center gap-3 bg-amber hover:bg-amber-dark text-oxford font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg group"
                        style={{ boxShadow: '0 8px 30px rgba(245, 158, 11, 0.3)' }}
                    >
                        Crea Tu Grupo Ahora
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default GroupsSection;
