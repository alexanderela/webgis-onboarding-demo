import { LitElement } from 'lit';
/**
 * An example button component
 *
 * @tag my-button
 *
 * @csspart control - The button element
 *
 * @cssproperty [--button-bg-color=#f0f0f0] - The background color of the button
 * @cssproperty [--button-fg-color=#333] - The text color of the button
 * @cssproperty [--button-border-color=transparent] - The border color of the button
 *
 * @slot - The main content for the button
 *
 */
export default class MyButton extends LitElement {
    static styles: any;
    /** Changes the display of the button */
    variation?: 'default' | 'primary' | 'hollow' | 'transparent';
    /** Controls the disabled property of the button */
    disabled: boolean;
    render(): any;
}
export { MyButton };
//# sourceMappingURL=button.d.ts.map