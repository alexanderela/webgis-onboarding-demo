import { describe, it, expect } from 'vitest';
import { html, render } from 'lit';
import './arcgis-popup-panel';

describe('<arcgis-popup-panel>', () => {
  const selection = {
    id: '1',
    title: 'Test Feature',
    attributes: {
      Country: 'United States',
      Elevation: 3000,
    },
  };

  it('renders panel when selection is provided', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(html`<arcgis-popup-panel></arcgis-popup-panel>`, container);

    const el = container.querySelector('arcgis-popup-panel');

    el!.selection = selection;
    await el?.updateComplete;

    const panel = el?.shadowRoot!.querySelector('calcite-panel');
    expect(panel).not.toBeNull();
    expect(panel?.getAttribute('heading')).toBe('Test Feature');
  });

  it('renders nothing when no selection is provided', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(html`<arcgis-popup-panel></arcgis-popup-panel>`, container);

    const el = container.querySelector('arcgis-popup-panel');
    await el!.updateComplete;

    const panel = el?.shadowRoot!.querySelector('calcit-panel');
    expect(panel).toBeNull();
  });

  it('emits `selected-cleared` event upon clicking close button', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(html`<arcgis-popup-panel></arcgis-popup-panel>`, container);

    const el = container.querySelector('arcgis-popup-panel');
    el!.selection = selection;
    await el!.updateComplete;

    let eventFired = false;
    el?.addEventListener('selection-cleared', () => (eventFired = true));

    const closeAction = el?.shadowRoot!.querySelector(
      'calcite-action',
    ) as HTMLElement;
    closeAction.click();

    expect(eventFired).toBe(true);
  });
});
