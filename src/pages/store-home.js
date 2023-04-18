import { LitElement, html } from "lit";
import "../components/nav-bar.js";
import "../components/product-filter.js";
import "../components/store-footer.js";

export class StoreHome extends LitElement {
  render() {
    return html` <nav-bar></nav-bar>
      <product-filter></product-filter>
      <store-footer></store-footer>`;
  }
}

customElements.define("store-home", StoreHome);
