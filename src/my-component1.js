// public/my-component.js
import { LitElement, html, css } from "lit";

class MyComponent1 extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html` <h2>Hola desde mi componente Lit</h2> `;
  }
}

customElements.define("my-component1", MyComponent1);
