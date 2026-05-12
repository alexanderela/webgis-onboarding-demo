/// <reference types="vite/client" />
/// <reference types="@arcgis/map-components/types/react" />

import { CustomElements } from "@onboarding/webgis-components/types/custom-element-jsx";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}
export {};
