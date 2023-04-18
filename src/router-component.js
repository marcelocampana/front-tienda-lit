import { LitElement, html } from "lit";
import "./components/my-component1.js";
import "./components/my-component2.js";
import "./components/my-component3.js";
import "./components/my-component4.js";
import "./components/my-component5.js";
import "./components/my-component6.js";

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
        return html` <component-home3></component-home3>
          <component-home4></component-home4>`;
      case "/servicios":
        return html`<component-home2></component-home2>`;
    }
  }
}

customElements.define("router-component", RouterComponent);
