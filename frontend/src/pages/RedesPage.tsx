import { Link } from "react-router-dom";
import {  ArrowUpRight, Play } from "lucide-react";

const socials = [
  {
    name: "Instagram",
    icon: "📸",
    url: "https://www.instagram.com/pingu_importaciones/",
    color: "#E4405F",
    username: "@pingu_importaciones",
  },
  {
    name: "Facebook",
    icon: "👍",
    url: "https://www.facebook.com/profile.php?id=61590618119211",
    color: "#1877F2",
    username: "Pingu Importaciones",
  },
  {
    name: "WhatsApp",
    icon: "💬",
    url: "https://wa.me/59174431122",
    color: "#25D366",
    username: "+591 74431122",
  },
];

const videos = [
  {
    id: 1,
    title: "¿Cómo funcionan las Importaciones Grupales?",
    duration: "3:45",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60",
    url: "#",
  },
  {
    id: 2,
    title: "Unboxing Lote de Smartwatches Quantum V4",
    duration: "5:20",
    thumbnail:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60",
    url: "#",
  },
  {
    id: 3,
    title: "Tour por nuestras oficinas de logística central",
    duration: "4:10",
    thumbnail:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60",
    url: "#",
  },
];

export default function RedesPage() {
  return (
    <div
      className="!min-h-screen !pt-24 !flex !flex-col !justify-start !items-center !w-full"
      style={{ backgroundColor: "#0F172A" }}
    >
      <div className="!w-full !max-w-4xl !mx-auto !px-6 !py-8">
        {/* SECCIÓN 1: REDES SOCIALES */}
        <div className="!space-y-3 !mb-12 !text-center">
          <span
            className="!inline-flex !items-center !gap-2 !font-bold !text-xs !px-4 !py-1.5 !rounded-full !uppercase !tracking-wider"
            style={{ background: "rgba(245, 158, 11, 0.1)", color: "#FCD34D" }}
          >
            📱 Siguenos
          </span>
          <h1 className="!text-3xl md:!text-4xl !font-black !text-white !tracking-tight">
            Nuestras <span className="!text-amber-500">Redes Sociales</span>
          </h1>
          <p className="!text-slate-400 !max-w-md !mx-auto !text-sm">
            Únete a nuestras comunidades y entérate antes que nadie de las
            últimas importaciones grupales.
          </p>
        </div>

        <div className="!flex !flex-wrap !justify-center !gap-4 !w-full !mb-20">
          {socials.map((s) => (
            <Link
              key={s.name}
              to={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="!group !flex !items-center !justify-between !p-5 !rounded-2xl !transition-all !duration-300 hover:!scale-[1.02] !border !w-full md:!w-[calc(50%-0.5rem)]"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                borderColor: "rgba(255, 255, 255, 0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = s.color;
                e.currentTarget.style.boxShadow = `0 0 20px ${s.color}15`;
                e.currentTarget.style.background = `${s.color}05`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              }}
            >
              <div className="!flex !items-center !gap-4">
                <div className="!text-3xl md:!text-4xl !bg-white/5 !p-3 !rounded-xl group-hover:!bg-white/10 !transition-colors">
                  {s.icon}
                </div>
                <div className="!text-left">
                  <h3 className="!text-base !font-bold !text-white">
                    {s.name}
                  </h3>
                  <p className="!text-xs !text-slate-400 group-hover:!text-slate-300 !transition-colors">
                    {s.username}
                  </p>
                </div>
              </div>
              <div className="!p-2 !rounded-full !bg-white/5 group-hover:!bg-white/15 !text-slate-400 group-hover:!text-white !transition-all !duration-300">
                <ArrowUpRight className="!w-4 !h-4 !transform group-hover:!translate-x-0.5 group-hover:!-translate-y-0.5 !transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* SECCIÓN 2: GRID FIJO DE VIDEOS (Aparecen los 3 juntos) */}
        <div className="!border-t !border-white/5 !pt-16 !mb-12">
          <div className="!text-center !mb-10">
            <span
              className="!inline-flex !items-center !gap-2 !font-bold !text-xs !px-4 !py-1.5 !rounded-full !uppercase !tracking-wider !mb-2"
              style={{ background: "rgba(255, 171, 0, 0.1)", color: "#ffab00" }}
            >
              🎬 Contenido
            </span>
            <h2 className="!text-2xl md:!text-3xl !font-black !text-white !tracking-tight">
              Pingu <span className="!text-amber-500">Media</span>
            </h2>
            <p className="!text-slate-400 !max-w-md !mx-auto !text-sm !mt-1">
              Videos informativos, unboxings y guías rápidas para tu
              importación.
            </p>
          </div>

          {/* Grid Responsivo: 1 columna en móvil, 3 columnas en pantallas medianas/grandes */}
          <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-6 !w-full">
            {videos.map((video) => (
              <Link
                key={video.id}
                to={video.url}
                className="!group !flex !flex-col !rounded-2xl !border !overflow-hidden !transition-all !duration-300 hover:!scale-[1.03]"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 171, 0, 0.25)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px -5px rgba(255, 171, 0, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Contenedor de Miniatura */}
                <div className="!relative !w-full !aspect-video !overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="!w-full !h-full !object-cover group-hover:!scale-105 !transition-transform !duration-500"
                  />
                  {/* Capa oscura interna + Botón Play flotante */}
                  <div className="!absolute !inset-0 !bg-black/30 group-hover:!bg-black/50 !flex !items-center !justify-center !transition-colors">
                    <div className="!w-12 !h-12 !rounded-full !bg-amber-500 !flex !items-center !justify-center !shadow-lg !shadow-amber-600/20 group-hover:!scale-110 group-hover:!bg-[#ffab00] !transition-all">
                      <Play className="!w-4 !h-4 !text-black !fill-black !translate-x-0.5" />
                    </div>
                  </div>
                  {/* Duración */}
                  <span className="!absolute !bottom-2 !right-2 !bg-black/70 !text-white !text-[10px] !font-bold !px-2 !py-0.5 !rounded-md">
                    {video.duration}
                  </span>
                </div>

                {/* Contenido/Textos de la Tarjeta */}
                <div className="!p-4 !flex-1 !flex !flex-col !justify-between !text-left">
                  <h3 className="!text-sm !font-bold !text-white group-hover:!text-amber-400 !transition-colors !line-clamp-2 !leading-snug">
                    {video.title}
                  </h3>
                  <span className="!text-[11px] !text-amber-500/90 !font-bold !mt-4 !flex !items-center !gap-1">
                    Ver video <ArrowUpRight className="!w-3 !h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer / Comunidad Banner */}
        <div
          className="!p-5 !rounded-2xl !max-w-xl !mx-auto !text-center !border"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            borderColor: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <p className="!text-slate-400 !text-sm">
            💬 ¿Tienes dudas? Únete a nuestra comunidad global y sé parte activa
            de la **Colonia Pingu**.
          </p>
        </div>
      </div>
    </div>
  );
}
