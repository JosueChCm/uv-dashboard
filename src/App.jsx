import "./chartsConfig";
import "./styles/theme.css";

import DashboardLayout from "./layout/DashboardLayout";

import UviSection from "./sections/UviSection";
import GraficosSection from "./sections/GraficosSection";
import RegistrosSection from "./sections/RegistrosSection";

export default function App() {
  return (
    <>
      <DashboardLayout>
        {(seccion) => {
          if (seccion === "uvi") return <UviSection />;
          if (seccion === "graficos") return <GraficosSection />;
          if (seccion === "registros") return <RegistrosSection />;
        }}
      </DashboardLayout>
    </>
  );
}
