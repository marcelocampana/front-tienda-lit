import { LitElement, html } from "lit";
import "../components/store-layout.js";
import "../components/store-carrousel.js";
import "../components/store-filter.js";
import "../components/store-product.js";

export class HomePage extends LitElement {
  render() {
    return html`
      <store-layout>
        <store-carrousel></store-carrousel>
            <store-filter> </store-filter>
          </store-layout>
        </store-layout>
      </store-layout>
    `;
  }
}

customElements.define("home-page", HomePage);
