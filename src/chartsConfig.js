import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController,
  ScatterController,
  RadarController,
} from "chart.js";

ChartJS.register(
  // Controllers
  LineController,
  BarController,
  ScatterController,
  RadarController,

  // Elements + Scales
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,

  // Plugins
  Tooltip,
  Legend,
  Filler
);

// Helper: soporta timestamp en segundos o milisegundos
export const tsToMs = (ts) => {
  if (typeof ts !== "number") return 0;
  return ts < 1e12 ? ts * 1000 : ts; // si es "segundos", lo pasa a ms
};

export const darkChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 600 },
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
      ticks: {
        color: "#9ca3af",
        maxRotation: 0,
        autoSkip: true,
      },
      grid: { color: "rgba(255,255,255,0.08)" },
      border: { color: "rgba(255,255,255,0.12)" },
    },
    y: {
      ticks: { color: "#9ca3af" },
      grid: { color: "rgba(255,255,255,0.08)" },
      border: { color: "rgba(255,255,255,0.12)" },
      beginAtZero: true,
    },
  },
};

export const darkRadarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 700 },
  plugins: {
    legend: { labels: { color: "#e5e7eb" } },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#f9fafb",
      bodyColor: "#e5e7eb",
      borderColor: "#334155",
      borderWidth: 1,
    },
  },
  scales: {
    r: {
      angleLines: { color: "rgba(255,255,255,0.10)" },
      grid: { color: "rgba(255,255,255,0.10)" },
      pointLabels: { color: "#e5e7eb" },
      ticks: {
        color: "#9ca3af",
        backdropColor: "rgba(0,0,0,0)",
      },
      beginAtZero: true,
      suggestedMax: 10, // tu máximo visible es 10.00
    },
  },
};
