import WebMap from '@arcgis/core/WebMap';

export const createWebMapFromItem = (itemId: string) => {
  return new WebMap({
    portalItem: {
      id: itemId,
    },
  });
};
