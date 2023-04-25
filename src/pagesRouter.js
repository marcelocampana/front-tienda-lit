// my-component.js
import { LitElement, html } from "lit";
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
      route: {},
      token: { type: String },
    };
  }

  constructor() {
    super();
    this.route = window.location.pathname;
    this.token = localStorage.getItem("authToken");
  }

  render() {
    switch (this.route) {
      case "/":
        return html`<home-page></home-page>`;
      case "/checkout":
        this.fetchProtectedRoute();
        return this.redirectAfterLogin(html`<checkout-page></checkout-page>`);
      // return html`<checkout-page></checkout-page>`;
      case "/cart":
        return html`<cart-page></cart-page>`;
      case "/signin":
        return html`<signin-page></signin-page>`;
      case "/login":
        return html`<login-page></login-page>`;
      case "/orders":
        return this.redirectAfterLogin(html`<orders-page></orders-page>`);
      case "/dashboard/product-add":
        return html`<product-add></product-add>`;
      case "/dashboard/product-list":
        return html`<product-list></product-list>`;
      case "/dashboard/product-update":
        return html`<product-update></product-update>`;
    }
  }
}

customElements.define("router-component", RouterComponent);
