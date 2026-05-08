import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import MapView from '@arcgis/core/views/MapView';

import { createMapView, createWebMapFromItem } from '../../arcgis';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

@customElement('arcgis-web-map')
export class ArcgisMapView extends LitElement {
  @property({ attribute: 'item-id' })
  itemId: string = '';

  render() {
    return html` <div id="viewDiv" />`;
  }

  @query('#viewDiv')
  private viewDiv!: HTMLDivElement;

  private mapView: MapView | null = null;

  firstUpdated() {
    this.initializeMapView();
  }

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

          this.mapView?.on('click', async (event: any) =>
            this.handleMapClick(event),
          );
        },
        error => {
          console.error('error: ', error);
        },
      );
    }
  };

  private handleMapClick = async (event: any) => {
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

  private emitFeatureSelection = (graphicHit: any) => {
    const featureLayer = graphicHit.graphic.layer as FeatureLayer;
    const fieldInfos = featureLayer.popupTemplate?.fieldInfos ?? [];
    const rawAttributes = graphicHit.graphic.attributes;
    const allAttributes = rawAttributes as Record<string, unknown>;
    const visibleAttributes = fieldInfos
      ?.filter(info => info.visible)
      .reduce<Record<string, unknown>>((acc, info) => {
        if (typeof info.fieldName !== 'string') {
          return acc;
        }
        const fieldName = info.fieldName;
        const label =
          typeof info.label === 'string' && info.label.length > 0
            ? info.label
            : fieldName;

        acc[label] = allAttributes[fieldName];
        return acc;
      }, {});

    this.dispatchEvent(
      new CustomEvent('feature-selected', {
        detail: {
          selection: {
            id: allAttributes.FID ?? allAttributes.OBJECTID,
            title: allAttributes.Volcano_Name ?? 'Selected volcano',
            attributes: visibleAttributes,
            geometry: graphicHit.graphic.geometry,
            layer: {
              id: featureLayer?.id,
              title: featureLayer?.title,
            },
          },
        },
        bubbles: true,
        composed: true,
      }),
    );
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

declare global {
  interface HTMLElementTagNameMap {
    'arcgis-web-map': ArcgisMapView;
  }
}
