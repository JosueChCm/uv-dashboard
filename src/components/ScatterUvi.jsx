import { Scatter } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import "../chartsConfig";

export default function ScatterUvi() {
  const [puntos, setPuntos] = useState([]);

  useEffect(() => {
    onValue(ref(db, "uv_data"), (snap) => {
      const data = snap.val();
      if (!data) return;

      const scatterData = Object.values(data).map((d) => {
        const hora = new Date(d.timestamp).getHours();
        return { x: hora, y: d.uvi };
      });

      setPuntos(scatterData);
    });
  }, []);

  return (
    <div className="card">
      <h3>Dispersión UVI vs Hora</h3>

      <Scatter
        data={{
          datasets: [
            {
              label: "Lecturas UV",
              data: puntos,
              backgroundColor: "rgba(59,130,246,0.7)",
            },
          ],
        }}
        options={{
          scales: {
            x: {
              title: { display: true, text: "Hora del día", color: "#e5e7eb" },
              ticks: { color: "#9ca3af" },
              grid: { color: "rgba(255,255,255,0.08)" },
            },
            y: {
              title: { display: true, text: "Índice UV", color: "#e5e7eb" },
              ticks: { color: "#9ca3af" },
              grid: { color: "rgba(255,255,255,0.08)" },
            },
          },
          plugins: {
            legend: { labels: { color: "#e5e7eb" } },
          },
        }}
      />
    </div>
  );
}
