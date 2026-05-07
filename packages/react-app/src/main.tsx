import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@onboarding/webgis-components";
import "@esri/calcite-components";
import "./index.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
