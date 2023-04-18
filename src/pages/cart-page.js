import { LitElement, html } from "lit";
import "../components/nav-bar.js";
import "../components/shopping-cart.js";
import "../components/store-footer.js";

export class CartPage extends LitElement {
  render() {
    return html` <nav-bar></nav-bar>
      <shopping-cart></shopping-cart>
      <store-footer></store-footer>`;
  }
}

customElements.define("cart-page", CartPage);
