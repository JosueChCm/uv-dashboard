import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,           // 👈 AÑADIR
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler            // 👈 REGISTRAR
);


export const darkChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#e5e7eb",
      },
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
      },
      grid: {
        color: "rgba(255,255,255,0.06)",
      },
    },
    y: {
      ticks: {
        color: "#9ca3af",
      },
      grid: {
        color: "rgba(255,255,255,0.06)",
      },
    },
  },
};
