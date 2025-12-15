export default function UviActual({ uvi }) {
  const determinarNivel = (uvi) => {
    if (uvi < 3) return "Bajo";
    if (uvi < 6) return "Moderado";
    if (uvi < 8) return "Alto";
    if (uvi < 11) return "Muy Alto";
    return "Extremo";
  };

  return (
    <div className="uvi-card">
      <h2>UVI ACTUAL</h2>
      <div className="uvi-valor">
        {uvi !== null ? uvi.toFixed(2) : "--"}
      </div>
      <strong>{uvi !== null ? determinarNivel(uvi) : ""}</strong>
    </div>
  );
}
