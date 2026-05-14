import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

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

export default class ArcgisPopupPanel extends LitElement {
  /** Provides necessary title of selected feature and desired attributes to be displayed as list items. The presence of a selection determines whether or not this component will render. */
  @property({ attribute: false })
  selection?: PopupSelection | null = null;

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

  /**
   * Render a read-only list of feature attributes for display in popup panel.
   * Attributes are provided by parent app and already shaped according to Web Map configuration.
   */
  private renderAttributes = () => {
    // selection is guaranteed here due to early return in render()
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

  /**
   * Formats popup attribute keys into human-readable labels for display.
   * Presentation-only transformation; does not affect underlying data.
   */
  private formatLabel = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  /**
   * Create and emit custom 'selection-cleared' event
   */
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

export { ArcgisPopupPanel };
