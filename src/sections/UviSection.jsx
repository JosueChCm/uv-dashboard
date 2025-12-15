import { useState, useEffect } from "react";
import { ref, onChildAdded, query, limitToLast } from "firebase/database";
import { db } from "../firebase";
import UviActual from "../components/UviActual";
import RecomendacionesUvi from "../components/RecomendacionesUvi";

export default function UviSection() {
  const [uvi, setUvi] = useState(null);

  useEffect(() => {
    const q = query(ref(db, "uv_data"), limitToLast(1));
    onChildAdded(q, (snap) => {
      const d = snap.val();
      if (!d || d.uvi === undefined) return;
      setUvi(d.uvi);
    });
  }, []);

  return (
    <div className="section-grid">
      {/* CONTENEDOR HERO */}
      <div className="uvi-hero">
        <UviActual uvi={uvi} />
      </div>

      {/* RECOMENDACIONES */}
      <RecomendacionesUvi uvi={uvi ?? 0} />
    </div>
  );
}
