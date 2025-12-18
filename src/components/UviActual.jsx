export default function UviActual({ uvi }) {
  const obtenerNivel = (uvi) => {
    if (uvi <= 2) return { text: "Bajo", cls: "nivel-bajo" };
    if (uvi <= 5) return { text: "Moderado", cls: "nivel-moderado" };
    if (uvi <= 7) return { text: "Alto", cls: "nivel-alto" };
    return { text: "Muy alto", cls: "nivel-muy-alto" };
  };

  const nivel = uvi !== null ? obtenerNivel(uvi) : null;

  return (
    <div className="uvi-card">
      <h2>UVI ACTUAL</h2>

      <div className="uvi-valor">
        {uvi !== null ? uvi.toFixed(2) : "--"}
      </div>

      {nivel && (
        <strong className={nivel.cls}>
          {nivel.text}
        </strong>
      )}
    </div>
  );
}
