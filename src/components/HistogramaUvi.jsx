import { Bar } from "react-chartjs-2";
import { useEffect, useState, useMemo } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { darkChartOptions } from "../chartsConfig";

export default function HistogramaUvi() {
  const [frecuencias, setFrecuencias] = useState(Array(11).fill(0));

  useEffect(() => {
    const unsub = onValue(ref(db, "uv_data"), (snap) => {
      const raw = snap.val();
      if (!raw) {
        setFrecuencias(Array(11).fill(0));
        return;
      }

      const bins = Array(11).fill(0);

      Object.values(raw).forEach((d) => {
        if (!d || typeof d.uvi !== "number") return;
        const u = Math.max(0, Math.min(d.uvi, 10));
        const idx = Math.min(Math.floor(u), 10);
        bins[idx]++;
      });

      setFrecuencias(bins);
    });

    return () => unsub();
  }, []);

  const data = useMemo(() => {
    const labels = [...Array(11).keys()].map((i) => (i === 10 ? "10" : `${i}–${i + 1}`));
    return {
      labels,
      datasets: [
        {
          label: "Frecuencia",
          data: frecuencias,
          backgroundColor: "rgba(59,130,246,0.55)",
          borderColor: "rgba(59,130,246,0.9)",
          borderWidth: 1,
          borderRadius: 8,
        },
      ],
    };
  }, [frecuencias]);

  // Importante: contenedor con altura fija + options maintainAspectRatio:false
  return (
    <div className="card">
      <h3>Distribución del Índice UV</h3>

      <div style={{ height: 320, width: "100%", position: "relative" }}>
        <Bar data={data} options={darkChartOptions} />
      </div>
    </div>
  );
}
