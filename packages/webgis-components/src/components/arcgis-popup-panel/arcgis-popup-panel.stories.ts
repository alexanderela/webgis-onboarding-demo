import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { html } from 'lit';

import type { ArcgisPopupPanel } from './arcgis-popup-panel';

const { args, argTypes, template } = getStorybookHelpers('arcgis-popup-panel');

const meta = {
  title: 'Components/ArcGIS Popup Panel',
  component: 'arcgis-popup-panel',
  args,
  argTypes,
  decorators: [
    story =>
      html`<div
        style="position: relative; height: 100vh; z-index: 10; background: #fafafa;"
      >
        ${story()}
      </div>`,
  ],
} satisfies Meta<ArcgisPopupPanel>;

export default meta;

type Story = StoryObj<ArcgisPopupPanel & typeof args>;

const selection = {
  id: '1',
  title: 'Test Feature',
  attributes: {
    Country: 'United States',
    Elevation: 3000,
  },
};

export const WithSelection: Story = {
  render: args => html`${template(args)}`,
  args: {
    selection,
  },
};

export const NoSelection: Story = {
  render: args => html`${template(args)}`,
};
