import { Radar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import "../chartsConfig";

export default function RadarUvi() {
  const [promedios, setPromedios] = useState([0, 0, 0, 0]);

  useEffect(() => {
    onValue(ref(db, "uv_data"), (snap) => {
      const data = snap.val();
      if (!data) return;

      const grupos = {
        manana: [],
        mediodia: [],
        tarde: [],
        noche: [],
      };

      Object.values(data).forEach((d) => {
        const hora = new Date(d.timestamp).getHours();

        if (hora >= 6 && hora < 10) grupos.manana.push(d.uvi);
        else if (hora >= 10 && hora < 14) grupos.mediodia.push(d.uvi);
        else if (hora >= 14 && hora < 18) grupos.tarde.push(d.uvi);
        else if (hora >= 18 && hora < 22) grupos.noche.push(d.uvi);
      });

      const avg = (arr) =>
        arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

      setPromedios([
        avg(grupos.manana),
        avg(grupos.mediodia),
        avg(grupos.tarde),
        avg(grupos.noche),
      ]);
    });
  }, []);

  return (
    <div className="card">
      <h3>UVI promedio por franja horaria</h3>

      <Radar
        data={{
          labels: ["Mañana", "Mediodía", "Tarde", "Noche"],
          datasets: [
            {
              label: "UVI promedio",
              data: promedios,
              backgroundColor: "rgba(59,130,246,0.25)",
              borderColor: "#3b82f6",
              borderWidth: 2,
              pointBackgroundColor: "#3b82f6",
            },
          ],
        }}
        options={{
          scales: {
            r: {
              angleLines: { color: "rgba(255,255,255,0.1)" },
              grid: { color: "rgba(255,255,255,0.1)" },
              pointLabels: { color: "#e5e7eb" },
              ticks: { color: "#9ca3af" },
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
