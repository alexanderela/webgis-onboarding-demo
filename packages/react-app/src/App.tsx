import "./App.css";

function App() {
  const itemId = "73f23d530b494f99a46c750bce66e01e";
  return (
    <>
      <header className="app-header">
        <p className="header-text">
          Different Types of Volcanoes Around the World
        </p>
      </header>

      <div style={{ width: "100vw", height: "100vh" }}>
        <arcgis-web-map item-id={itemId}></arcgis-web-map>
      </div>
    </>
  );
}

export default App;
