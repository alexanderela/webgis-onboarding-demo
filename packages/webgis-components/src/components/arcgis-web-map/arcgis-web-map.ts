import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import MapView from '@arcgis/core/views/MapView';

import { createMapView, createWebMapFromItem } from '../../arcgis';

@customElement('arcgis-web-map')
export class ArcgisMapView extends LitElement {
  @property({ attribute: 'item-id' })
  itemId: string = '';

  render() {
    return html` <div id="viewDiv" />
      <div id="mapUi"></div>`;
  }

  @query('#viewDiv')
  private viewDiv!: HTMLDivElement;

  private mapView: MapView | null = null;

  @query('#mapUi')
  private mapUi!: HTMLDivElement;

  firstUpdated() {
    this.initializeMapView();
  }

  initializeMapView() {
    if (this.itemId) {
      const webMap = createWebMapFromItem(this.itemId);
      if (this.mapView) {
        this.mapView.map = webMap;
      } else {
        this.mapView = createMapView(this.viewDiv, webMap);
        this.mapView.ui.container = this.mapUi;
      }
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

    #mapUi {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 4px 8px;
      pointer-events: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'arcgis-web-map': ArcgisMapView;
  }
}
