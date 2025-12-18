import { Line } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { tsToMs } from "../chartsConfig";

export default function EvolucionUvi() {
  const [datos, setDatos] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const unsub = onValue(ref(db, "uv_data"), (snap) => {
      const raw = snap.val();
      if (!raw) return;

      const arr = Object.values(raw)
        .filter(d => typeof d?.uvi === "number" && typeof d?.timestamp === "number")
        .sort((a, b) => tsToMs(a.timestamp) - tsToMs(b.timestamp));

      setDatos(arr.map(d => d.uvi));
      setLabels(
        arr.map(d =>
          new Date(tsToMs(d.timestamp)).toLocaleTimeString("es-PE", {
            hour: "2-digit",
            minute: "2-digit",
          })
        )
      );
    });

    return () => unsub();
  }, []);

  const data = useMemo(() => ({
    labels,
datasets: [
  {
    label: "UVI",
    data: datos,
    borderColor: "#3b82f6",
    backgroundColor: "rgba(59,130,246,0.25)",
    tension: 0.35,
    fill: true,
    pointRadius: 3,
  },

  nivelLinea(2, "Nivel 2", labels),
  nivelLinea(5, "Nivel 5", labels),
  nivelLinea(7, "Nivel 7", labels),
  nivelLinea(10, "Nivel 10", labels),
]

  }), [datos, labels]);

  return (
    <div className="card">
      <h3>Evolución del índice UV</h3>

      {/* 🔥 CONTENEDOR FIJO */}
      <div style={{ height: 320, width: "100%", position: "relative" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

/* ===========================
   HELPERS
=========================== */

function nivelLinea(valor, label, labels) {
  return {
    label,
    data: labels.map(() => valor),   // 🔥 CLAVE
    borderColor: "rgba(255,255,255,0.35)",
    borderDash: [6, 6],
    borderWidth: 1,
    pointRadius: 0,
    fill: false,
  };
}


const options = {
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    intersect: false,
    mode: "index",
  },

  plugins: {
    legend: {
      labels: { color: "#e5e7eb" },
    },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#f9fafb",
      bodyColor: "#e5e7eb",
      borderColor: "#334155",
      borderWidth: 1,
    },
  },

  scales: {
    x: {
      ticks: { color: "#9ca3af", maxRotation: 0 },
      grid: { color: "rgba(255,255,255,0.08)" },
    },

    y: {
      min: 0,
      max: 10,              // 🔥 CLAVE ABSOLUTA
      ticks: { color: "#9ca3af" },
      grid: { color: "rgba(255,255,255,0.08)" },
    },
  },
};
