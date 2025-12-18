import { Scatter } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { darkChartOptions } from "../chartsConfig";
import { getNivelUvi } from "../utils/uviUtils";

export default function ScatterUvi() {
  const [puntos, setPuntos] = useState([]);

  useEffect(() => {
    onValue(ref(db, "uv_data"), (snap) => {
      const data = snap.val();
      if (!data) return;

      const scatterData = Object.values(data)
        .filter(d => typeof d.uvi === "number" && d.timestamp)
        .map(d => ({
          x: new Date(d.timestamp * 1000).getHours(),
          y: d.uvi
        }));

      setPuntos(scatterData);
    });
  }, []);

  return (
    <div className="card">
      <h3 className="section-title">
         Dispersión UVI vs Hora del día
      </h3>

      <div className="chart-wrapper">
        <Scatter
          data={{
            datasets: [
              {
                label: "Lecturas UV",
                data: puntos,
                backgroundColor: "rgba(34,197,94,0.75)",
                pointRadius: 4,
                pointHoverRadius: 6
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                min: 0,
                max: 23,
                title: {
                  display: true,
                  text: "Hora del día",
                  color: "#e5e7eb"
                },
                ticks: {
                  stepSize: 1,
                  color: "#9ca3af"
                },
                grid: {
                  color: "rgba(255,255,255,0.06)"
                }
              },
              y: {
                min: 0,
                max: 10,
                title: {
                  display: true,
                  text: "Índice UV",
                  color: "#e5e7eb"
                },
                ticks: {
                  color: "#9ca3af"
                },
                grid: {
                  color: "rgba(255,255,255,0.06)"
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: "#e5e7eb"
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}
