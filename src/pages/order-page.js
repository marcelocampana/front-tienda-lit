import { LitElement, html } from "lit";
import "../components/store-layout.js";
import "../components/store-order.js";

export class OrderPage extends LitElement {
  render() {
    return html`
      <store-layout>
        <store-order></store-order>
      </store-layout>
    `;
  }
}

customElements.define("order-page", OrderPage);
