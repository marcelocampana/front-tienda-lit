import { LitElement, html } from "lit";
import "./components/my-component1.js";
import "./components/my-component2.js";
import "./components/card.js";
import "./components/nav.js";

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
        return html` <my-component1></my-component1>`;
      case "/contact":
        return html` <nav-bar></nav-bar>
          <card-component></card-component>`;
    }
  }
}

customElements.define("router-component", RouterComponent);
