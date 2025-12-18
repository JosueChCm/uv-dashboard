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
        if (!d.timestamp || typeof d.uvi !== "number") return;

        const date = new Date(d.timestamp * 1000);
        if (date.getFullYear() < 2024) return;

        const fecha = date.toLocaleDateString("es-PE");
        const hora = date.toLocaleTimeString("es-PE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        if (!agrupados[fecha]) {
          agrupados[fecha] = {
            items: [],
            suma: 0,
            maxUvi: -1,
            horaPico: "",
          };
        }

        agrupados[fecha].items.push({ hora, uvi: d.uvi });
        agrupados[fecha].suma += d.uvi;

        // 🔥 DETECTOR DE HORA PICO
        if (d.uvi > agrupados[fecha].maxUvi) {
          agrupados[fecha].maxUvi = d.uvi;
          agrupados[fecha].horaPico = hora;
        }
      });

      setRegistros(agrupados);
    });
  }, []);

  const nivelUvi = (uvi) => {
    if (uvi <= 2) return { text: "Bajo", cls: "nivel-bajo" };
    if (uvi <= 5) return { text: "Moderado", cls: "nivel-moderado" };
    if (uvi <= 7) return { text: "Alto", cls: "nivel-alto" };
    return { text: "Muy alto", cls: "nivel-muy-alto" };
  };

  return (
    <div className="records-container">
      <h2>Registros históricos</h2>

      {Object.entries(registros).map(([fecha, info]) => {
        const promedio = info.suma / info.items.length;

        return (
          <details key={fecha} className="card">
            <summary>
              {fecha}
              <span className="avg-badge">
                UVI PROMEDIO: {promedio.toFixed(2)}
              </span>
              <span className="avg-badge">
                🔥 PICO: {info.maxUvi.toFixed(2)} a las {info.horaPico}
              </span>
            </summary>

            <div className="table-container">
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Índice UV</th>
                    <th>Nivel</th>
                  </tr>
                </thead>
                <tbody>
                  {info.items.map((r, i) => {
                    const nivel = nivelUvi(r.uvi);
                    return (
                      <tr key={i}>
                        <td>{r.hora}</td>
                        <td className="uvi">{r.uvi.toFixed(2)}</td>
                        <td className={nivel.cls}>{nivel.text}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </details>
        );
      })}
    </div>
  );
}
