import { Package, Globe, Truck, Clock, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "Paso 1",
    icon: Package,
    title: "Elige tu Producto",
    description:
      "Selecciona los productos que deseas importar de nuestro catálogo de proveedores verificados.",
    gradient: "linear-gradient(135deg, #0F172A, #1E293B)",
  },
  {
    step: "Paso 2",
    icon: Globe,
    title: "Únete a un Grupo",
    description:
      "Te asignamos a un grupo de importación activo para optimizar costos y tiempos de envío.",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
  },
  {
    step: "Paso 3",
    icon: Truck,
    title: "Seguimiento Total",
    description:
      "Monitorea tu pedido en tiempo real desde el proveedor hasta tu puerta con total transparencia.",
    gradient: "linear-gradient(135deg, #0F172A, #1E293B)",
  },
  {
    step: "Paso 4",
    icon: Clock,
    title: "Recibe tu Pedido",
    description:
      "Tu producto llega seguro y a tiempo. Nosotros nos encargamos de toda la logística y aduanas.",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
  },
];

const GroupsSection = () => {
  return (
    <section
      id="grupos"
      // 1. Mantenemos min-h-screen.
      // 2. Quitamos 'justify-center' para dejar que el hijo crezca.
      // 3. Bajamos el padding a py-20 md:py-24 para que sirva solo como margen de seguridad.
      className="w-full min-h-screen py-20 md:py-24 px-6 relative overflow-hidden flex flex-col items-center justify-start"
      style={{
        background: "linear-gradient(180deg, #0F172A 0%, #0B0F19 100%)",
      }}
    >
      {/* Luces de fondo dinámicas */}
      {/* <div
        className="absolute top-0 left-0 rounded-full blur-[150px] pointer-events-none opacity-20"
        style={{
          width: "600px",
          height: "600px",
          background: "#F59E0B",
          transform: "translate(-30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 rounded-full blur-[150px] pointer-events-none opacity-10"
        style={{
          width: "600px",
          height: "600px",
          background: "#38BDF8",
          transform: "translate(30%, 30%)",
        }}
      /> */}

      {/* LA SOLUCIÓN ESTÁ AQUÍ:
          flex-1: Fuerza al contenedor a ocupar todo el alto sobrante del min-h-screen.
          justify-evenly: Reparte el espacio vacío automáticamente entre los 3 bloques.
          gap-16: Funciona como un espacio mínimo de seguridad si la pantalla es muy pequeña.
      */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col flex-1 justify-evenly gap-16 lg:gap-20">
        {/* BLOQUE 1: Section Header */}
        <div className="text-center space-y-6 mt-auto lg:mt-0">
          <span
            className="inline-block font-bold text-lg tracking-widest uppercase !px-5 !py-2 rounded-full text-amber shadow-sm"
            style={{
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
            }}
          >
            ¿Cómo Funciona?
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight !pt-16">
            Grupos de Importación{" "}
            <span className="text-amber">Inteligentes</span>
          </h2>
          <div className="w-full flex justify-center mt-6">
            <p
              className="text-lg md:text-xl max-w-3xl leading-relaxed text-center"
              style={{ color: "rgba(148, 163, 184, 0.9)" }}
            >
              Creamos grupos de importaciones para que tu compra sea segura,
              confiable y al mejor precio. Un proceso simple en 4 pasos.
            </p>
          </div>
        </div>

        {/* BLOQUE 2: Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative group flex flex-col p-10 lg:p-12 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full lg:gap-6"
              style={{
                background: "rgba(30, 41, 59, 0.5)",
                border: "4px solid rgba(255, 255, 255, 0.08)",
                padding: "30px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
              }}
            >
              <div className="flex items-center justify-between mb-10">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md"
                  style={{ background: item.gradient }}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>

                <span
                  className="text-xl font-medium !px-4 !py-2 rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "rgba(148, 163, 184, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {item.step}
                </span>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-amber transition-colors duration-300">
                {item.title}
              </h3>

              <p
                className="text-lg lg:text-xl leading-relaxed"
                style={{ color: "rgba(148, 163, 184, 0.85)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* BLOQUE 3: Botón Call To Action */}
        <div className="text-center mb-auto lg:mb-0">
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 bg-amber hover:bg-amber-600 text-slate-900 font-bold !px-12 !py-5 rounded-full transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-lg group shadow-xl"
            style={{ boxShadow: "0 10px 30px rgba(245, 158, 11, 0.25)" }}
          >
            Crea Tu Grupo Ahora
            <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GroupsSection;
