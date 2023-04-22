import { LitElement, html } from "lit";
import "./pages/home-page.js";
import "./pages/checkout-page.js";
import "./pages/cart-page.js";
import "./pages/orders-page.js";
import "./pages/signin-page.js";
import "./pages/login-page.js";
import "./pages/dashboard/product-add.js";
import "./pages/dashboard/product-list.js";
import jwt from "jsonwebtoken-promisified";

class RouterComponent extends LitElement {
  static properties() {
    return { route: {} };
  }

  constructor() {
    super();
    this.route = window.location.pathname;
    this.token = localStorage.getItem("authToken");
  }

  redirectAfterLogin(page) {
    if (this.token) {
      return page;
    } else {
      return html`<login-page></login-page>`;
    }
  }

  async fetchProtectedRoute() {
    try {
      const response = await fetch("/protected", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Acceso permitido:", data);
    } catch (error) {
      console.error("Error al acceder a la ruta protegida:", error.message);
    }
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
        //  return html`<product-add></product-add>`;
        return this.redirectAfterLogin(html`<orders-page></orders-page>`);
      case "/dashboard/product-add":
        //  return html`<product-add></product-add>`;
        return this.redirectAfterLogin(html`<product-add></product-add>`);
      case "/dashboard/product-list":
        //return html`<product-list></product-list>`;
        return this.redirectAfterLogin(html`<product-list></product-list>`);
    }
  }
}

customElements.define("router-component", RouterComponent);
