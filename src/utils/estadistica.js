export function media(datos) {
  return datos.reduce((a, b) => a + b, 0) / datos.length;
}

export function mediana(datos) {
  const ordenados = [...datos].sort((a, b) => a - b);
  const m = Math.floor(ordenados.length / 2);
  return ordenados.length % 2
    ? ordenados[m]
    : (ordenados[m - 1] + ordenados[m]) / 2;
}

export function desviacion(datos) {
  const m = media(datos);
  const v = datos.reduce((a, b) => a + (b - m) ** 2, 0) / datos.length;
  return Math.sqrt(v);
}

export function promedioMovil(datos, n = 5) {
  return datos.map((_, i) =>
    i < n
      ? null
      : datos.slice(i - n, i).reduce((a, b) => a + b, 0) / n
  );
}
