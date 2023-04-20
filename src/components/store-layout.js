import { LitElement, html } from "lit";

import "./store-navbar.js";
import "./store-footer.js";

export class StoreLayout extends LitElement {
  render() {
    return html`<store-navbar></store-navbar>
      <slot></slot>
      <store-footer></store-footer>`;
  }
}

customElements.define("store-layout", StoreLayout);
