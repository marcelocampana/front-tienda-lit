// public/my-component.js
import { LitElement, html, css, unsafeCSS } from "lit";

import styles from "../css/main.js";

class MyComponent1 extends LitElement {
  render() {
    return html`
      <style>
        ${styles}
      </style>
      <p class="text-lg text-blue-500">Componente Home 1</p>
    `;
  }
}

customElements.define("my-component1", MyComponent1);
