import { Radar } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { darkRadarOptions, tsToMs } from "../chartsConfig";

export default function RadarUvi() {
  const [promedios, setPromedios] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const unsub = onValue(ref(db, "uv_data"), (snap) => {
      const data = snap.val();
      if (!data) {
        setPromedios([0, 0, 0, 0]);
        return;
      }

      const grupos = { manana: [], mediodia: [], tarde: [], noche: [] };

      Object.values(data).forEach((d) => {
        if (!d || typeof d.uvi !== "number" || typeof d.timestamp !== "number") return;

        const date = new Date(tsToMs(d.timestamp));
        const hora = date.getHours();

        if (hora >= 6 && hora < 10) grupos.manana.push(d.uvi);
        else if (hora >= 10 && hora < 14) grupos.mediodia.push(d.uvi);
        else if (hora >= 14 && hora < 18) grupos.tarde.push(d.uvi);
        else if (hora >= 18 && hora < 22) grupos.noche.push(d.uvi);
      });

      const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

      setPromedios([
        avg(grupos.manana),
        avg(grupos.mediodia),
        avg(grupos.tarde),
        avg(grupos.noche),
      ]);
    });

    return () => unsub();
  }, []);

  const data = useMemo(
    () => ({
      labels: ["Mañana", "Mediodía", "Tarde", "Noche"],
      datasets: [
        {
          label: "UVI promedio",
          data: promedios.map((v) => Math.max(0, Math.min(v, 10))),
          backgroundColor: "rgba(59,130,246,0.22)",
          borderColor: "rgba(59,130,246,0.95)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(59,130,246,1)",
          pointRadius: 3,
        },
      ],
    }),
    [promedios]
  );

  return (
    <div className="card">
      <h3>UVI promedio por franja horaria</h3>

      {/* Altura fija => no baja el gráfico ni alarga la página */}
      <div style={{ height: 320, width: "100%", position: "relative" }}>
        <Radar data={data} options={darkRadarOptions} />
      </div>
    </div>
  );
}
