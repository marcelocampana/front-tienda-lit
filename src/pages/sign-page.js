import { LitElement, html } from "lit";
import "../components/sign-in.js";

export class SignPage extends LitElement {
  render() {
    return html` <sign-in></sign-in>`;
  }
}

customElements.define("sign-page", SignPage);
