import "./App.css";

function App() {
  const itemId = "73f23d530b494f99a46c750bce66e01e";
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <arcgis-map-view item-id={itemId}></arcgis-map-view>
      </div>
    </>
  );
}

export default App;
