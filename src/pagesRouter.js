import { LitElement, html } from "lit";
import "./pages/store-home.js";
import "./pages/checkout-page.js";
import "./pages/cart-page.js";
import "./pages/sign-page.js";

class RouterComponent extends LitElement {
  static properties() {
    return { route: {} };
  }
  constructor() {
    super();
    this.route = window.location.pathname;
  }

  render() {
    switch (this.route) {
      case "/":
        return html` <store-home></store-home>`;
      case "/checkout":
        return html`<checkout-page></checkout-page>`;
      case "/cart":
        return html`<cart-page></cart-page>`;
      case "/sign-in":
        return html`<sign-in></sign-in>`;
    }
  }
}

customElements.define("router-component", RouterComponent);
