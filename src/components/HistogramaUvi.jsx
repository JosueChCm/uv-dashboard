import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { darkChartOptions } from "../chartsConfig";
// Asegúrate de usar el modo oscuro

export default function HistogramaUvi() {
  const [frecuencias, setFrecuencias] = useState([]);

  useEffect(() => {
    onValue(ref(db, "uv_data"), (snap) => {
      const raw = snap.val();
      if (!raw) return;

      const datos = Object.values(raw).map(d => d.uvi);
      const bins = Array(11).fill(0);

      datos.forEach(uvi => {
        const idx = Math.min(Math.floor(uvi), 10);
        bins[idx]++;
      });

      setFrecuencias(bins);
    });
  }, []);

  return (
    <div className="card">
  <h3>Histograma del Índice UV</h3>

  <div style={{ height: "320px", width: "100%" }}>
    <Bar
      data={{
        labels: [...Array(11).keys()].map(i => `${i}–${i + 1}`),
        datasets: [
          {
            label: "Frecuencia",
            data: frecuencias,
            backgroundColor: "rgba(59,130,246,0.6)",
          },
        ],
      }}
      options={darkChartOptions}
    />
  </div>
</div>

  );
}
