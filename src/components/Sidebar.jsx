export default function Sidebar({ seccion, setSeccion }) {
  const Item = ({ id, label }) => (
    <div
      className={`sidebar-item ${seccion === id ? "active" : ""}`}
      onClick={() => setSeccion(id)}
    >
      {label}
    </div>
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span className="sidebar-title-uv">UV</span>
        <span className="sidebar-title-uv">Dashboard</span>
        </div>
    <div className="sidebar-title-line"></div>


      <Item id="uvi" label="UVI Actual" />
      <Item id="graficos" label="Gráficos" />
      <Item id="registros" label="Registros" />
    </aside>
  );
}
