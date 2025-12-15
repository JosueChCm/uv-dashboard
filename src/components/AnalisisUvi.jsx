import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function AnalisisUvi() {
  const [promedio, setPromedio] = useState(0);
  const [maximo, setMaximo] = useState(0);
  const [desviacion, setDesviacion] = useState(0);

  useEffect(() => {
    const uvRef = ref(db, "uv_data");

    onValue(uvRef, (snapshot) => {
      const datos = Object.values(snapshot.val() || {}).map(d => d.uvi);

      if (datos.length === 0) return;

      const mean = datos.reduce((a, b) => a + b, 0) / datos.length;
      const variance =
        datos.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / datos.length;
      const std = Math.sqrt(variance);

      setPromedio(mean);
      setMaximo(Math.max(...datos));
      setDesviacion(std);
    });
  }, []);

  return (
    <section>
      <h3>Análisis Estadístico</h3>
      <ul>
        <li>Promedio UVI: {promedio.toFixed(2)}</li>
        <li>Máximo UVI registrado: {maximo.toFixed(2)}</li>
        <li>Desviación estándar: {desviacion.toFixed(2)}</li>
      </ul>

      <p>
        Interpretación: Una desviación estándar{" "}
        {desviacion > 2
          ? "alta indica variabilidad significativa en la radiación UV."
          : "baja indica estabilidad en los niveles de radiación UV."}
      </p>
    </section>
  );
}
