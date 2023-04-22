import { LitElement, html } from "lit";
import "../components/store-layout.js";
import "../components/store-orders.js";

export class OrdersPage extends LitElement {
  render() {
    return html`
      <store-layout>
        <store-orders></store-orders>
      </store-layout>
    `;
  }
}

customElements.define("orders-page", OrdersPage);
