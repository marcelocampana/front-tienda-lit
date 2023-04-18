import { LitElement, html } from "lit";
import "../components/nav-bar.js";
import "../components/product-checkout.js";
import "../components/store-footer.js";

export class CheckoutPage extends LitElement {
  render() {
    return html` <nav-bar></nav-bar>
      <product-checkout></product-checkout>
      <store-footer></store-footer>`;
  }
}

customElements.define("checkout-page", CheckoutPage);
