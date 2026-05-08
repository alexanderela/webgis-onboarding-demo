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

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('wheel', this.handleWheel, { passive: false });
  }

  disconnectedCallback() {
    this.removeEventListener('wheel', this.handleWheel);
    super.disconnectedCallback();
  }

  private handleWheel = (e: WheelEvent) => {
    e.stopPropagation();
  };

  render() {
    if (!this.selection) {
      return null;
    }

    return html` <calcite-panel
      heading=${this.selection.title}
      scale="m"
      overlay-positioning="off"
    >
      <calcite-action
        slot="header-actions-end"
        icon="x"
        text="Close"
        appearance="transparent"
        @click=${this.handleSelectionCleared}
      ></calcite-action>
      ${this.renderAttributes()}
    </calcite-panel>`;
  }

  private renderAttributes = () => {
    const attributes = Object.entries(this.selection!.attributes).filter(
      ([_, value]) => value != null && value !== '',
    );

    return html`
      <calcite-list divider interaction-mode="none">
        ${attributes.map(
          ([key, val]) => html`
            <calcite-list-item
              label=${this.formatLabel(key)}
              description=${String(val)}
            ></calcite-list-item>
          `,
        )}
      </calcite-list>
    `;
  };

  private formatLabel = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

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
      max-width: 340px;
      max-height: 60vh;
      z-index: 10;
      pointer-events: auto;
    }

    calcite-panel {
      height: 100%;
    }

    calcite-panel::part(panel-content) {
      overflow-y: auto;
      overscroll-behavior: contain;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'arcgis-popup-panel': ArcgisPopupPanel;
  }
}
