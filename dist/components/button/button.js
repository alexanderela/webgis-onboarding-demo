var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './button.styles.js';
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
class MyButton extends LitElement {
    constructor() {
        super(...arguments);
        /** Controls the disabled property of the button */
        this.disabled = false;
    }
    render() {
        return html `
      <button part="control" ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
    }
}
MyButton.styles = styles;
export default MyButton;
__decorate([
    property()
], MyButton.prototype, "variation", void 0);
__decorate([
    property({ type: Boolean })
], MyButton.prototype, "disabled", void 0);
export { MyButton };
//# sourceMappingURL=button.js.map