export function getNivelUvi(uvi) {
  if (uvi < 3) return { texto: "Bajo", color: "#22c55e" };
  if (uvi < 6) return { texto: "Moderado", color: "#facc15" };
  if (uvi < 8) return { texto: "Alto", color: "#fb923c" };
  return { texto: "Muy Alto", color: "#ef4444" };
}
