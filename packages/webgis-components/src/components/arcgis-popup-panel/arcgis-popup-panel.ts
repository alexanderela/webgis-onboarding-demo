import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type PopupSelection = {
  id: string;
  title: string;
  attributes: Record<string, unknown>;
  geometry?: unknown;
  layer?: {
    id?: string;
    title?: string;
  };
};

@customElement('arcgis-popup-panel')
export class ArcgisPopupPanel extends LitElement {
  @property({ attribute: false })
  selection?: PopupSelection | null = null;

  render() {
    console.log('this.selection: ', this.selection);
    if (!this.selection) {
      return null;
    }

    return html`<div class="popup-container">
      <header>
        <h3>${this.selection.title}</h3>
        <button @click=${this.handleSelectionCleared}>X</button>
      </header>
      <section>
        <dl>
          ${Object.entries(this.selection.attributes)
            .filter(([_, value]) => value != null && value !== '')
            .map(
              ([key, val]) =>
                html`<dt>${key}</dt>
                  <dd>${String(val)}</dd>`,
            )}
        </dl>
      </section>
    </div>`;
  }

  private handleSelectionCleared = () => {
    this.dispatchEvent(
      new CustomEvent('selection-cleared', {
        bubbles: true,
        composed: true,
      }),
    );
  };

  static styles = css`
    :host {
      position: absolute;
      bottom: 16px;
      left: 16px;
      max-width: 320px;
      z-index: 10;
    }

    .popup-container {
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
      padding: 12px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'arcgis-popup-panel': ArcgisPopupPanel;
  }
}
