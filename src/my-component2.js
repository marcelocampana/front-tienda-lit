// public/my-component.js
import { LitElement, html, css } from "lit";

class MyComponent2 extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html` <h2>Hola desde mi componente Lit 2</h2> `;
  }
}

customElements.define("mo-dos", MyComponent2);
