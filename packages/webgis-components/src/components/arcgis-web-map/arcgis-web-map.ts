import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';

@customElement('arcgis-web-map')
export class ArcgisMapView extends LitElement {
  @property({ attribute: 'item-id' })
  itemId: string = '';

  render() {
    return html` <div id="viewDiv">Hello</div> `;
  }

  @query('#viewDiv')
  private viewDiv!: HTMLDivElement;

  private mapView: MapView | null = null;

  firstUpdated() {
    this.initializeMapView();
  }

  initializeMapView() {
    if (this.itemId) {
      const webMap = new WebMap({
        portalItem: {
          id: this.itemId,
        },
      });
      if (this.mapView) {
        this.mapView.map = webMap;
      } else {
        this.mapView = new MapView({
          container: this.viewDiv,
          map: webMap,
        });
      }
    }
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
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
