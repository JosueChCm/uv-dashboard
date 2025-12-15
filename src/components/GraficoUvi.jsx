import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ref, onChildAdded } from "firebase/database";
import { db } from "../firebase";
import { darkChartOptions } from "../chartsConfig";

export default function GraficoUvi() {
  const [labels, setLabels] = useState([]);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const uvRef = ref(db, "uv_data");

    onChildAdded(uvRef, (snap) => {
      const d = snap.val();
      if (!d) return;

      const hora = new Date(d.timestamp).toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setLabels((prev) => [...prev.slice(-19), hora]);
      setDatos((prev) => [...prev.slice(-19), d.uvi]);
    });
  }, []);

  return (
    <div className="card" style={{ height: "380px" }}>
      <h3>Evolución del Índice UV</h3>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "UVI",
              data: datos,
              tension: 0.35,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59,130,246,0.15)",
              pointRadius: 3,
              pointBackgroundColor: "#60a5fa",
              fill: true,
            },
          ],
        }}
        options={darkChartOptions}
      />
    </div>
  );
}
