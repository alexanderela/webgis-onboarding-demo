import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';

export const createMapView = (container: HTMLDivElement, map: WebMap) => {
  return new MapView({
    container,
    map,
  });
};
