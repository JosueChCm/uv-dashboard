import GraficoUvi from "../components/GraficoUvi";
import HistogramaUvi from "../components/HistogramaUvi";
import RadarUvi from "../components/RadarUvi";
import ScatterUvi from "../components/ScatterUvi";
import AnalisisUvi from "../components/AnalisisUvi";

export default function GraficosSection() {
  return (
    <div className="charts-grid">
      <GraficoUvi />
      <HistogramaUvi />
      <RadarUvi />
      <ScatterUvi />
      <AnalisisUvi />
    </div>
  );
}
