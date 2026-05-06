import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('arcgis-popup-panel')
export class ArcgisPopupPanel extends LitElement {
  render() {
    return html`<div class="popup-container">Test popup panel</div>`;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      z-index: 10;
    }

    .popup-container {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'arcgis-popup-panel': ArcgisPopupPanel;
  }
}
