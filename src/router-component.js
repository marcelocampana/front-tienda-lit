import { LitElement, html } from "lit";
import "./components/my-component1.js";
import "./components/my-component2.js";
import "./components/card.js";
import "./components/component-nav.js";
import "./components/product-component.js";

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
        return html` <component-home></component-home>`;
      case "/contact":
        return html` <component-home4></component-home4> `;
    }
  }
}

customElements.define("router-component", RouterComponent);
