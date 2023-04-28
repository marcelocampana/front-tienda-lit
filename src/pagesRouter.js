// my-component.js
import { LitElement, html } from "lit";
import "./components/utils-404.js";
import "./pages/home-page.js";
import "./pages/checkout-page.js";
import "./pages/cart-page.js";
import "./pages/orders-page.js";
import "./pages/signin-page.js";
import "./pages/login-page.js";
import "./pages/dashboard/product-add.js";
import "./pages/dashboard/product-list.js";
import "./pages/dashboard/product-update.js";

class RouterComponent extends LitElement {
  static get properties() {
    return {
      route: { hasChanged: () => true },
    };
  }

  setRoute(route) {
    this.route = route;
    this.requestUpdate();
  }

  constructor() {
    super();
    this.route = window.location.pathname;

    window.addEventListener("popstate", () => {
      this.route = window.location.pathname;
      this.requestUpdate();
    });
  }

  render() {
    switch (this.route) {
      case "/":
        return html`<home-page></home-page>`;
      case "/checkout":
        return html`<checkout-page></checkout-page>`;
      case "/cart":
        return html`<cart-page></cart-page>`;
      case "/signin":
        return html`<signin-page></signin-page>`;
      case "/login":
        return html`<login-page></login-page>`;
      case "/orders":
        html`<orders-page></orders-page>`;
      case "/dashboard/product-add":
        return html`<product-add></product-add>`;
      case "/dashboard/product-list":
        return html`<product-list></product-list>`;
      default:
        if (this.route.indexOf("/dashboard/product-update") !== -1) {
          return html`<product-update></product-update>`;
        } else {
          return html`<utils-404></utils-404>`;
        }
    }
  }
}

customElements.define("router-component", RouterComponent);
