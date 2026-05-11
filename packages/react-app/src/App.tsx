import { useEffect, useState, useCallback } from "react";
import "./App.css";
import type { FeatureSelection } from "./domain/FeatureSelection";

function App() {
  const [selectedFeature, setSelectedFeature] =
    useState<FeatureSelection | null>(null);
  const itemId = "73f23d530b494f99a46c750bce66e01e";

  const handleFeatureSelected = useCallback((e: any) => {
    setSelectedFeature(e.detail.selection);
  }, []);

  const handleSelectionCleared = useCallback(() => {
    setSelectedFeature(null);
  }, []);

  useEffect(() => {
    window.addEventListener("feature-selected", handleFeatureSelected);
    window.addEventListener("selection-cleared", handleSelectionCleared);

    return () => {
      window.removeEventListener("feature-selected", handleFeatureSelected);
      window.removeEventListener("selection-cleared", handleSelectionCleared);
    };
  }, [handleFeatureSelected, handleSelectionCleared]);

  return (
    <div className="app-root">
      <header className="app-header">
        <p className="header-text">Volcanoes Around the World</p>
      </header>
      <div className="map-container">
        <arcgis-web-map item-id={itemId} />
        <arcgis-popup-panel selection={selectedFeature} />
      </div>
    </div>
  );
}

export default App;
