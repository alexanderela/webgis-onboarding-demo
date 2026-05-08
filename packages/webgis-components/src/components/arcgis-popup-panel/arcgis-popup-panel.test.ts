import { describe, it, expect } from 'vitest';
import { html, render } from 'lit';
import './arcgis-popup-panel';

describe('<arcgis-popup-panel>', () => {
  it('renders panel when selection is provided', () => {});

  it('renders nothing when no selection is provided', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(html`<arcgis-popup-panel></arcgis-popup-panel>`, container);

    const el = container.querySelector('arcgis-popup-panel');
    await el!.updateComplete;

    const panel = el?.shadowRoot!.querySelector('calcit-panel');
    expect(panel).toBeNull();
  });

  it('emits `selected-cleared` event upon clicking close button', () => {});
});
