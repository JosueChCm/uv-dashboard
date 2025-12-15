import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function RegistrosSection() {
  const [registros, setRegistros] = useState({});

  useEffect(() => {
    onValue(ref(db, "uv_data"), (snap) => {
      const data = snap.val();
      if (!data) return;

      const agrupados = {};

      Object.values(data).forEach((d) => {
        if (!d.timestamp) return;

        const date = new Date(d.timestamp);

        const fecha = date.toLocaleDateString("es-PE");
        const hora = date.toLocaleTimeString("es-PE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        if (!agrupados[fecha]) agrupados[fecha] = [];
        agrupados[fecha].push({
          hora,
          uvi: d.uvi,
        });
      });

      setRegistros(agrupados);
    });
  }, []);

  return (
    <div className="records-container">
      <h2>Registros históricos</h2>

      {Object.entries(registros).map(([fecha, items]) => (
        <details key={fecha} className="card">
          <summary>{fecha}</summary>

          {items.map((r, i) => (
            <div key={i} style={{ padding: "6px 0" }}>
              ⏰ {r.hora} — ☀️ UVI: {r.uvi.toFixed(2)}
            </div>
          ))}
        </details>
      ))}
    </div>
  );
}
