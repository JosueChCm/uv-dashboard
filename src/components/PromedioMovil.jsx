import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { chartOptions } from "../chartsConfig";
import { promedioMovil } from "../utils/estadistica";

export default function PromedioMovil() {
  const [datos, setDatos] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    onValue(ref(db, "uv_data"), (snap) => {
      const arr = Object.values(snap.val() || {})
        .filter(d => typeof d.uvi === "number");

      setDatos(arr.map(d => d.uvi));
      setLabels(arr.map(d =>
        new Date(d.timestamp * 1000).toLocaleTimeString()
      ));
    });
  }, []);

  const pm = promedioMovil(datos);

  return (
    <div className="card" style={{ height: "360px" }}>
      <h3>📉 Promedio móvil del Índice UV</h3>

      <Line
        options={chartOptions}
        data={{
          labels,
          datasets: [
            {
              label: "UVI",
              data: datos,
              borderColor: "#64748b",
              borderWidth: 2,
              tension: 0.35,
            },
            {
              label: "Promedio móvil",
              data: pm,
              borderColor: "#3b82f6",
              borderWidth: 3,
              tension: 0.4,
            },
          ],
        }}
      />

      <p style={{ marginTop: "12px", fontSize: "0.9rem", opacity: 0.85 }}>
        Este gráfico suaviza la señal del UVI para identificar tendencias y
        periodos de mayor exposición solar.
      </p>
    </div>
  );
}
