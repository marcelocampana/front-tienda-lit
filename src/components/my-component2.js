// public/my-component.js
import { LitElement, html, css } from "lit";

class MyComponent2 extends LitElement {
  render() {
    return html` <h2>Component Contact</h2> `;
  }
}

customElements.define("my-component2", MyComponent2);
