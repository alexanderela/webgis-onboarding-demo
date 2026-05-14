import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { ArcgisPopupPanel } from './arcgis-popup-panel';
import { action } from 'storybook/actions';
import { useArgs } from 'storybook/preview-api';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit';

const { args, argTypes, template } = getStorybookHelpers('arcgis-popup-panel');

const meta = {
  title: 'Components/ArcGIS Popup Panel',
  component: 'arcgis-popup-panel',
  args,
  argTypes,
  decorators: [
    (story, context) => {
      const containerHeight = context.viewMode === 'story' ? '90vh' : '50vh';
      return html`<div
        style="position: relative; height: ${containerHeight}; z-index: 10; background: #fafafa; overflow: hidden;"
      >
        ${story()}
      </div>`;
    },
  ],
} satisfies Meta<ArcgisPopupPanel>;

export default meta;

type Story = StoryObj<ArcgisPopupPanel & typeof args>;

const selection = {
  id: '1',
  title: 'Mt. St. Helens',
  attributes: {
    Activity_Evidence: 'Eruption Observed',
    Country: 'United States',
    Elevation: 2549,
    Last_Known_Eruption: '2008 CE',
    Primary_Volcano_Type: 'Stratovolcano(es)',
  },
  geometry: {},
  layer: {
    id: '123',
    title: 'Volcanoes Around the World',
  },
};

export const WithSelection: Story = {
  render: args => html`${template(args)}`,
  args: { selection },
};

export const NoSelection: Story = {
  render: args => html`${template(args)}`,
};

export const WithWebmap: Story = {
  render: args =>
    html`<arcgis-popup-panel
      .selection=${args.selection}
    ></arcgis-popup-panel>`,
  parameters: { docs: { disable: true } },
  decorators: [
    (story, context) => {
      const containerHeight = context.viewMode === 'story' ? '90vh' : '100vh';
      const itemId = '73f23d530b494f99a46c750bce66e01e';
      const customAttributes = {
        id: 'FID',
        title: 'Volcano_Name',
      };

      const [_, updateArgs] = useArgs();

      const wrapper = html`
        <div
          id="map-container"
          style="position: relative; height: ${containerHeight}; z-index: 10; background: #fafafa; overflow: hidden;"
          @feature-selected="${(e: CustomEvent) => {
            action('feature-selected')(e.detail);
            updateArgs({ selection: e.detail.selection });
          }}"
          @selection-cleared="${(e: CustomEvent) => {
            action('selection-cleared');
            updateArgs({ selection: null });
          }}"
        >
          <arcgis-web-map
            item-id=${itemId}
            .customAttributes=${customAttributes}
          ></arcgis-web-map>
          ${story()}
        </div>
      `;

      return wrapper;
    },
  ],
};
