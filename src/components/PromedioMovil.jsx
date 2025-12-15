import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { promedioMovil } from "../utils/estadistica";

export default function PromedioMovil() {
  const [datos, setDatos] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    onValue(ref(db, "uv_data"), (snap) => {
      const arr = Object.values(snap.val() || {});
      setDatos(arr.map(d => d.uvi));
      setLabels(arr.map(d => d.timestamp));
    });
  }, []);

  const pm = promedioMovil(datos);

  return (
    <div className="card" style={{ width: "100%" }}>
      <h3>Promedio Móvil del UVI</h3>
      <Line
        data={{
          labels,
          datasets: [
            { label: "UVI", data: datos },
            { label: "Promedio móvil", data: pm }
          ]
        }}
      />
    <p style={{ marginTop: "12px", fontSize: "0.95rem" }}>
        Interpretación: Este gráfico muestra la variación del índice UV a lo largo
        del tiempo, permitiendo identificar picos de radiación y periodos de mayor
        riesgo.
    </p>

    </div>
  );
}
