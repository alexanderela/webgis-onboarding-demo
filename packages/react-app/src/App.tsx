import "./App.css";

function App() {
  const itemId = "73f23d530b494f99a46c750bce66e01e";
  return (
    <div className="app-root">
      <header className="app-header">
        <p className="header-text">
          Different Types of Volcanoes Around the World
        </p>
      </header>

      <div className="map-container">
        <arcgis-web-map item-id={itemId} />
        <arcgis-popup-panel />
      </div>
    </div>
  );
}

export default App;
