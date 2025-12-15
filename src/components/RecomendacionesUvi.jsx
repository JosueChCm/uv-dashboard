export default function RecomendacionesUvi({ uvi }) {
  let texto = "";

  if (uvi < 3)
    texto = "Nivel bajo: sin riesgo significativo.";
  else if (uvi < 6)
    texto = "Nivel moderado: usar gorra y lentes.";
  else if (uvi < 8)
    texto = "Nivel alto: usar bloqueador SPF 50+.";
  else
    texto = "Nivel muy alto: evitar exposición solar directa.";

  return (
    <div className="card">
      <h3>Recomendaciones</h3>
      <p>{texto}</p>
    </div>
  );
}
