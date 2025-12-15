import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  const [seccion, setSeccion] = useState("uvi");

  // Aquí eliminamos la lógica para alternar entre modo oscuro y claro
  return (
    <div className="dashboard">
      <Sidebar seccion={seccion} setSeccion={setSeccion} />

      {/* CONTENIDO PRINCIPAL */}
      <div className="dashboard-content">
        {children(seccion)}
      </div>
    </div>
  );
}
