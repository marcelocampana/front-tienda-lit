import { LitElement, html } from "lit";

import "../components/store-cart.js";

export class CartPage extends LitElement {
  render() {
    return html` <store-layout>
      <store-cart></store-cart>
      ></store-layout
    >`;
  }
}

customElements.define("cart-page", CartPage);
