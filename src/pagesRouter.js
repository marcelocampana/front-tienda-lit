import { LitElement, html } from "lit";
import "./pages/home-page.js";
import "./pages/checkout-page.js";
import "./pages/cart-page.js";
import "./pages/sign-page.js";
import "./pages/dashboard/product-add.js";
import "./pages/dashboard/product-list.js";

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
        return html` <home-page></home-page>`;
      case "/checkout":
        return html`<checkout-page></checkout-page>`;
      case "/cart":
        return html`<cart-page></cart-page>`;
      case "/sign-in":
        return html`<sign-page></sign-page>`;
      case "/dashboard/product-add":
        return html`<product-add></product-add>`;
      case "/dashboard/product-list":
        return html`<product-list></product-list>`;
    }
  }
}

customElements.define("router-component", RouterComponent);
