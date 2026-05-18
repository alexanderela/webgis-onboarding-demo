import { LitElement, html, css } from 'lit';
import { property, query } from 'lit/decorators.js';

import MapView from '@arcgis/core/views/MapView';

import { createMapView, createWebMapFromItem } from '../../arcgis';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

type GraphicHit = {
  graphic: {
    attributes: Record<string, unknown>;
    geometry: unknown;
    layer?: unknown | null | undefined;
  };
};

type CustomAttributes = {
  id?: string;
  title?: string;
};

export default class ArcgisMapView extends LitElement {
  @property({ attribute: 'item-id' })
  itemId: string = '';

  @property({ attribute: false })
  customAttributes?: CustomAttributes = {};

  render() {
    return html` <div id="viewDiv" />`;
  }

  @query('#viewDiv')
  private viewDiv!: HTMLDivElement;

  private mapView: MapView | null = null;

  firstUpdated() {
    requestAnimationFrame(() => {
      this.initializeMapView();
    });
  }

  /**
   * Create a new WebMap and MapView and set the map view to display the WebMap.
   * Specify that only attributes configured in WebMap to be visible should be returned in
   * feature layer outfields
   * @returns undefined
   */
  private initializeMapView = () => {
    if (this.itemId) {
      const webMap = createWebMapFromItem(this.itemId);

      this.mapView = createMapView(this.viewDiv, webMap);

      this.mapView.when(
        () => {
          this.mapView?.map?.layers.forEach(layer => {
            if (layer.type !== 'feature') return;
            const featureLayer = layer as FeatureLayer;
            const fieldInfos = featureLayer.popupTemplate?.fieldInfos;

            if (!fieldInfos) return;

            featureLayer.outFields = fieldInfos
              .map(info => info.fieldName)
              .filter(
                (name): name is string =>
                  typeof name === 'string' && !name.startsWith('expression/'),
              );
          });

          this.mapView?.on('click', async (event: MouseEvent) =>
            this.handleMapClick(event),
          );
        },
        error => {
          console.error('error: ', error);
        },
      );
    }
  };

  /**
   * Perform hit test upon map click. If no graphics are hit, emit custom 'selection-cleared' event
   * If a graphic is hit, invoke this.emitFeatureSelection with hit result
   * @param event event emitted upon clicking MapView
   * @returns undefined
   */
  private handleMapClick = async (event: MouseEvent) => {
    const hitTest = await this.mapView?.hitTest(event);

    const graphicHit = hitTest?.results?.find(
      result => result.type === 'graphic',
    );

    if (!graphicHit) {
      this.dispatchEvent(
        new CustomEvent('selection-cleared', {
          bubbles: true,
          composed: true,
        }),
      );
      return;
    }

    this.emitFeatureSelection(graphicHit);
  };

  /**
   * Create and emit a custom 'feature-selected' event based on a graphic hit result.
   * Shapes attributes according to WebMap popup configuration.
   * @param graphicHit
   * @returns
   */
  private emitFeatureSelection = (graphicHit: GraphicHit) => {
    // Perform necessary type checking and narrowing
    const layer = graphicHit.graphic.layer;

    if (!(layer instanceof FeatureLayer)) {
      return;
    }

    const fieldInfos = layer.popupTemplate?.fieldInfos ?? [];
    const rawAttributes = graphicHit.graphic.attributes;
    const allAttributes = rawAttributes as Record<string, unknown>;

    const visibleAttributes = this.buildVisibleAttributes(
      fieldInfos,
      allAttributes,
    );

    const id = this.customAttributes?.id
      ? allAttributes[this.customAttributes.id]
      : allAttributes.OBJECTID;

    const title = this.customAttributes?.title
      ? allAttributes[this.customAttributes.title]
      : 'Selected';

    this.dispatchEvent(
      new CustomEvent('feature-selected', {
        detail: {
          selection: {
            id,
            title,
            attributes: visibleAttributes,
            geometry: graphicHit.graphic.geometry,
            layer: {
              id: layer?.id,
              title: layer?.title,
            },
          },
        },
        bubbles: true,
        composed: true,
      }),
    );
  };

  /**
   * Create and return object consisting solely of attributes configured in WebMap to be visible
   */
  private buildVisibleAttributes = (
    fieldInfos: Array<{
      fieldName?: unknown;
      label?: unknown;
      visible?: boolean;
    }>,
    attributes: Record<string, unknown>,
  ) => {
    return fieldInfos
      ?.filter(info => info.visible)
      .reduce<Record<string, unknown>>((acc, info) => {
        if (typeof info.fieldName !== 'string') return acc;

        const label =
          typeof info.label === 'string' && info.label.length > 0
            ? info.label
            : info.fieldName;

        acc[label] = attributes[info.fieldName];
        return acc;
      }, {});
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    #viewDiv {
      height: 100%;
      width: 100%;
    }
  `;
}

export { ArcgisMapView };
