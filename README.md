# WebGIS Onboarding Demo

This project demonstrates the WebGIS narrative using a small, reusable web component library built using Lit, the ArcGIS Maps SDK for JavaScript, and React.

The primary idea here is that a single Web Map configured in ArcGIS Online can power multiple applications, from no-code apps to highly customized ones.

## What this demonstrates

- A single Web Map as the main source of truth for data and configuration
- Reuse of the same Web Map across different types of applications:
  - ArcGIS Online (Map Viewer & Instant Apps)
  - Custom web components (Lit)
  - React applications
- Separation of responsibilities across web components
  - Map component handles interaction and data
  - Custom popup component handles presentation of feature data

## Project structure

This project uses a `pnpm` monorepo:

```
packages/
    webgis-components → Lit based web component library
    react-app → React app consuming web components
```

```
- webgis-components:
    - <arcgis-web-map> component
    - <arcgis-popup-panel> component
    - Vitest tests and Storybook

- react-app:
    - Simple application showing consumption of above web components
```

## Data flow

Upon map click:

- `feature-selected` event is emitted
- React/Storybook updates state
- `<arcgis-popup-panel>` renders data from selected feature

Web Map defines which attributes are returned, ensuring consistent display of data across applications

## Getting started

Install dependencies:
From root: `pnpm install`

Run Storybook:
From root: `pnpm --filter webgis-components storybook`

Run React app:
From root: `pnpm --filter react-app dev`

## Key concepts

- Web Components (Lit) allow building reusable UI components
- Property vs attribute binding when passing data in React vs Lit components
- Event-driven communication between components and between components and React
- Storybook for documenting component states
- Using Web Map configuration, including Arcade, rather than hardcoding UI logic
