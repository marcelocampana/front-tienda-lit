import { LitElement, html } from "lit";
import "../components/store-layout.js";
//import "../components/store-carrousel.js";
import "../components/store-filter.js";
import "../components/store-product.js";

export class HomePage extends LitElement {
  render() {
    return html`
      <store-layout>
        <store-filter><store-product></store-product></store-filter>
      </store-layout>
    `;
  }
}

customElements.define("home-page", HomePage);
