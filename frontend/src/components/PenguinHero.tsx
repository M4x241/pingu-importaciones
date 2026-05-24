const PenguinHero = () => {
  return (
    <section
      className="relative min-h-[20vh]  flex items-center overflow-hidden !pt-24 flex-col justify-center text-center "
      style={{
        background: "#0B0F19",
      }}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
        Todos los <span className="text-amber">Productos</span> en un Solo Lugar
      </h2>
    </section>
  );
};

export default PenguinHero;
