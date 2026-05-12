import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  component: 'arcgis-popup-panel',
};

export default meta;
type Story = StoryObj;

export const WithSelection: Story = {
  render: () => html`<arcgis-popup-panel></arcgis-popup-panel>`,
};

export const NoSelection: Story = {
  render: () => html`<arcgis-popup-panel></arcgis-popup-panel>`,
};
