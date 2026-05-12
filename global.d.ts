import type { DetailedHTMLProps, HTMLAttributes } from "react";

// 1. Define your custom element's specific attributes
interface MyCustomElementAttributes {
  "item-id": string;
}

// 2. Augment the JSX namespace within the React runtime module
declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      // Use DetailedHTMLProps to ensure standard props like 'ref' and 'key' are supported
      "arcgis-web-map": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & MyCustomElementAttributes,
        HTMLElement
      >;
    }
  }
}
