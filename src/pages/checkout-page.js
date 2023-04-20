import { LitElement, html } from "lit";
import "../components/store-layout.js";
import "../components/store-checkout.js";

export class CheckoutPage extends LitElement {
  render() {
    return html` <store-layout>
      <store-checkout></store-checkout>
    </store-layout>`;
  }
}

customElements.define("checkout-page", CheckoutPage);
