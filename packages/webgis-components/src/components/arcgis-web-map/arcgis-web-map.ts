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

  initializeMapView() {
    if (this.itemId) {
      const webMap = createWebMapFromItem(this.itemId);

      this.mapView = createMapView(this.viewDiv, webMap);

      this.mapView.when(
        () => {
          const layers = this.mapView?.map?.layers;
          layers?.forEach(layer => {
            if (layer.type === 'feature') {
              const featureLayer = layer as FeatureLayer;
              featureLayer.outFields = ['*'];
            }
          });

          this.mapView?.on('click', async (event: any) => {
            const hitTest = await this.mapView?.hitTest(event);
            console.log('hitTest: ', hitTest);

            const graphicHit = hitTest?.results?.find(
              result => result.type === 'graphic',
            );

            if (graphicHit) {
              const { attributes, geometry, layer } = graphicHit.graphic;
              this.dispatchEvent(
                new CustomEvent('feature-selected', {
                  detail: {
                    selection: {
                      id: attributes.FID ?? attributes.OBJECTID,
                      title: attributes.Volcano_Name ?? 'Selected volcano',
                      attributes,
                      geometry,
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
            }
          });
        },
        error => {
          console.log('error: ', error);
        },
      );
    }
  }

  static styles = css`
    :host {
      position: relative;
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
