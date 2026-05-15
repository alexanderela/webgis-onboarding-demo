import type { HTMLAttributes } from "react";

declare namespace JSX {
  interface IntrinsicElements {
    "arcgis-popup-panel": HTMLAttributes<HTMLElement>;
    "arcgis-web-map": HTMLAttributes<HTMLElement>;
  }
}
