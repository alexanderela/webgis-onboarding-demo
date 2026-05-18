import { useEffect, useState, useCallback, useRef } from "react";
import "./index.css";
import "./App.css";
import type { FeatureSelection } from "./domain/FeatureSelection";

const customAttributes = {
  id: "FID",
  title: "Volcano_Name",
};

function App() {
  const mapRef = useRef<any>(null);
  const [selectedFeature, setSelectedFeature] =
    useState<FeatureSelection | null>(null);
  const itemId = "73f23d530b494f99a46c750bce66e01e";

  const handleFeatureSelected = useCallback((e: CustomEvent) => {
    setSelectedFeature(e.detail.selection);
  }, []);

  const handleSelectionCleared = useCallback(() => {
    setSelectedFeature(null);
  }, []);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    setTimeout(() => {
      el.customAttributes = customAttributes;
    });
  }, []);

  useEffect(() => {
    window.addEventListener(
      "feature-selected",
      handleFeatureSelected as EventListener,
    );
    window.addEventListener("selection-cleared", handleSelectionCleared);

    return () => {
      window.removeEventListener(
        "feature-selected",
        handleFeatureSelected as EventListener,
      );
      window.removeEventListener("selection-cleared", handleSelectionCleared);
    };
  }, [handleFeatureSelected, handleSelectionCleared]);

  return (
    <div className="app-root">
      <header className="app-header">
        <p className="header-text">Volcanoes Around the World</p>
      </header>
      <div className="map-container">
        <arcgis-web-map item-id={itemId} ref={mapRef}></arcgis-web-map>
        <arcgis-popup-panel selection={selectedFeature}></arcgis-popup-panel>
      </div>
    </div>
  );
}

export default App;
